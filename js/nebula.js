/**
 * The Growing Cosmic Mind - Deep Space & Nebula Generator
 * Generates distant background starfield strictly layered BEHIND a dark shady nebula texture dome.
 */

import * as THREE from 'three';

let starsParticles;
let nebulaMesh;

export function initNebula(scene) {
  // 1. Distant Background Starfield (Positioned at radius 200 - 260, strictly BEHIND the nebula dome)
  const starCount = 1800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  const starColors = [
    new THREE.Color('#64D2FF'), // Ice Cyan
    new THREE.Color('#0A84FF'), // Cobalt Blue
    new THREE.Color('#AF52DE'), // Creative Violet
    new THREE.Color('#FF7E95'), // Rose Amber
    new THREE.Color('#FFFFFF')  // Pure White
  ];

  for (let i = 0; i < starCount; i++) {
    // Generate far deep in background behind the dark shady nebula veil (radius 200 - 260)
    const radius = 200 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const color = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 1.0 + Math.random() * 1.6;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const starMaterial = new THREE.PointsMaterial({
    size: 1.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.65, // Subtle soft glow from behind the shady veil
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  starsParticles = new THREE.Points(geometry, starMaterial);
  starsParticles.renderOrder = -2; // Render behind everything else
  scene.add(starsParticles);

  // 2. Procedural Volumetric Dark Shady Nebula Dome (Positioned at radius 160, in front of stars)
  const nebulaGeometry = new THREE.SphereGeometry(160, 32, 32);
  const nebulaMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColorVoid: { value: new THREE.Color('#04030D') },
      uColorIndigo: { value: new THREE.Color('#0b071e') },
      uColorViolet: { value: new THREE.Color('#180d32') },
      uColorCyan: { value: new THREE.Color('#64D2FF') }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normal;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorVoid;
      uniform vec3 uColorIndigo;
      uniform vec3 uColorViolet;
      uniform vec3 uColorCyan;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // Simplex-like noise helper
      float hash(vec3 p) {
        p  = fract(p * 0.3183099 + .1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                       mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                       mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }

      void main() {
        vec3 dir = normalize(vPosition);
        float n = noise(dir * 2.2 + vec3(uTime * 0.02, uTime * 0.015, 0.0));
        float n2 = noise(dir * 3.5 - vec3(0.0, uTime * 0.025, uTime * 0.02));
        
        float nebulaDensity = smoothstep(0.35, 0.8, n * 0.6 + n2 * 0.4);
        
        vec3 finalColor = mix(uColorVoid, uColorIndigo, nebulaDensity);
        finalColor = mix(finalColor, uColorViolet, pow(nebulaDensity, 1.8));
        finalColor += uColorCyan * pow(nebulaDensity, 4.0) * 0.14;

        gl_FragColor = vec4(finalColor, 0.92);
      }
    `
  });

  nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
  nebulaMesh.renderOrder = -1; // Positioned in front of background stars, behind 3D neural network
  scene.add(nebulaMesh);
}

export function updateNebula(time) {
  if (starsParticles) {
    starsParticles.rotation.y = time * 0.00003;
    starsParticles.rotation.x = Math.sin(time * 0.00002) * 0.04;
  }
  if (nebulaMesh && nebulaMesh.material.uniforms) {
    nebulaMesh.material.uniforms.uTime.value = time * 0.001;
  }
}
