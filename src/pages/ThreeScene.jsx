import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <mesh rotation={[45, 45, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <div style={{ height: "500px" }}>
      <Canvas>
        {/* Light */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />

        {/* 3D Object */}
        <Box />

        {/* Mouse Control */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ThreeScene;
