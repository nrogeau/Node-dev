import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Branch({ depth, maxDepth, thickness, angle }) {
  if (depth > maxDepth) return null;

  const length = 2;
  const nextThickness = thickness / 2;
  const nextDepth = depth + 1;

  return (
    <group>
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={[thickness, thickness, length, 8]} />
        <meshStandardMaterial color={`hsl(${depth * 40}, 60%, 50%)`} />
      </mesh>

      <group position={[0, length, 0]} rotation={[THREE.MathUtils.degToRad(angle), 0, 0]}>
        <Branch depth={nextDepth} maxDepth={maxDepth} thickness={nextThickness} angle={angle} />
      </group>

      <group position={[0, length, 0]} rotation={[THREE.MathUtils.degToRad(-angle), 0, 0]}>
        <Branch depth={nextDepth} maxDepth={maxDepth} thickness={nextThickness} angle={angle} />
      </group>
    </group>
  );
}

export default function FractalTreeViewer() {
  const [n, setN] = useState(3);
  const [initialThickness, setInitialThickness] = useState(0.2);
  const [angle, setAngle] = useState(30);

  const [azimuth, setAzimuth] = useState(0);
  const [polar, setPolar] = useState(Math.PI / 2); // default 90° angle from Y axis

  const controlsRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      if (keys.includes(e.key)) {
        e.preventDefault(); // ⛔️ Prevent page scroll

        if (e.key === 'ArrowLeft') {
          setAzimuth((prev) => prev - 0.1);
        } else if (e.key === 'ArrowRight') {
          setAzimuth((prev) => prev + 0.1);
        } else if (e.key === 'ArrowUp') {
          setPolar((prev) => Math.max(0.1, prev - 0.1));
        } else if (e.key === 'ArrowDown') {
          setPolar((prev) => Math.min(Math.PI - 0.1, prev + 0.1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false }); // passive: false required for preventDefault()
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.setAzimuthalAngle(azimuth);
      controlsRef.current.setPolarAngle(polar);
      controlsRef.current.update();
    }
  }, [azimuth, polar]);

  return (
    <div className="rounded-container">
      <label>Depth: {n}</label>
      <input
        type="range"
        min={1}
        max={5}
        value={n}
        onChange={(e) => setN(parseInt(e.target.value))}
      />
      <label>Thickness: {initialThickness}</label>
      <input
        type="range"
        min={0.05}
        max={0.5}
        step={0.05}
        value={initialThickness}
        onChange={(e) => setInitialThickness(parseFloat(e.target.value))}
      />
      <label>Angle: {angle}°</label>
      <input
        type="range"
        min={0}
        max={90}
        value={angle}
        onChange={(e) => setAngle(parseFloat(e.target.value))}
      />

      <div style={{ height: '70vh' }}>
        <Canvas camera={{ position: [10, 5, 0], fov: 50 }} shadows>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <OrbitControls ref={controlsRef} />
          <group position={[0, -3, 0]}>
            <Branch depth={1} maxDepth={n} thickness={initialThickness} angle={angle} />
          </group>
        </Canvas>
      </div>
    </div>
  );
}
