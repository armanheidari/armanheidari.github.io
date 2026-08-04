/**
 * The Growing Cosmic Mind - WebGL Scene & Post-Processing Engine
 * Handles Three.js renderer, perspective camera, volumetric lighting, and bloom composer.
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

let scene, camera, renderer, composer;
let cyanLight, magentaLight, violetLight;

export function initScene(containerElement) {
  // 1. Scene Container (No heavy fog so starfield stays crystal-clear)
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#04030D');

  // 2. Camera Setup
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 600);
  camera.position.set(0, 0, 28);
  camera.lookAt(0, 0, 0);

  // 3. WebGL Renderer Setup
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  containerElement.appendChild(renderer.domElement);

  // 4. Volumetric Ambient & Subtle Accent Lights
  const ambientLight = new THREE.AmbientLight('#0f0b24', 1.2);
  scene.add(ambientLight);

  cyanLight = new THREE.PointLight('#64D2FF', 1.5, 90);
  cyanLight.position.set(-14, 14, 12);
  scene.add(cyanLight);

  magentaLight = new THREE.PointLight('#BF5AF2', 1.2, 90);
  magentaLight.position.set(14, -14, 10);
  scene.add(magentaLight);

  violetLight = new THREE.PointLight('#30D158', 1.0, 90);
  violetLight.position.set(0, 18, -14);
  scene.add(violetLight);

  // 5. Post-Processing Bloom Composer (Crisp Selective Glow for Nodes/Lines)
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.6,  // Strength
    0.65, // Radius
    0.45  // Higher Threshold so background stars remain crisp without random blurring
  );

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);

  // 6. Handle Window Resize
  window.addEventListener('resize', onWindowResize, false);

  return { scene, camera, renderer, composer };
}

function onWindowResize() {
  if (!camera || !renderer || !composer) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composer.setSize(width, height);
}

export function renderScene(time = 0) {
  if (!composer) return;

  // Gentle light orbit animation
  if (cyanLight && magentaLight) {
    cyanLight.position.x = Math.sin(time * 0.0003) * 16;
    cyanLight.position.y = Math.cos(time * 0.0004) * 16;
    magentaLight.position.x = Math.cos(time * 0.0004) * 18;
    magentaLight.position.z = Math.sin(time * 0.0005) * 14;
  }

  composer.render();
}

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }
export function getComposer() { return composer; }
