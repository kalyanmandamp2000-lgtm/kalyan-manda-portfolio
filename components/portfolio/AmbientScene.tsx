"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh, Points } from "three";

function OrbitalField() {
  const group = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.x += delta * 0.035;
    group.current.rotation.y += delta * 0.045;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.12;
  });

  return (
    <group ref={group} position={[0, 0, -1.5]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.7}>
        <mesh rotation={[0.45, 0.2, 0.15]}>
          <torusGeometry args={[3.2, 0.012, 10, 160]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} transparent opacity={0.45} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={1.1}>
        <mesh position={[2.1, 0.8, 0.2]}>
          <icosahedronGeometry args={[0.35, 1]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.7} wireframe />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.24} floatIntensity={0.8}>
        <mesh position={[-2.2, -0.8, 0.4]} rotation={[0.4, 0.2, 0.7]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const points = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(42 * 3);
    for (let index = 0; index < 42; index += 1) {
      const seed = (index * 17) % 97;
      values[index * 3] = ((seed % 13) / 13 - 0.5) * 12;
      values[index * 3 + 1] = (((seed * 7) % 17) / 17 - 0.5) * 8;
      values[index * 3 + 2] = (((seed * 11) % 19) / 19 - 0.5) * 4;
    }
    return values;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.z = state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#67e8f9" size={0.035} transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

export function AmbientScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 4, 5]} intensity={1.2} color="#60a5fa" />
        <pointLight position={[-4, -2, 3]} intensity={2.3} color="#a855f7" />
        <OrbitalField />
        <ParticleField />
      </Canvas>
    </div>
  );
}
