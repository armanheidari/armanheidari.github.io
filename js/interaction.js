/**
 * The Growing Cosmic Mind - Raycasting, Floating Glass Cards & 3D Spatial Labels Controller
 * Manages 3D node selection, hover pathways, raycasting, floating spatial labels, and glassmorphism modal content.
 */

import * as THREE from 'three';

export class InteractionController {
  constructor(camera, scene, networkSystem, scrollController) {
    this.camera = camera;
    this.scene = scene;
    this.networkSystem = networkSystem;
    this.scrollController = scrollController;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1000, -1000);
    this.intersectedNodeId = null;

    // Modal UI Elements
    this.modalContainer = document.getElementById('modal-container');
    this.modalCloseBtn = document.querySelector('.modal-close-btn');

    this.modalCategory = document.querySelector('.modal-category');
    this.modalTitle = document.querySelector('.modal-title');
    this.modalSubtitle = document.querySelector('.modal-subtitle');
    this.modalBody = document.querySelector('.modal-body');
    this.modalHighlights = document.querySelector('.modal-highlights');
    this.modalTags = document.querySelector('.modal-tags');
    this.modalActions = document.querySelector('.modal-actions');

    this.isModalOpen = false;

    // Spatial 3D Labels DOM Elements Map
    this.spatialLabelsContainer = document.getElementById('spatial-labels-container');
    this.spatialLabelsMap = new Map();

