/**
 * The Growing Cosmic Mind - Main Application Entry Point
 * Arman Heidari Portfolio
 */

import { initScene, renderScene } from './scene.js';
import { initNebula, updateNebula, triggerStarExplosion } from './nebula.js';
import { NeuralNetworkSystem } from './network.js';
import { ScrollController } from './scroll.js';
import { InteractionController } from './interaction.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Preloader UI elements
  const loadingScreen = document.getElementById('loading-screen');
  const loaderOrbWrapper = document.getElementById('loader-orb-wrapper');
  const loaderOrb = document.querySelector('.loader-orb');
  const loaderRing = document.querySelector('.loader-ring');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');

  let loadProgress = 0;

  // 1. Initialize WebGL Scene, Camera, Lighting & Bloom
  const { scene, camera } = initScene(container);

  // 2. Initialize Cosmic Nebula, Starfield Particles & 3D Preloader Node
  initNebula(scene);

  // 3. Initialize Neural Network System
  const networkSystem = new NeuralNetworkSystem(scene);

  // 4. Initialize Scroll & Camera Trajectory Controller
  const scrollController = new ScrollController(camera, networkSystem);

  // 5. Initialize Raycasting, Spatial Labels & Glass Card Modals
  const interactionController = new InteractionController(camera, scene, networkSystem, scrollController);

  // Preloader Progression Controller
  function updatePreloader() {
    loadProgress += Math.floor(Math.random() * 12) + 8;
    if (loadProgress > 100) loadProgress = 100;

    const ratio = loadProgress / 100;

    // Dynamically transition HTML Loader Orb styling
    if (loaderOrb) {
      const grayPercent = Math.max(0, 100 - loadProgress * 1.05);
      const brightness = 0.45 + ratio * 0.75;
      const glowDist = `${Math.floor(8 + ratio * 40)}px`;
      const glowAlpha = (0.2 + ratio * 0.7).toFixed(2);

      loaderOrb.style.setProperty('--orb-gray', `${grayPercent}%`);
      loaderOrb.style.setProperty('--orb-bright', brightness.toFixed(2));
      loaderOrb.style.setProperty('--orb-glow-dist', glowDist);
      loaderOrb.style.setProperty('--orb-glow-col', `rgba(100, 210, 255, ${glowAlpha})`);
    }

    if (loaderRing) {
      const ringAlpha = (0.2 + ratio * 0.8).toFixed(2);
      loaderRing.style.setProperty('--ring-t', `rgba(100, 210, 255, ${ringAlpha})`);
      loaderRing.style.setProperty('--ring-r', `rgba(175, 82, 222, ${ringAlpha})`);
    }

    if (loaderBar) loaderBar.style.width = `${loadProgress}%`;
    if (loaderPercent) loaderPercent.textContent = `${loadProgress}%`;

    if (loadProgress < 100) {
      setTimeout(updatePreloader, 25);
    } else {
      // 100% Load Completed!
      if (loaderOrbWrapper) loaderOrbWrapper.classList.add('exploding');
      
      // Trigger WebGL Node Explosion and Star Particle expansion outward to actual positions
      triggerStarExplosion(() => {
        // Once stars reach their target positions: reveal overlays & unlock scroll!
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
      });

      setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('fade-out');
      }, 250);
    }
  }

  // Start preloader progression once 3D engine is mounted
  setTimeout(updatePreloader, 50);

  // 6. Main Animation Render Loop
  function animate(time) {
    requestAnimationFrame(animate);

    // Update Nebula background shader, starfield & preloader node
    updateNebula(time);

    // Update Scroll timeline and camera position
    scrollController.update();

    // Update Neural Network positions, scales & satellite orbits
    networkSystem.update(time);

    // Update 3D Floating Spatial Labels Screen Projections
    interactionController.updateSpatialLabels();

    // Animate network traveling pulses
    networkSystem.animatePulses(time);

    // Render WebGL Bloom Composer
    renderScene(time);
  }

  requestAnimationFrame(animate);
});