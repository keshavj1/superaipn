import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function GalaxyEffect1() {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  /* WebGL can be refused (GPU under pressure, policy, old hardware). When it
     is, a CSS-only galaxy renders instead so the section never looks empty. */
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    /* WebGL is not guaranteed: it can be disabled by policy, unavailable in a
       VM or on old hardware, or refused when the GPU process is under pressure
       ("context lost and was blocked"). The constructor THROWS in those cases,
       and an uncaught throw inside an effect unmounts the whole React tree —
       which turned a failed decorative background into a completely blank
       homepage. Degrade to no galaxy instead. */
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      if (!renderer.getContext()) throw new Error("no context");
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    /* A full-viewport scene rotating forever is continuous motion the CSS
       reduced-motion guard cannot reach (WCAG 2.3.3). */
    controls.autoRotate = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = false;

    // Soft ambient + point light
    scene.add(new THREE.AmbientLight(0x8b5cf6, 0.3));
    const pointLight = new THREE.PointLight(0xc4b5fd, 1.2, 50);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);

    const center = new THREE.Vector3(0, 0, 0);
    const nodes = [];
    const hoverTargets = [];

    const tooltips = [
      "AI Capability", "Machine Learning", "Deep Learning",
      "Data Analytics", "Automation", "Cloud AI",
      "Computer Vision", "AI Security", "Smart Systems",
      "AI Infrastructure", "Predictive AI", "AI Optimization",
      "Big Data", "AI Decision Engine", "Enterprise AI",
      "AI Intelligence", "Real-time Insights", "AI Monitoring",
      "AI Automation", "AI Processing",
    ];

    // Node colors — white/cyan theme
    const nodeColor = new THREE.Color(0xffffff);
    const hoverColor = new THREE.Color(0x06b6d4);

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * Math.PI;
      const distance = 3 + Math.random() * 3;

      const x = distance * Math.cos(angle) * Math.cos(vertical);
      const y = distance * Math.sin(angle) * Math.cos(vertical);
      const z = distance * Math.sin(vertical);

      // Lines with subtle purple tint
      const geometry = new THREE.BufferGeometry().setFromPoints([
        center.clone(),
        center.clone(),
      ]);
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0x2d1b69,
          transparent: true,
          opacity: 0.5,
        })
      );
      scene.add(line);

      // Nodes — small glowing spheres
      const box = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshStandardMaterial({
          color: nodeColor,
          emissive: nodeColor,
          emissiveIntensity: 0.4,
        })
      );
      box.position.set(x, y, z);
      box.visible = false;
      box.userData.tooltip = tooltips[i % tooltips.length];
      scene.add(box);

      nodes.push({ target: new THREE.Vector3(x, y, z), line, box });
      hoverTargets.push(box);
    }

    let progress = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      progress = Math.min(progress + 0.008, 1);

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

    // Raycaster for hover tooltips
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHovered = null;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hoverTargets);
      const tooltip = tooltipRef.current;

      if (intersects.length > 0) {
        const obj = intersects[0].object;

        if (currentHovered && currentHovered !== obj) {
          currentHovered.material.color.copy(nodeColor);
          currentHovered.material.emissive.copy(nodeColor);
          currentHovered.material.emissiveIntensity = 0.4;
        }

        currentHovered = obj;
        obj.material.color.copy(hoverColor);
        obj.material.emissive.copy(hoverColor);
        obj.material.emissiveIntensity = 0.8;

        tooltip.style.display = "block";
        tooltip.style.left = `${event.clientX + 15}px`;
        tooltip.style.top = `${event.clientY + 15}px`;
        tooltip.textContent = obj.userData.tooltip;
      } else {
        tooltip.style.display = "none";
        if (currentHovered) {
          currentHovered.material.color.copy(nodeColor);
          currentHovered.material.emissive.copy(nodeColor);
          currentHovered.material.emissiveIntensity = 0.4;
          currentHovered = null;
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      scene.traverse((obj) => {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="treejssec relative" style={{ background: "var(--surface-galaxy)" }}>
      <div className="container mx-auto">
        <div className="relative w-full h-[100vh] overflow-hidden">

          {/* Floating labels */}
          <div
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 text-3xl font-bold tracking-tight"
            style={{
              color: "var(--galaxy-label-a)",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            Secure.
          </div>

          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 text-3xl font-bold tracking-tight"
            style={{
              color: "var(--galaxy-label-b)",
              animation: "float 4s ease-in-out infinite 1s",
            }}
          >
            Scalable.
          </div>

          <h2
            className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-4xl md:text-5xl font-black tracking-tight text-center"
            style={{
              background: "linear-gradient(135deg, #ffffff, #c4b5fd, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "float 5s ease-in-out infinite 0.5s",
            }}
          >
            Super AI
          </h2>

          {/* Tooltip */}
          <div
            ref={tooltipRef}
            style={{
              display: "none",
              position: "fixed",
              background: "rgba(139, 92, 246, 0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#e2d8f5",
              fontSize: "13px",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "10px",
              pointerEvents: "none",
              /* below the navbar (z-50) — was 100, which painted over it */
              zIndex: 20,
            }}
          />

          {/* Three.js container */}
          <div ref={containerRef} className="absolute inset-0 z-0" />

          {/* CSS fallback galaxy — only when WebGL is unavailable */}
          {webglFailed && (
            <div className="galaxy-fallback absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
              <div className="galaxy-fallback-nebula" />
              <div className="galaxy-fallback-stars" />
              <div className="galaxy-fallback-ring galaxy-fallback-ring-a" />
              <div className="galaxy-fallback-ring galaxy-fallback-ring-b" />
              <div className="galaxy-fallback-core" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GalaxyEffect1;