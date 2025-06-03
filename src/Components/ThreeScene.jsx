import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export default function ThreeScene() {
  const [diameter, setDiameter] = useState(1);

  const handleSliderChange = (e) => {
    setDiameter(parseFloat(e.target.value));
  };

  return (
    <div className="rounded-container">
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        Diameter: {diameter.toFixed(2)}
      </label>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        value={diameter}
        onChange={handleSliderChange}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <div style={{ height: '60vh', width: '100%' }}>
        <Canvas camera={{ position: [4, 3, 4], fov: 50 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Environment preset="sunset" />

          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.2} />
          </mesh>

          <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[diameter / 2, diameter / 2, 2, 32]} />
            <meshStandardMaterial color="#4FD1C5" />
          </mesh>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
