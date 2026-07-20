import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function GalaxyEffect1() {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const center = new THREE.Vector3(0, 0, 0);

    const nodes = [];
    const hoverTargets = [];

    const tooltips = [
      "AI Capability",
      "Machine Learning",
      "Deep Learning",
      "Data Analytics",
      "Automation",
      "Cloud AI",
      "Computer Vision",
      "AI Security",
      "Smart Systems",
      "AI Infrastructure",
      "Predictive AI",
      "AI Optimization",
      "Big Data",
      "AI Decision Engine",
      "Enterprise AI",
      "AI Intelligence",
      "Real-time Insights",
      "AI Monitoring",
      "AI Automation",
      "AI Processing"
    ];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * Math.PI;
      const distance = 3 + Math.random() * 3;

      const x = distance * Math.cos(angle) * Math.cos(vertical);
      const y = distance * Math.sin(angle) * Math.cos(vertical);
      const z = distance * Math.sin(vertical);

      const geometry = new THREE.BufferGeometry().setFromPoints([
        center.clone(),
        center.clone(),
      ]);

      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x333333 })
      );

      scene.add(line);

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.12, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x00ffff })
      );

      box.position.set(x, y, z);
      box.visible = false;
      box.userData.tooltip = tooltips[i % tooltips.length];

      scene.add(box);

      nodes.push({
        target: new THREE.Vector3(x, y, z),
        line,
        box,
      });

      hoverTargets.push(box);
    }

    let progress = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

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
          currentHovered.material.color.set(0x00ffff);
        }

        currentHovered = obj;
        obj.material.color.set(0xff0000);

        tooltip.style.display = "block";
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.textContent = obj.userData.tooltip;
        tooltip.style.color = "red";
      } else {
        tooltip.style.display = "none";

        if (currentHovered) {
          currentHovered.material.color.set(0x00ffff);
          currentHovered = null;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <section  className="treejssec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                 <div className="relative w-full h-[100vh] bg-black overflow-hidden text-black">
      
      <div
        className="absolute left-10 top-1/2 -translate-y-1/2 text-3xl font-semibold z-10"
        style={{ color: "#19369d" }}
      >
        Secure.
      </div>

      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 text-3xl font-semibold z-10"
        style={{ color: "#19369d",background: "rgba(255, 255, 255, 0.7)", padding: "0.5rem 1rem", borderRadius: "8px" }}
      >
        Scalable.
      </div>

      <h2
        className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl font-bold z-10"
        style={{ color: "#19369d" }}
      >
        Super AI
      </h2>

      <div
        ref={tooltipRef}
        className="absolute hidden bg-black/70 text-black text-sm px-3 py-1 rounded pointer-events-none z-20"
      />

      <div ref={containerRef} className="absolute inset-0 z-0" />
    </div>
            </div>
          </div>
        </div>
      </section>
    </div>
 
  );
}

export default GalaxyEffect1;