/**
 * The Growing Cosmic Mind - Neural Network Engine
 * Handles instanced 3D glowing journey nodes, orbiting project satellites,
 * dynamic dendrite connection lines, light pulses, and scroll-driven network unrolling.
 */

import * as THREE from 'three';
import { cosmicData } from './data.js';

export class NeuralNetworkSystem {
  constructor(scene) {
    this.scene = scene;
    this.nodesData = cosmicData.nodes;
    this.nodesMap = new Map();

    // Node meshes
    this.solidNodesMesh = null;
    this.hollowNodesGroup = new THREE.Group();
    
    // Satellite Project meshes
    this.satellitesGroup = new THREE.Group();

    // Connection lines
    this.connectionsLineSegments = null;
    this.pulsesGroup = new THREE.Group();
    
    // Animation state
    this.scrollProgress = 0.0;
    this.activeNodeId = null;
    this.hoveredNodeId = null;
    this.currentTime = 0;

    // Node instancing matrices & colors
    this.dummyMatrix = new THREE.Object3D();
    this.edgePairs = [];

    this.initNetwork();
  }

  initNetwork() {
    const nodeCount = this.nodesData.length;
    
    // 1. Solid Instanced Journey Spheres Setup
    const solidGeometry = new THREE.SphereGeometry(1, 32, 32);
    const solidMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95
    });

    this.solidNodesMesh = new THREE.InstancedMesh(solidGeometry, solidMaterial, nodeCount);
    this.solidNodesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Populate Map and Instanced Colors
    this.nodesData.forEach((node, index) => {
      const initialPos = node.position ? [...node.position] : [0, 0, 0];

      this.nodesMap.set(node.id, {
        ...node,
        index,
        currentPos: new THREE.Vector3(...initialPos),
        currentScale: 0.0,
        targetScale: node.size,
        opacity: 0.0
      });

      const color = new THREE.Color(node.color);
      this.solidNodesMesh.setColorAt(index, color);

      if (node.isSatellite) {
        // Distinct Satellite Formation for Projects (Octahedron core + Planetary Orbit Ring)
        const satGroup = new THREE.Group();
        satGroup.userData = { nodeId: node.id };

        const satCoreGeo = new THREE.OctahedronGeometry(node.size * 0.9, 0);
        const satCoreMat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.95
        });
        const satCoreMesh = new THREE.Mesh(satCoreGeo, satCoreMat);
        satGroup.add(satCoreMesh);

        // Planetary Orbit Ring around satellite
        const ringGeo = new THREE.TorusGeometry(node.size * 1.45, 0.035, 16, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.65,
          wireframe: true,
          blending: THREE.AdditiveBlending
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3.5;
        satGroup.add(ringMesh);

        this.satellitesGroup.add(satGroup);
      } else {
        // Refined Wireframe Halo for Journey Nodes (Radius 1.28x, crisp 0.5 opacity)
        const hollowGeo = new THREE.IcosahedronGeometry(1.28, 1);
        const hollowMat = new THREE.MeshBasicMaterial({
          color: color,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        });
        const hollowMesh = new THREE.Mesh(hollowGeo, hollowMat);
        hollowMesh.position.set(...initialPos);
        hollowMesh.userData = { nodeId: node.id };
        this.hollowNodesGroup.add(hollowMesh);
      }
    });

    this.solidNodesMesh.instanceColor.needsUpdate = true;
    this.scene.add(this.solidNodesMesh);
    this.scene.add(this.hollowNodesGroup);
    this.scene.add(this.satellitesGroup);

    // 2. Build Connections Edge Pairs
    const linePositions = [];
    const lineColors = [];

    this.nodesData.forEach(node => {
      if (node.connections && node.connections.length > 0) {
        node.connections.forEach(targetId => {
          const targetNode = this.nodesMap.get(targetId);
          if (targetNode) {
            const edge = {
              source: node,
              target: targetNode,
              sourcePos: this.nodesMap.get(node.id).currentPos,
              targetPos: targetNode.currentPos,
              progress: 0.0
            };
            this.edgePairs.push(edge);

            // Reserve position buffers (2 vertices per line)
            linePositions.push(0, 0, 0, 0, 0, 0);
            
            const c1 = new THREE.Color(node.color);
            const c2 = new THREE.Color(targetNode.color);
            lineColors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
          }
        });
      }
    });

    // 3. Line Segments Geometry
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5
    });

    this.connectionsLineSegments = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.connectionsLineSegments);

    // 4. Dynamic Traveling Pulses
    this.initPulses();

    // Initial update on frame 0
    this.update(0);
  }

  initPulses() {
    this.scene.add(this.pulsesGroup);
    const pulseCount = 20;
    const pulseGeo = new THREE.SphereGeometry(0.16, 12, 12);

    for (let i = 0; i < pulseCount; i++) {
      const pulseMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00F0FF'),
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });

      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      mesh.visible = false;
      mesh.userData = {
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.006
      };
      this.pulsesGroup.add(mesh);
    }
  }

  setScrollProgress(progress) {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  update(time = 0) {
    this.currentTime = time;
    this.updateGrowth(this.scrollProgress, time);
  }

  updateGrowth(scrollProgress, time = 0) {
    // Map scroll progress (0.0 - 1.0) across the stages
    this.nodesMap.forEach((node) => {
      let growthFactor = 0.0;

      if (node.stage === 1) {
        // Stage 1 (Origin Core Mind): Dynamically ignites and expands as user scrolls (0.00 to 0.12)!
        if (scrollProgress >= 0.12) growthFactor = 1.0;
        else growthFactor = Math.min(1.0, scrollProgress / 0.12);
      } else if (node.stage === 2) {
        // Stage 2 (About & Front-End): unrolls from scroll 0.12 to 0.30
        if (scrollProgress >= 0.30) growthFactor = 1.0;
        else if (scrollProgress <= 0.12) growthFactor = 0.0;
        else growthFactor = (scrollProgress - 0.12) / 0.18;
      } else if (node.stage === 3) {
        // Stage 3 (Machine Learning & Data Eng Expansion): unrolls from scroll 0.32 to 0.52
        if (scrollProgress >= 0.52) growthFactor = 1.0;
        else if (scrollProgress <= 0.32) growthFactor = 0.0;
        else growthFactor = (scrollProgress - 0.32) / 0.20;
      } else if (node.stage === 4) {
        // Stage 4 (Project Satellites): STRICTLY UNROLL DURING STAGE 4 (scroll 0.58 to 0.78)!
        if (scrollProgress >= 0.78) growthFactor = 1.0;
        else if (scrollProgress <= 0.58) growthFactor = 0.0;
        else growthFactor = (scrollProgress - 0.58) / 0.20;
      } else if (node.stage === 5) {
        // Stage 5 (Present & Beyond / Contact): unrolls from scroll 0.80 to 0.98
        if (scrollProgress >= 0.98) growthFactor = 1.0;
        else if (scrollProgress <= 0.80) growthFactor = 0.0;
        else growthFactor = (scrollProgress - 0.80) / 0.18;
      }

      // Smooth lerp for scale & opacity
      const targetScale = node.size * growthFactor;
      node.currentScale = THREE.MathUtils.lerp(node.currentScale, targetScale, 0.15);
      node.opacity = THREE.MathUtils.lerp(node.opacity, growthFactor, 0.15);

      // Calculate Orbital Motion for Project Satellites
      if (node.isSatellite) {
        const centerNode = this.nodesMap.get(node.orbitCenterNode || 'node-core');
        const centerPos = centerNode ? centerNode.currentPos : new THREE.Vector3(0, 0, 0);

        const angle = (node.orbitAngle || 0) + time * (node.orbitSpeed || 0.0004);
        const radius = node.orbitRadius || 12;
        const tilt = node.orbitTilt || 0.2;

        const x = centerPos.x + Math.cos(angle) * radius;
        const y = centerPos.y + Math.sin(angle) * Math.sin(tilt) * radius;
        const z = centerPos.z + Math.sin(angle) * Math.cos(tilt) * radius;

        node.currentPos.set(x, y, z);
      }

      // Final scale calculation with Hover/Active boost
      let finalScale = node.currentScale;
      if (node.id === this.hoveredNodeId) finalScale *= 1.35;
      if (node.id === this.activeNodeId) finalScale *= 1.5;

      if (!node.isSatellite) {
        // Update Instanced Matrix for Solid Journey Nodes
        this.dummyMatrix.position.copy(node.currentPos);
        this.dummyMatrix.scale.set(finalScale, finalScale, finalScale);
        this.dummyMatrix.updateMatrix();
        this.solidNodesMesh.setMatrixAt(node.index, this.dummyMatrix.matrix);
      } else {
        // Scale down solid instanced placeholder for satellite so custom satellite mesh is rendered
        this.dummyMatrix.position.copy(node.currentPos);
        this.dummyMatrix.scale.set(0.0001, 0.0001, 0.0001);
        this.dummyMatrix.updateMatrix();
        this.solidNodesMesh.setMatrixAt(node.index, this.dummyMatrix.matrix);
      }
    });

    this.solidNodesMesh.instanceMatrix.needsUpdate = true;

    // Update Outer Wireframe Halos for Journey Nodes
    this.hollowNodesGroup.children.forEach(mesh => {
      const nodeId = mesh.userData.nodeId;
      const node = this.nodesMap.get(nodeId);
      if (node) {
        const isVisible = node.currentScale > 0.05;
        mesh.visible = isVisible;

        if (isVisible) {
          mesh.position.copy(node.currentPos);
          let orbScale = node.currentScale * 1.28;
          if (node.id === this.hoveredNodeId) orbScale *= 1.35;
          if (node.id === this.activeNodeId) orbScale *= 1.5;

          mesh.scale.set(orbScale, orbScale, orbScale);
          mesh.rotation.y += 0.008;
          mesh.rotation.x += 0.004;
        }
      }
    });

    // Update Satellite Project Formations
    this.satellitesGroup.children.forEach(satGroup => {
      const nodeId = satGroup.userData.nodeId;
      const node = this.nodesMap.get(nodeId);
      if (node) {
        const isVisible = node.currentScale > 0.05;
        satGroup.visible = isVisible;

        if (isVisible) {
          satGroup.position.copy(node.currentPos);

          let satScale = node.currentScale;
          if (node.id === this.hoveredNodeId) satScale *= 1.35;
          if (node.id === this.activeNodeId) satScale *= 1.5;

          satGroup.scale.set(satScale, satScale, satScale);

          // Rotate satellite core and ring independently
          satGroup.children[0].rotation.y += 0.015;
          satGroup.children[0].rotation.z += 0.01;
          if (satGroup.children[1]) {
            satGroup.children[1].rotation.z -= 0.02;
          }
        }
      }
    });

    // Update Dynamic Tether Line Connections
    const positions = this.connectionsLineSegments.geometry.attributes.position.array;
    let ptr = 0;

    this.edgePairs.forEach(edge => {
      const sourceNode = this.nodesMap.get(edge.source.id);
      const targetNode = this.nodesMap.get(edge.target.id);

      const sourceActive = sourceNode && sourceNode.currentScale > 0.05;
      const targetActive = targetNode && targetNode.currentScale > 0.05;

      if (sourceActive && targetActive) {
        const edgeProgress = Math.min(1.0, sourceNode.currentScale / sourceNode.size);
        const currentTargetPos = sourceNode.currentPos.clone().lerp(targetNode.currentPos, edgeProgress);

        positions[ptr] = sourceNode.currentPos.x;
        positions[ptr + 1] = sourceNode.currentPos.y;
        positions[ptr + 2] = sourceNode.currentPos.z;

        positions[ptr + 3] = currentTargetPos.x;
        positions[ptr + 4] = currentTargetPos.y;
        positions[ptr + 5] = currentTargetPos.z;
      } else {
        positions[ptr] = sourceNode.currentPos.x;
        positions[ptr + 1] = sourceNode.currentPos.y;
        positions[ptr + 2] = sourceNode.currentPos.z;

        positions[ptr + 3] = sourceNode.currentPos.x;
        positions[ptr + 4] = sourceNode.currentPos.y;
        positions[ptr + 5] = sourceNode.currentPos.z;
      }

      ptr += 6;
    });

    this.connectionsLineSegments.geometry.attributes.position.needsUpdate = true;
  }

  animatePulses(time) {
    if (!this.pulsesGroup || this.edgePairs.length === 0) return;

    // Filter all currently active edge connections
    const activeEdges = this.edgePairs.filter(edge => {
      const s = this.nodesMap.get(edge.source.id);
      const t = this.nodesMap.get(edge.target.id);
      return s && t && s.currentScale > 0.05 && t.currentScale > 0.05;
    });

    const activeCount = activeEdges.length;

    this.pulsesGroup.children.forEach((pulse, index) => {
      if (activeCount > 0) {
        pulse.visible = true;
        const edge = activeEdges[index % activeCount];
        
        pulse.userData.progress += pulse.userData.speed;
        if (pulse.userData.progress > 1.0) pulse.userData.progress = 0.0;

        const sourceNode = this.nodesMap.get(edge.source.id);
        const targetNode = this.nodesMap.get(edge.target.id);

        if (sourceNode && targetNode) {
          const currentPos = sourceNode.currentPos.clone().lerp(targetNode.currentPos, pulse.userData.progress);
          pulse.position.copy(currentPos);

          if (edge.source.color) {
            pulse.material.color.set(edge.source.color);
          }
        }
      } else {
        pulse.visible = false;
      }
    });
  }

  setHoveredNode(nodeId) {
    this.hoveredNodeId = nodeId;
    document.body.style.cursor = nodeId ? 'pointer' : 'default';
  }

  setActiveNode(nodeId) {
    this.activeNodeId = nodeId;
  }

  getNodeById(nodeId) {
    return this.nodesMap.get(nodeId);
  }

  getNodesData() {
    return this.nodesData;
  }
}
