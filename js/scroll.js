/**
 * The Growing Cosmic Mind - Scroll Driver & Camera Trajectory Controller
 * Manages scroll timeline, smooth camera lerping, mouse breathing parallax,
 * stage indicator dots, and initial scroll arrow fadeout.
 */

import * as THREE from 'three';
import { cosmicData } from './data.js';

export class ScrollController {
  constructor(camera, networkSystem) {
    this.camera = camera;
    this.networkSystem = networkSystem;
    
    // Scroll progress variables
    this.scrollProgress = 0.0;
    this.targetScrollProgress = 0.0;
    
    // Mouse Parallax variables
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Initial Scroll Arrow State
    this.hasScrolled = false;
    this.scrollIndicatorEl = document.querySelector('.scroll-indicator');

    // Camera target vectors
    this.currentCamPos = new THREE.Vector3(0, 0, 25);
    this.targetCamPos = new THREE.Vector3(0, 0, 25);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);

    // UI Elements
    this.heroOverlay = document.querySelector('.hero-overlay');
    this.stageDots = document.querySelectorAll('.stage-dot');

    this.initListeners();
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const scrollHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    this.targetScrollProgress = Math.max(0, Math.min(1, currentY / scrollHeight));

    if (!this.hasScrolled && (currentY > 15 || this.targetScrollProgress > 0.02)) {
      this.hasScrolled = true;
      if (this.scrollIndicatorEl) {
        this.scrollIndicatorEl.classList.add('faded');
      }
    }
  }

  initListeners() {
    // 1. Native Window Scroll Event
    window.addEventListener('scroll', () => {
      this.updateScrollProgress();
    }, { passive: true });

    // 2. Mouse Wheel Scroll Event
    window.addEventListener('wheel', (e) => {
      // Direct wheel scroll driver
      window.scrollBy({ top: e.deltaY, behavior: 'instant' });
      this.updateScrollProgress();
    }, { passive: true });

    // 3. Touch Drag Scroll for Mobile / Touchpads
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const deltaY = (touchStartY - touchY) * 1.5;
        touchStartY = touchY;
        window.scrollBy({ top: deltaY, behavior: 'instant' });
        this.updateScrollProgress();

        // Touch parallax coordinates
        this.targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        this.targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    }, { passive: true });

    // 4. Keyboard Arrow / Page Navigation
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        window.scrollBy({ top: 300, behavior: 'smooth' });
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        window.scrollBy({ top: -300, behavior: 'smooth' });
      }
    });

    // 5. Mouse move listener for Parallax Breathing Tilt
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // 6. Stage Indicator Dots Clicking
    this.stageDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const stageId = parseInt(dot.getAttribute('data-stage'), 10);
        this.scrollToStage(stageId);
      });
    });
  }

  scrollToStage(stageId) {
    const stage = cosmicData.stages.find(s => s.id === stageId);
    if (!stage) return;

    const scrollHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetY = stage.scrollRange[0] * scrollHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  update() {
    // 1. Smooth lerp for scroll progress
    this.scrollProgress = THREE.MathUtils.lerp(this.scrollProgress, this.targetScrollProgress, 0.08);

    // 2. Pass progress to network system
    this.networkSystem.setScrollProgress(this.scrollProgress);

    // 3. Mouse Parallax smooth lerp
    this.mouseX = THREE.MathUtils.lerp(this.mouseX, this.targetMouseX, 0.05);
    this.mouseY = THREE.MathUtils.lerp(this.mouseY, this.targetMouseY, 0.05);

    // 4. Calculate Stage & Interpolate Camera Trajectory
    this.updateCameraTrajectory();

    // 5. Update UI HUD elements
    this.updateHUD();
  }

  updateCameraTrajectory() {
    const stages = cosmicData.stages;
    let currentStageIndex = 0;

    // Find current stage interval based on scrollProgress
    for (let i = 0; i < stages.length; i++) {
      if (this.scrollProgress >= stages[i].scrollRange[0] && this.scrollProgress <= stages[i].scrollRange[1]) {
        currentStageIndex = i;
        break;
      } else if (this.scrollProgress > stages[i].scrollRange[1]) {
        currentStageIndex = i;
      }
    }

    const stage = stages[currentStageIndex];
    const nextStage = stages[Math.min(currentStageIndex + 1, stages.length - 1)];

    // Calculate stage progress ratio (0.0 to 1.0 within current stage)
    const stageRange = stage.scrollRange[1] - stage.scrollRange[0];
    const stageProgress = stageRange > 0 ? Math.min(1.0, (this.scrollProgress - stage.scrollRange[0]) / stageRange) : 1.0;

    // Smooth cubic ease for camera transitions
    const easedProgress = stageProgress * stageProgress * (3 - 2 * stageProgress);

    // Interpolate positions between stage keyframes
    this.targetCamPos.set(
      THREE.MathUtils.lerp(stage.cameraPos.x, nextStage.cameraPos.x, easedProgress),
      THREE.MathUtils.lerp(stage.cameraPos.y, nextStage.cameraPos.y, easedProgress),
      THREE.MathUtils.lerp(stage.cameraPos.z, nextStage.cameraPos.z, easedProgress)
    );

    this.targetLookAt.set(
      THREE.MathUtils.lerp(stage.cameraTarget.x, nextStage.cameraTarget.x, easedProgress),
      THREE.MathUtils.lerp(stage.cameraTarget.y, nextStage.cameraTarget.y, easedProgress),
      THREE.MathUtils.lerp(stage.cameraTarget.z, nextStage.cameraTarget.z, easedProgress)
    );

    // Add gentle Mouse Parallax breathing offset
    const parallaxCamPos = this.targetCamPos.clone();
    parallaxCamPos.x += this.mouseX * 1.8;
    parallaxCamPos.y -= this.mouseY * 1.4;

    // Smoothly apply camera transformation
    this.currentCamPos.lerp(parallaxCamPos, 0.08);
    this.currentLookAt.lerp(this.targetLookAt, 0.08);

    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);
  }

  updateHUD() {
    // Hero Text Fadeout past Stage 1
    if (this.heroOverlay) {
      if (this.scrollProgress > 0.18) {
        this.heroOverlay.classList.add('hidden');
      } else {
        this.heroOverlay.classList.remove('hidden');
      }
    }

    // Active Stage Indicator Dot
    const stages = cosmicData.stages;
    let activeStageId = 1;
    for (let i = 0; i < stages.length; i++) {
      if (this.scrollProgress >= stages[i].scrollRange[0]) {
        activeStageId = stages[i].id;
      }
    }

    this.stageDots.forEach(dot => {
      const stageId = parseInt(dot.getAttribute('data-stage'), 10);
      if (stageId === activeStageId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}
