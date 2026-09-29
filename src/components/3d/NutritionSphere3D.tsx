'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NutritionSphere3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D components
    const ecosystemGroup = new THREE.Group();
    scene.add(ecosystemGroup);

    // 1. Central Core Sphere (Icosahedron / Bio-crystal)
    const coreGeometry = new THREE.IcosahedronGeometry(1.8, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x10b981,
      emissive: 0x064e3b,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      shininess: 90,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    ecosystemGroup.add(coreMesh);

    // 2. Inner Glowing Nucleus
    const innerGeometry = new THREE.SphereGeometry(1.1, 24, 24);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.45,
      wireframe: false,
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    ecosystemGroup.add(innerSphere);

    // 3. Orbiting Molecular Nodes (Protein, Antioxidants, Water, Micronutrients)
    const nodeColors = [
      0x10b981, // Emerald (Veggies / Greens)
      0x14b8a6, // Teal (Water / Hydration)
      0x06b6d4, // Cyan (Protein molecules)
      0x38bdf8, // Sky (Micronutrients)
      0xf59e0b, // Amber (Carbs / Energy)
      0xa855f7, // Purple (Antioxidants)
      0x34d399, // Bright Green
    ];

    const orbitingNodes: THREE.Mesh[] = [];
    const orbitRadii = [2.6, 3.1, 3.5, 2.9, 3.3, 3.7, 2.7];
    const orbitSpeeds = [0.8, -0.6, 0.9, -0.7, 0.5, -0.85, 0.65];

    nodeColors.forEach((color, i) => {
      const nodeGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      ecosystemGroup.add(node);
      orbitingNodes.push(node);
    });

    // 4. Orbiting Ring Lines
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.25,
    });

    [2.6, 3.1, 3.5].forEach((radius) => {
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(points);
      const ring = new THREE.Line(ringGeo, ringMaterial);
      ring.rotation.x = Math.PI / 4 + radius * 0.2;
      ring.rotation.y = radius * 0.3;
      ecosystemGroup.add(ring);
    });

    // 5. Ambient Floating Particles Cloud
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x10b981);
    const c2 = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = c1.clone().lerp(c2, Math.random());
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    ecosystemGroup.add(particles);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a251b, 1.8);
    scene.add(ambientLight);

    const pointLightEmerald = new THREE.PointLight(0x10b981, 2.5, 50);
    pointLightEmerald.position.set(5, 5, 5);
    scene.add(pointLightEmerald);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 2.2, 50);
    pointLightCyan.position.set(-5, -4, 4);
    scene.add(pointLightCyan);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop with Visibility checking
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ecosystemGroup.rotation.y = elapsedTime * 0.25 + mouseX;
      ecosystemGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + mouseY;

      coreMesh.rotation.y = elapsedTime * 0.35;
      coreMesh.rotation.x = elapsedTime * 0.2;

      innerSphere.scale.setScalar(1 + Math.sin(elapsedTime * 2.5) * 0.06);

      // Animate orbiting nodes
      orbitingNodes.forEach((node, i) => {
        const radius = orbitRadii[i];
        const speed = orbitSpeeds[i];
        const angle = elapsedTime * speed + (i * Math.PI * 2) / orbitingNodes.length;

        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle * 1.2) * (radius * 0.5);
        node.position.z = Math.sin(angle) * radius;
      });

      particles.rotation.y = -elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] md:h-[540px] flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Decorative Glow Aura Behind 3D Object */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute w-56 h-56 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none -z-10" />
    </div>
  );
};
