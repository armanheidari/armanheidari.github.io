/**
 * The Growing Cosmic Mind - Main Application Entry Point
 * Arman Heidari Portfolio
 */

import { initScene, renderScene } from './scene.js';
import { initNebula, updateNebula } from './nebula.js';
import { NeuralNetworkSystem } from './network.js';
import { ScrollController } from './scroll.js';
import { InteractionController } from './interaction.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // 1. Initialize WebGL Scene, Camera, Lighting & Bloom
  const { scene, camera } = initScene(container);

  // 2. Initialize Cosmic Nebula & Starfield Particles
  initNebula(scene);

  // 3. Initialize Neural Network System
  const networkSystem = new NeuralNetworkSystem(scene);

  // 4. Initialize Scroll & Camera Trajectory Controller
  const scrollController = new ScrollController(camera, networkSystem);

  // 5. Initialize Raycasting, Spatial Labels & Glass Card Modals
  const interactionController = new InteractionController(camera, scene, networkSystem, scrollController);

  // 6. Main Animation Render Loop
  function animate(time) {
    requestAnimationFrame(animate);

    // Update Nebula background shader and starfield
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