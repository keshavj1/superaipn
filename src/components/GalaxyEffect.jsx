import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function GalaxyEffect() {
  const containerRef = useRef(null);

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
      alpha: true
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

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const center = new THREE.Vector3(0, 0, 0);

    const nodes = [];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * Math.PI;
      const distance = 3 + Math.random() * 3;

      const x = distance * Math.cos(angle) * Math.cos(vertical);
      const y = distance * Math.sin(angle) * Math.cos(vertical);
      const z = distance * Math.sin(vertical);

      const geometry = new THREE.BufferGeometry().setFromPoints([
        center.clone(),
        center.clone()
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
      scene.add(box);

      nodes.push({
        target: new THREE.Vector3(x, y, z),
        line
      });
    }

    let progress = 0;

    function animate() {
      requestAnimationFrame(animate);

      controls.update();

      progress = Math.min(progress + 0.01, 1);

      nodes.forEach(({ target, line }) => {
        const pos = line.geometry.attributes.position.array;

        pos[3] = target.x * progress;
        pos[4] = target.y * progress;
        pos[5] = target.z * progress;

        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="treejs-section">

      <div className="treejs-header">
        <h2>Super AI</h2>
      </div>

      <div ref={containerRef} className="treejs-canvas"></div>

    </section>
  );
}