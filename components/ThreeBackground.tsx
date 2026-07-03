"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Check touch capabilities
    const isTouch = !window.matchMedia("(pointer: fine)").matches;

    // 1. Setup Scene, Camera and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // 2. Spawn reflective 3D geometric objects
    const geometries = [
      new THREE.TorusGeometry(2, 0.6, 16, 64),
      new THREE.OctahedronGeometry(1.8, 0),
      new THREE.SphereGeometry(1.5, 32, 32),
    ];

    // Premium metallic/reflective materials matching accents
    const materials = [
      // Bronze Ring
      new THREE.MeshPhysicalMaterial({
        color: 0xcd7f32,
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
      }),
      // Silver Crystal
      new THREE.MeshPhysicalMaterial({
        color: 0xa0a0a0,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
        reflectivity: 0.9,
      }),
      // Warm White Pearl
      new THREE.MeshPhysicalMaterial({
        color: 0xf5f5f5,
        metalness: 0.1,
        roughness: 0.25,
        transmission: 0.3,
        thickness: 0.8,
        roughnessMap: null,
      }),
    ];

    const meshes: THREE.Mesh[] = [];
    const group = new THREE.Group();

    geometries.forEach((geom, idx) => {
      const mesh = new THREE.Mesh(geom, materials[idx]);
      
      // Position objects far apart in space
      if (idx === 0) {
        mesh.position.set(-6, 2, -2);
      } else if (idx === 1) {
        mesh.position.set(6, -3, -1);
      } else {
        mesh.position.set(0, 4, -4);
      }
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      meshes.push(mesh);
      group.add(mesh);
    });

    scene.add(group);

    // 3. Add Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x050505, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf5f5f5, 2.0);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Mouse follow spotlight
    const spotlight = new THREE.SpotLight(0xd4a373, 15.0, 40, Math.PI / 4, 0.5, 1);
    spotlight.position.set(0, 0, 15);
    scene.add(spotlight);

    // 4. Handle Mouse Movement Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update globals.css spotlight variables
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // 5. Animation loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates for smooth lag-behind
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Translate group based on mouse coordinates (parallax)
      group.position.x = mouse.x * 2.0;
      group.position.y = mouse.y * 2.0;

      // Spotlight follows mouse positions
      spotlight.position.x = mouse.x * 12;
      spotlight.position.y = mouse.y * 12;

      // Rotate individual mesh objects at different speeds
      meshes.forEach((mesh, idx) => {
        const factor = idx + 1;
        mesh.rotation.x = elapsedTime * 0.15 * factor;
        mesh.rotation.y = elapsedTime * 0.22 * factor;
        
        // Gentle bobbing motion
        mesh.position.y += Math.sin(elapsedTime * 0.6 + idx) * 0.005;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Handle Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-transparent"
    >
      <div className="ambient-spotlight" />
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
