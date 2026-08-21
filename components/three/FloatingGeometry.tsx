"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";

// ── Floating geometry particles ──────────────────────────────────────────────

function IcosahedronMesh({
  position,
  speed,
  scale,
  color,
}: {
  position: [number, number, number];
  speed: number;
  scale: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.5;
    ref.current.position.y =
      position[1] + Math.sin(t * speed * 0.5 + offset.current) * 0.4;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function TorusKnotMesh({
  position,
  speed,
  scale,
  color,
}: {
  position: [number, number, number];
  speed: number;
  scale: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.2;
    ref.current.rotation.z = t * speed * 0.4;
    ref.current.position.y =
      position[1] + Math.sin(t * speed * 0.4 + offset.current) * 0.5;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusKnotGeometry args={[0.6, 0.18, 80, 12]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function OctahedronMesh({
  position,
  speed,
  scale,
  color,
}: {
  position: [number, number, number];
  speed: number;
  scale: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * speed * 0.6;
    ref.current.rotation.x = t * speed * 0.2;
    ref.current.position.y =
      position[1] + Math.sin(t * speed * 0.3 + offset.current) * 0.6;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

// ── Star field ───────────────────────────────────────────────────────────────

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <pointsMaterial
        transparent
        color="#4fc3f7"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// ── Mouse parallax camera ────────────────────────────────────────────────────

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Scene ────────────────────────────────────────────────────────────────────

const shapes = [
  { type: "ico", pos: [-4, 1.5, -3] as [number, number, number], speed: 0.4, scale: 0.55, color: "#4fc3f7" },
  { type: "torus", pos: [4, -1, -4] as [number, number, number], speed: 0.3, scale: 0.45, color: "#c8a96e" },
  { type: "oct", pos: [2, 2.5, -5] as [number, number, number], speed: 0.5, scale: 0.4, color: "#a78bfa" },
  { type: "ico", pos: [-3, -2, -4] as [number, number, number], speed: 0.35, scale: 0.45, color: "#c8a96e" },
  { type: "torus", pos: [-5, 0.5, -6] as [number, number, number], speed: 0.25, scale: 0.35, color: "#4fc3f7" },
  { type: "oct", pos: [5.5, 1, -3] as [number, number, number], speed: 0.45, scale: 0.5, color: "#4fc3f7" },
  { type: "ico", pos: [0, 3.5, -5] as [number, number, number], speed: 0.3, scale: 0.38, color: "#a78bfa" },
  { type: "torus", pos: [-1.5, -3, -3] as [number, number, number], speed: 0.5, scale: 0.3, color: "#c8a96e" },
  { type: "oct", pos: [3.5, -2.5, -6] as [number, number, number], speed: 0.28, scale: 0.42, color: "#4fc3f7" },
  { type: "ico", pos: [-6, 2, -5] as [number, number, number], speed: 0.38, scale: 0.35, color: "#a78bfa" },
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#4fc3f7" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#c8a96e" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#a78bfa" />
      <StarField />
      {shapes.map((s, i) => {
        if (s.type === "ico")
          return <IcosahedronMesh key={i} position={s.pos} speed={s.speed} scale={s.scale} color={s.color} />;
        if (s.type === "torus")
          return <TorusKnotMesh key={i} position={s.pos} speed={s.speed} scale={s.scale} color={s.color} />;
        return <OctahedronMesh key={i} position={s.pos} speed={s.speed} scale={s.scale} color={s.color} />;
      })}
    </>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────

export default function FloatingGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
