"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Points } from "three";

type Point3 = [number, number, number];
type ShapeKind = "box" | "cylinder" | "dodecahedron" | "icosahedron" | "octahedron" | "sphere" | "torus";

const sectionColors: Record<string, { primary: string; secondary: string }> = {
  hero: { primary: "#a78bfa", secondary: "#67e8f9" },
  about: { primary: "#67e8f9", secondary: "#c4b5fd" },
  experience: { primary: "#a78bfa", secondary: "#67e8f9" },
  skills: { primary: "#67e8f9", secondary: "#a78bfa" },
  projects: { primary: "#a78bfa", secondary: "#a5f3fc" },
  education: { primary: "#c4b5fd", secondary: "#67e8f9" },
  certifications: { primary: "#67e8f9", secondary: "#a78bfa" },
  contact: { primary: "#a78bfa", secondary: "#67e8f9" },
};

function WireShape({
  kind,
  size,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  opacity = 0.58,
}: {
  kind: ShapeKind;
  size: number;
  color: string;
  position?: Point3;
  rotation?: Point3;
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      {kind === "box" ? <boxGeometry args={[size, size, size * 0.12]} /> : null}
      {kind === "cylinder" ? <cylinderGeometry args={[size * 0.68, size * 0.84, size * 0.18, 8]} /> : null}
      {kind === "dodecahedron" ? <dodecahedronGeometry args={[size, 0]} /> : null}
      {kind === "icosahedron" ? <icosahedronGeometry args={[size, 0]} /> : null}
      {kind === "octahedron" ? <octahedronGeometry args={[size, 0]} /> : null}
      {kind === "sphere" ? <sphereGeometry args={[size, 10, 8]} /> : null}
      {kind === "torus" ? <torusGeometry args={[size, Math.max(0.012, size * 0.025), 6, 48]} /> : null}
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function TimelineBeam({ color }: { color: string }) {
  return (
    <mesh>
      <boxGeometry args={[0.018, 2.2, 0.018]} />
      <meshBasicMaterial color={color} transparent opacity={0.42} />
    </mesh>
  );
}

function SectionMotif({ sectionId, reduceMotion }: { sectionId: string; reduceMotion: boolean }) {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);
  const canvasWidth = useThree((state) => state.size.width);
  const colors = sectionColors[sectionId] ?? sectionColors.hero;
  const sectionIndex = Object.keys(sectionColors).indexOf(sectionId);
  const sideOffset = canvasWidth < 640 ? 1.1 : 2.65;
  const side = sectionIndex % 2 === 0 ? sideOffset : -sideOffset;

  useFrame((_, delta) => {
    if (!group.current || reduceMotion) return;
    elapsed.current += delta;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x = Math.sin(elapsed.current * 0.2) * 0.08;
    group.current.position.y = Math.sin(elapsed.current * 0.35) * 0.14;
  });

  return (
    <group ref={group} position={[side, 0, -1.5]}>
      {sectionId === "hero" ? (
        <>
          <WireShape kind="torus" size={1.25} color={colors.secondary} rotation={[0.8, 0.2, 0.3]} opacity={0.28} />
          <WireShape kind="icosahedron" size={0.62} color={colors.primary} position={[0, 0, 0.1]} opacity={0.7} />
          <WireShape kind="octahedron" size={0.22} color={colors.secondary} position={[-1.2, -0.9, 0.3]} />
        </>
      ) : null}
      {sectionId === "about" ? (
        <>
          <WireShape kind="sphere" size={0.42} color={colors.primary} opacity={0.65} />
          <WireShape kind="torus" size={1.15} color={colors.secondary} rotation={[1.1, 0.1, 0.2]} opacity={0.32} />
          <WireShape kind="torus" size={1.15} color={colors.primary} rotation={[0.2, 1.1, 0.4]} opacity={0.25} />
          <WireShape kind="octahedron" size={0.14} color={colors.secondary} position={[1.05, 0.45, 0.2]} />
          <WireShape kind="octahedron" size={0.12} color={colors.primary} position={[-0.8, -0.8, -0.2]} />
        </>
      ) : null}
      {sectionId === "experience" ? (
        <>
          <TimelineBeam color={colors.secondary} />
          {[-0.82, 0, 0.82].map((y, index) => (
            <WireShape key={y} kind={index === 1 ? "icosahedron" : "sphere"} size={index === 1 ? 0.2 : 0.13} color={index === 1 ? colors.primary : colors.secondary} position={[0, y, 0.08]} />
          ))}
          <WireShape kind="torus" size={0.75} color={colors.primary} rotation={[0.5, 0.5, 0]} position={[0.82, 0.84, -0.1]} opacity={0.26} />
        </>
      ) : null}
      {sectionId === "skills" ? (
        <>
          <WireShape kind="dodecahedron" size={0.68} color={colors.primary} opacity={0.68} />
          <WireShape kind="torus" size={1.2} color={colors.secondary} rotation={[0.9, 0.2, 0.4]} opacity={0.3} />
          <WireShape kind="torus" size={1.2} color={colors.primary} rotation={[0.2, 0.9, 1.1]} opacity={0.22} />
          <WireShape kind="octahedron" size={0.17} color={colors.secondary} position={[1.1, 0.58, 0.1]} />
          <WireShape kind="icosahedron" size={0.15} color={colors.primary} position={[-1, -0.74, 0.15]} />
        </>
      ) : null}
      {sectionId === "projects" ? (
        <>
          <WireShape kind="box" size={0.9} color={colors.primary} position={[-0.55, 0.3, 0]} rotation={[0.12, 0.3, -0.2]} opacity={0.55} />
          <WireShape kind="box" size={0.9} color={colors.secondary} position={[0.25, 0, 0.1]} rotation={[-0.18, -0.4, 0.14]} opacity={0.58} />
          <WireShape kind="box" size={0.9} color={colors.primary} position={[0.95, -0.28, 0.2]} rotation={[0.2, 0.2, -0.12]} opacity={0.4} />
          <WireShape kind="sphere" size={0.12} color={colors.secondary} position={[-0.8, -0.9, 0.2]} />
        </>
      ) : null}
      {sectionId === "education" ? (
        <>
          <WireShape kind="box" size={0.92} color={colors.primary} position={[-0.36, 0, 0]} rotation={[0, 0, -0.12]} opacity={0.54} />
          <WireShape kind="box" size={0.92} color={colors.secondary} position={[0.36, 0, 0]} rotation={[0, 0, 0.12]} opacity={0.54} />
          <WireShape kind="torus" size={0.78} color={colors.primary} rotation={[1.2, 0.2, 0]} position={[0.12, 0.92, 0.1]} opacity={0.3} />
          <WireShape kind="icosahedron" size={0.17} color={colors.secondary} position={[0.12, 0.92, 0.1]} />
        </>
      ) : null}
      {sectionId === "certifications" ? (
        <>
          <WireShape kind="cylinder" size={0.62} color={colors.primary} rotation={[0.18, 0.3, 0.1]} opacity={0.48} />
          <WireShape kind="torus" size={0.68} color={colors.secondary} rotation={[0.4, 0.2, 0.15]} opacity={0.56} />
          <WireShape kind="octahedron" size={0.28} color={colors.primary} position={[0, 0, 0.25]} opacity={0.74} />
          <WireShape kind="box" size={0.28} color={colors.secondary} position={[-0.25, -0.86, 0]} rotation={[0, 0, 0.18]} opacity={0.42} />
          <WireShape kind="box" size={0.28} color={colors.primary} position={[0.25, -0.86, 0]} rotation={[0, 0, -0.18]} opacity={0.42} />
        </>
      ) : null}
      {sectionId === "contact" ? (
        <>
          <WireShape kind="icosahedron" size={0.54} color={colors.primary} opacity={0.68} />
          <WireShape kind="torus" size={0.96} color={colors.secondary} rotation={[0.5, 0.1, 0.15]} opacity={0.48} />
          <WireShape kind="torus" size={1.28} color={colors.primary} rotation={[1.1, 0.2, 0.1]} opacity={0.3} />
          <WireShape kind="sphere" size={0.14} color={colors.secondary} position={[1.18, 0.5, 0.2]} />
        </>
      ) : null}
    </group>
  );
}

function ParticleField({ reduceMotion }: { reduceMotion: boolean }) {
  const points = useRef<Points>(null);
  const elapsed = useRef(0);
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

  useFrame((_, delta) => {
    if (!points.current || reduceMotion) return;
    elapsed.current += delta;
    points.current.rotation.z = elapsed.current * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#a5f3fc" size={0.035} transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

export function AmbientScene({ sectionId }: { sectionId: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const colors = sectionColors[sectionId] ?? sectionColors.hero;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true">
      <Canvas dpr={[1, 1.25]} frameloop={reduceMotion ? "demand" : "always"} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 4, 5]} intensity={1.2} color={colors.secondary} />
        <pointLight position={[-4, -2, 3]} intensity={1.8} color={colors.primary} />
        <SectionMotif sectionId={sectionId} reduceMotion={reduceMotion} />
        <ParticleField reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