    this.initSpatialLabels();
    this.initListeners();
  }

  initSpatialLabels() {
    if (!this.spatialLabelsContainer) return;

    const nodesData = this.networkSystem.getNodesData();

    nodesData.forEach(node => {
      const labelEl = document.createElement('div');
      labelEl.className = 'spatial-label';
      labelEl.setAttribute('data-node-id', node.id);
      labelEl.style.setProperty('--node-color', node.color);
      labelEl.style.setProperty('--node-glow', `${node.color}55`);

      const badgeText = node.category || (node.isSatellite ? 'Project' : 'Domain');

      labelEl.innerHTML = `
        <span class="spatial-label-badge">${badgeText}</span>
        <span class="spatial-label-text">${node.label}</span>
        <span class="spatial-label-hint">✦ Click</span>
      `;

      // Event handlers for spatial labels
      labelEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openModal(node.id);
      });

      labelEl.addEventListener('mouseenter', () => {
        if (!this.isModalOpen) {
          this.networkSystem.setHoveredNode(node.id);
        }
      });

      labelEl.addEventListener('mouseleave', () => {
        if (!this.isModalOpen) {
          this.networkSystem.setHoveredNode(null);
        }
      });

      this.spatialLabelsContainer.appendChild(labelEl);
      this.spatialLabelsMap.set(node.id, labelEl);
    });
  }

  initListeners() {
    // 1. Mouse Move Raycasting
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.performRaycast();
    }, { passive: true });

    // Touch support for mobile raycasting
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        this.performRaycast();
      }
    }, { passive: true });

    // 2. Click / Tap Handling
    window.addEventListener('click', (e) => {
      // If modal is active, check if clicking close button or outside card overlay
      if (this.isModalOpen) {
        const isClickOnClose = this.modalCloseBtn && (this.modalCloseBtn === e.target || this.modalCloseBtn.contains(e.target));
        const isClickOutsideCard = e.target === this.modalContainer;

        if (isClickOnClose || isClickOutsideCard) {
          this.closeModal();
          e.stopPropagation();
        }
        return;
      }

      // If modal is closed, open modal for intersected 3D node
      if (this.intersectedNodeId) {
        this.openModal(this.intersectedNodeId);
      }
    });

    // 3. Explicit Close Button Event Handler
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeModal();
      });
    }

    // 4. Modal Overlay Click to Close
    if (this.modalContainer) {
      this.modalContainer.addEventListener('click', (e) => {
        if (e.target === this.modalContainer) {
          this.closeModal();
        }
      });
    }

    // 5. ESC Key Listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  performRaycast() {
    if (this.isModalOpen) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Check solid instanced mesh, hollow spheres, & project satellites
    const solidMesh = this.networkSystem.solidNodesMesh;
    const hollowGroup = this.networkSystem.hollowNodesGroup;
    const satellitesGroup = this.networkSystem.satellitesGroup;

    const intersectsSatellites = satellitesGroup ? this.raycaster.intersectObjects(satellitesGroup.children, true) : [];
    const intersectsSolid = solidMesh ? this.raycaster.intersectObject(solidMesh) : [];
    const intersectsHollow = hollowGroup ? this.raycaster.intersectObjects(hollowGroup.children, true) : [];

    let hoveredId = null;

    if (intersectsSatellites.length > 0) {
      let obj = intersectsSatellites[0].object;
      while (obj && !obj.userData.nodeId && obj.parent) {
        obj = obj.parent;
      }
      if (obj && obj.userData.nodeId) {
        hoveredId = obj.userData.nodeId;
      }
    } else if (intersectsSolid.length > 0) {
      const instanceId = intersectsSolid[0].instanceId;
      const nodesData = this.networkSystem.getNodesData();
      if (nodesData[instanceId]) {
        hoveredId = nodesData[instanceId].id;
      }
    } else if (intersectsHollow.length > 0) {
      let obj = intersectsHollow[0].object;
      while (obj && !obj.userData.nodeId && obj.parent) {
        obj = obj.parent;
      }
      if (obj && obj.userData.nodeId) {
        hoveredId = obj.userData.nodeId;
      }
    }

    if (hoveredId !== this.intersectedNodeId) {
      this.intersectedNodeId = hoveredId;
      this.networkSystem.setHoveredNode(this.intersectedNodeId);
    }
  }

  updateSpatialLabels() {
    if (this.isModalOpen) {
      this.spatialLabelsMap.forEach(el => el.classList.remove('visible'));
      return;
    }

    const tempVec = new THREE.Vector3();
    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    this.networkSystem.getNodesData().forEach(node => {
      const labelEl = this.spatialLabelsMap.get(node.id);
      const liveNode = this.networkSystem.getNodeById(node.id);

      if (!labelEl || !liveNode) return;

      if (liveNode.currentScale > 0.08) {
        tempVec.copy(liveNode.currentPos);
        tempVec.project(this.camera);

        // Check if node is in front of camera lens
        if (tempVec.z < 1.0) {
          const x = (tempVec.x * widthHalf) + widthHalf;
          const y = (-(tempVec.y * heightHalf)) + heightHalf;

          labelEl.style.left = `${x}px`;
          labelEl.style.top = `${y}px`;
          labelEl.classList.add('visible');
        } else {
          labelEl.classList.remove('visible');
        }
      } else {
        labelEl.classList.remove('visible');
      }
    });
  }

  openModal(nodeId) {
    const node = this.networkSystem.getNodeById(nodeId);
    if (!node || !node.content) return;

    const c = node.content;

    // Populate modal content
    if (this.modalCategory) this.modalCategory.textContent = node.category || 'Node Detail';
    if (this.modalTitle) this.modalTitle.textContent = c.title || node.label;
    if (this.modalSubtitle) this.modalSubtitle.textContent = c.subtitle || '';
    if (this.modalBody) this.modalBody.textContent = c.body || '';

    // Populate Highlights List
    if (this.modalHighlights) {
      this.modalHighlights.innerHTML = '';
      if (c.highlights && c.highlights.length > 0) {
        c.highlights.forEach(h => {
          const li = document.createElement('li');
          li.textContent = h;
          this.modalHighlights.appendChild(li);
        });
        this.modalHighlights.style.display = 'flex';
      } else {
        this.modalHighlights.style.display = 'none';
      }
    }

    // Populate Tag Pills
    if (this.modalTags) {
      this.modalTags.innerHTML = '';
      if (c.tags && c.tags.length > 0) {
        c.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag-pill';
          span.textContent = tag;
          this.modalTags.appendChild(span);
        });
        this.modalTags.style.display = 'flex';
      } else {
        this.modalTags.style.display = 'none';
      }
    }

    // Populate Action Buttons (GitHub, Email, LinkedIn, etc.)
    if (this.modalActions) {
      this.modalActions.innerHTML = '';
      
      if (c.github) {
        const btn = document.createElement('a');
        btn.className = 'btn-glass primary';
        btn.target = '_blank';
        btn.rel = 'noopener';
        btn.href = c.github;
        btn.innerHTML = `<span>View on GitHub</span> ↗`;
        this.modalActions.appendChild(btn);
      }

      if (c.actions && c.actions.length > 0) {
        c.actions.forEach(action => {
          if (action.link) {
            const btn = document.createElement('a');
            btn.className = `btn-glass ${action.isPrimary ? 'primary' : ''}`;
            btn.target = '_blank';
            btn.rel = 'noopener';
            btn.href = action.link;
            btn.innerHTML = `<span>${action.text}</span> ↗`;
            this.modalActions.appendChild(btn);
          } else if (action.targetStage && this.scrollController) {
            const btn = document.createElement('button');
            btn.className = 'btn-glass primary';
            btn.textContent = action.text;
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.closeModal();
              this.scrollController.scrollToStage(action.targetStage);
            });
            this.modalActions.appendChild(btn);
          }
        });
      }
    }

    // Activate Modal display
    this.isModalOpen = true;
    this.networkSystem.setActiveNode(nodeId);
    if (this.modalContainer) this.modalContainer.classList.add('active');
  }

  closeModal() {
    this.isModalOpen = false;
    this.intersectedNodeId = null;
    this.networkSystem.setActiveNode(null);
    this.networkSystem.setHoveredNode(null);
    if (this.modalContainer) this.modalContainer.classList.remove('active');
  }
}
