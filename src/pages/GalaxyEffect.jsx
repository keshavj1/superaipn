import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function GalaxyEffect() {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enableDamping = true;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Nodes + Lines
    const center = new THREE.Vector3(0, 0, 0);
    const nodes = [];
    const hoverTargets = [];

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * Math.PI;
      const distance = 3 + Math.random() * 3;

      const x = distance * Math.cos(angle) * Math.cos(vertical);
      const y = distance * Math.sin(angle) * Math.cos(vertical);
      const z = distance * Math.sin(vertical);

      // Line
      const geometry = new THREE.BufferGeometry().setFromPoints([
        center.clone(),
        center.clone(),
      ]);

      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x333333 })
      );

      scene.add(line);

      // Box
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshStandardMaterial({
          color: Math.random() < 0.5 ? 0x555555 : 0x00ffff,
        })
      );

      box.position.set(x, y, z);
      box.visible = false;
      box.userData.tooltip = "AI Capability";

      scene.add(box);

      nodes.push({
        target: new THREE.Vector3(x, y, z),
        line,
        box,
      });

      hoverTargets.push(box);
    }

    // Animation
    let progress = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();

      progress = Math.min(progress + 0.01, 1);

      nodes.forEach(({ target, line, box }) => {
        const pos = line.geometry.attributes.position.array;
        pos[3] = target.x * progress;
        pos[4] = target.y * progress;
        pos[5] = target.z * progress;
        line.geometry.attributes.position.needsUpdate = true;

        if (progress >= 1) box.visible = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Tooltip logic
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hoverTargets);

      if (intersects.length > 0) {
        tooltipRef.current.style.display = "block";
        tooltipRef.current.style.left = `${event.clientX + 10}px`;
        tooltipRef.current.style.top = `${event.clientY + 10}px`;
        tooltipRef.current.textContent =
          intersects[0].object.userData.tooltip;
      } else {
        tooltipRef.current.style.display = "none";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden text-white">
      
      {/* Left */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-3xl font-semibold z-10">
        Secure.
      </div>

      {/* Right */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-3xl font-semibold z-10">
        Scalable.
      </div>

      {/* Top */}
      <h2 className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl font-bold z-10">
        Super AI
      </h2>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute hidden bg-black/70 text-white text-sm px-3 py-1 rounded pointer-events-none z-20"
      />

      {/* Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0" />
    </section>
  );
}