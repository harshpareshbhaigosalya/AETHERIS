import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBrainCore() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Glowing Icosahedron (The Core)
    const innerGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    coreGroup.add(innerCore);

    // 2. Center Solid Glow Nucleus
    const nucleusGeometry = new THREE.DodecahedronGeometry(1.2, 0);
    const nucleusMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    coreGroup.add(nucleus);

    // 3. Orbital Ring 1 (Cyan)
    const ring1Geometry = new THREE.TorusGeometry(3.2, 0.03, 16, 100);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Orbital Ring 2 (Purple / Magenta)
    const ring2Geometry = new THREE.TorusGeometry(3.6, 0.025, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Orbital Ring 3 (Emerald / Gold Accent)
    const ring3Geometry = new THREE.TorusGeometry(4.0, 0.02, 16, 100);
    const ring3Material = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
    });
    const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // 6. Floating Synaptic Cloud Particles
    const particlesCount = 700;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorCyan = new THREE.Color(0x06b6d4);
    const colorViolet = new THREE.Color(0xa855f7);
    const colorGold = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particlesCount; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(theta);

      // Interpolate colors
      const mixed = Math.random();
      const c = mixed < 0.5 ? colorCyan.clone().lerp(colorViolet, mixed * 2) : colorViolet.clone().lerp(colorGold, (mixed - 0.5) * 2);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    coreGroup.add(particlesMesh);

    // Interactive Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotations
      innerCore.rotation.y = elapsedTime * 0.25;
      innerCore.rotation.x = elapsedTime * 0.15;

      nucleus.rotation.y = -elapsedTime * 0.4;
      nucleus.rotation.z = elapsedTime * 0.2;

      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.x = -elapsedTime * 0.25;
      ring3.rotation.y = elapsedTime * 0.2;

      particlesMesh.rotation.y = elapsedTime * 0.08;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Group tilt based on mouse
      coreGroup.rotation.y = currentX + elapsedTime * 0.05;
      coreGroup.rotation.x = -currentY;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      innerGeometry.dispose();
      innerMaterial.dispose();
      nucleusGeometry.dispose();
      nucleusMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      ring3Geometry.dispose();
      ring3Material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[480px] lg:min-h-[640px] relative pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center"
    />
  );
}
