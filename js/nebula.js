/**
 * The Growing Cosmic Mind - Deep Space Starfield & 3D WebGL Preloader Node
 * Handles preloader 3D journey node rotation, star particle origin collapse,
 * smooth cubic explosion position interpolation, and background nebula.
 */

import * as THREE from 'three';

let starsParticles;
let targetPositions;
let initialPositions;
let nebulaMesh;
let loaderNodeGroup;
let loaderCoreMesh;
let loaderHaloMesh;

let isExploding = false;
let explosionProgress = 0.0;
let onExplosionCompleteCallback = null;

export function initNebula(scene) {
  const starCount = 1800;
  const geometry = new THREE.BufferGeometry();
  
  targetPositions = new Float32Array(starCount * 3);
  initialPositions = new Float32Array(starCount * 3);
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
    // Target position in deep background (radius 200 - 260)
    const radius = 200 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    const tx = radius * Math.sin(phi) * Math.cos(theta);
    const ty = radius * Math.sin(phi) * Math.sin(theta);
    const tz = radius * Math.cos(phi);

    targetPositions[i * 3] = tx;
    targetPositions[i * 3 + 1] = ty;
    targetPositions[i * 3 + 2] = tz;

    // Initial position collapsed at screen center (0, 0, 0)
    const initSpread = 0.8;
    const ix = (Math.random() - 0.5) * initSpread;
    const iy = (Math.random() - 0.5) * initSpread;
    const iz = (Math.random() - 0.5) * initSpread;

    initialPositions[i * 3] = ix;
    initialPositions[i * 3 + 1] = iy;
    initialPositions[i * 3 + 2] = iz;

    positions[i * 3] = ix;
    positions[i * 3 + 1] = iy;
    positions[i * 3 + 2] = iz;

    const color = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 1 + Math.random() * 1.6;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const starMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  starsParticles = new THREE.Points(geometry, starMaterial);
  starsParticles.renderOrder = -2;
  scene.add(starsParticles);

  // 2. 3D WebGL Preloader Journey Node (Solid Core + Wireframe Icosahedron Halo)
  loaderNodeGroup = new THREE.Group();
  loaderNodeGroup.position.set(0, 0, 0);

  const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#64D2FF'),
    transparent: true,
    opacity: 0.95
  });
  loaderCoreMesh = new THREE.Mesh(coreGeo, coreMat);
  loaderNodeGroup.add(loaderCoreMesh);

  const haloGeo = new THREE.IcosahedronGeometry(1.65, 1);
  const haloMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#AF52DE'),
    wireframe: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  loaderHaloMesh = new THREE.Mesh(haloGeo, haloMat);
  loaderNodeGroup.add(loaderHaloMesh);

  scene.add(loaderNodeGroup);

  // 3. Procedural Volumetric Dark Shady Nebula Dome (Positioned at radius 160)
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
  nebulaMesh.renderOrder = -1;
  scene.add(nebulaMesh);
}

export function triggerStarExplosion(onComplete) {
  isExploding = true;
  onExplosionCompleteCallback = onComplete;
}

export function updateNebula(time) {
  // Rotate 3D preloader node during loading
  if (loaderNodeGroup && loaderNodeGroup.visible) {
    loaderNodeGroup.rotation.y = time * 0.002;
    loaderNodeGroup.rotation.x = time * 0.001;
    loaderHaloMesh.rotation.z = -time * 0.0015;
  }

  // Handle explosion and smooth particle interpolation to target positions
  if (starsParticles && isExploding) {
    if (explosionProgress < 1.0) {
      explosionProgress += 0.022; // Smooth cubic explosion rate
      if (explosionProgress > 1.0) explosionProgress = 1.0;

      // Smooth cubic ease out curve
      const t = explosionProgress;
      const easedProgress = t * t * (3.0 - 2.0 * t);

      // Interpolate each particle position from origin -> targetPosition
      const posAttr = starsParticles.geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < posAttr.count; i++) {
        const idx = i * 3;
        posArray[idx] = THREE.MathUtils.lerp(initialPositions[idx], targetPositions[idx], easedProgress);
        posArray[idx + 1] = THREE.MathUtils.lerp(initialPositions[idx + 1], targetPositions[idx + 1], easedProgress);
        posArray[idx + 2] = THREE.MathUtils.lerp(initialPositions[idx + 2], targetPositions[idx + 2], easedProgress);
      }
      posAttr.needsUpdate = true;

      // Dissolve central 3D preloader node as supernova explodes
      if (loaderNodeGroup) {
        const nodeScale = 1.0 + easedProgress * 3.5;
        loaderNodeGroup.scale.set(nodeScale, nodeScale, nodeScale);
        loaderCoreMesh.material.opacity = Math.max(0, 0.95 * (1.0 - easedProgress));
        loaderHaloMesh.material.opacity = Math.max(0, 0.75 * (1.0 - easedProgress));

        if (easedProgress >= 0.98) {
          loaderNodeGroup.visible = false;
        }
      }

      // Explosion complete! Invoke callback to reveal overlays cleanly
      if (explosionProgress >= 1.0 && onExplosionCompleteCallback) {
        const cb = onExplosionCompleteCallback;
        onExplosionCompleteCallback = null;
        cb();
      }
    }
  }

  // Gentle starfield drift after explosion completes
  if (starsParticles && explosionProgress >= 0.9) {
    starsParticles.rotation.y = time * 0.00003;
    starsParticles.rotation.x = Math.sin(time * 0.00002) * 0.04;
  }

  if (nebulaMesh && nebulaMesh.material.uniforms) {
    nebulaMesh.material.uniforms.uTime.value = time * 0.001;
  }
}
