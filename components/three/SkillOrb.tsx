"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import TechIcon from "@/components/ui/TechIcon";
import { getTechUrl } from "@/components/ui/techUrls";

// ── Gyroscope Orbit & Skill definitions ──────────────────────────────────────

interface TierOrbit {
  id: string;
  color: string;
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  rotSpeedX?: number;
  rotSpeedY?: number;
  rotSpeedZ?: number;
}

const ORBITS: Record<string, TierOrbit> = {
  frontend: {
    id: "frontend",
    color: "#865DFF",
    radius: 1.85,
    tiltX: 0.45,
    tiltZ: 0.2,
    speed: 0.3,
    rotSpeedX: 0.05,
    rotSpeedY: 0.15,
    rotSpeedZ: 0.02,
  },
  backend: {
    id: "backend",
    color: "#E384FF",
    radius: 2.35,
    tiltX: -0.55,
    tiltZ: -0.3,
    speed: -0.22,
    rotSpeedX: -0.04,
    rotSpeedY: -0.12,
    rotSpeedZ: 0.04,
  },
  systems: {
    id: "systems",
    color: "#FFA3FD",
    radius: 2.85,
    tiltX: 0.75,
    tiltZ: -0.2,
    speed: 0.18,
    rotSpeedX: 0.06,
    rotSpeedY: 0.18,
    rotSpeedZ: -0.03,
  },
  tooling: {
    id: "tooling",
    color: "#FFA3FD",
    radius: 2.1,
    tiltX: -0.2,
    tiltZ: 0.6,
    speed: -0.28,
    rotSpeedX: -0.05,
    rotSpeedY: -0.2,
    rotSpeedZ: -0.05,
  },
};

interface Skill {
  name: string;
  tier: "frontend" | "backend" | "systems" | "tooling";
  initialAngle: number;
}

const SKILLS: Skill[] = [
  // Frontend Ring (6 items)
  { name: "React", tier: "frontend", initialAngle: 0 },
  { name: "Next.js", tier: "frontend", initialAngle: Math.PI / 3 },
  { name: "Vue", tier: "frontend", initialAngle: (2 * Math.PI) / 3 },
  { name: "TypeScript", tier: "frontend", initialAngle: Math.PI },
  { name: "Angular", tier: "frontend", initialAngle: (4 * Math.PI) / 3 },
  { name: "Tailwind", tier: "frontend", initialAngle: (5 * Math.PI) / 3 },

  // Backend Ring (6 items)
  { name: "Firebase", tier: "backend", initialAngle: 0 },
  { name: "Supabase", tier: "backend", initialAngle: Math.PI / 3 },
  { name: "PostgreSQL", tier: "backend", initialAngle: (2 * Math.PI) / 3 },
  { name: "MySQL", tier: "backend", initialAngle: Math.PI },
  { name: "Python", tier: "backend", initialAngle: (4 * Math.PI) / 3 },
  { name: "Django", tier: "backend", initialAngle: (5 * Math.PI) / 3 },

  // Systems Ring (6 items)
  { name: "Rust", tier: "systems", initialAngle: 0 },
  { name: "Java", tier: "systems", initialAngle: Math.PI / 3 },
  { name: "C++", tier: "systems", initialAngle: (2 * Math.PI) / 3 },
  { name: "C#", tier: "systems", initialAngle: Math.PI },
  { name: "Android SDK", tier: "systems", initialAngle: (4 * Math.PI) / 3 },
  { name: "Web3", tier: "systems", initialAngle: (5 * Math.PI) / 3 },

  // Tooling Ring (5 items)
  { name: "Vercel", tier: "tooling", initialAngle: 0 },
  { name: "Expo", tier: "tooling", initialAngle: (2 * Math.PI) / 5 },
  { name: "VS Code", tier: "tooling", initialAngle: (4 * Math.PI) / 5 },
  { name: "Vite", tier: "tooling", initialAngle: (6 * Math.PI) / 5 },
  { name: "Git", tier: "tooling", initialAngle: (8 * Math.PI) / 5 },
];

// ── Core orb ─────────────────────────────────────────────────────────────────

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = t * 0.3;
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.2;
      glowRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <group>
      {/* Inner solid core */}
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#191825"
          emissive="#865DFF"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh ref={glowRef} scale={1.05}>
        <sphereGeometry args={[1.2, 14, 14]} />
        <meshStandardMaterial
          color="#865DFF"
          wireframe
          transparent
          opacity={0.35}
          emissive="#865DFF"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

// ── Gyroscope Orbit ring ──────────────────────────────────────────────────────

function OrbitRing({ orbit }: { orbit: TierOrbit }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = orbit.tiltX + t * (orbit.rotSpeedX || 0);
    ref.current.rotation.y = t * (orbit.rotSpeedY || 0.1);
    ref.current.rotation.z = orbit.tiltZ + t * (orbit.rotSpeedZ || 0);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[orbit.radius, 0.008, 8, 128]} />
      <meshStandardMaterial
        color={orbit.color}
        transparent
        opacity={0.3}
        emissive={orbit.color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// ── Skill node ───────────────────────────────────────────────────────────────

function SkillNode({ skill }: { skill: Skill }) {
  const ref = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);

  const orbit = ORBITS[skill.tier];

  useFrame(({ clock }) => {
    if (!ref.current || !sphereRef.current) return;
    const t = clock.getElapsedTime();

    // 1. Unrotated 2D orbital position along the ring
    const angle = skill.initialAngle + t * orbit.speed;
    const rawPos = new THREE.Vector3(
      orbit.radius * Math.cos(angle),
      orbit.radius * Math.sin(angle),
      0
    );

    // 2. Gyroscope 3D rotation matching OrbitRing mesh in real-time
    const euler = new THREE.Euler(
      orbit.tiltX + t * (orbit.rotSpeedX || 0),
      t * (orbit.rotSpeedY || 0.1),
      orbit.tiltZ + t * (orbit.rotSpeedZ || 0)
    );
    rawPos.applyEuler(euler);

    ref.current.position.copy(rawPos);

    // 3. Occlusion depth check
    if (badgeRef.current) {
      const dist2D = Math.sqrt(rawPos.x * rawPos.x + rawPos.y * rawPos.y);
      const isBehindOrb = rawPos.z < 0 && dist2D < 1.25;

      if (isBehindOrb) {
        badgeRef.current.style.opacity = "0";
        badgeRef.current.style.pointerEvents = "none";
      } else if (rawPos.z < 0) {
        badgeRef.current.style.opacity = "0.35";
        badgeRef.current.style.pointerEvents = "auto";
      } else {
        badgeRef.current.style.opacity = "1";
        badgeRef.current.style.pointerEvents = "auto";
      }
    }

    // Pulse node dot
    const scale = 1 + Math.sin(t * 2 + skill.initialAngle) * 0.1;
    sphereRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={ref}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color={orbit.color}
          emissive={orbit.color}
          emissiveIntensity={1.5}
        />
      </mesh>
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "auto", userSelect: "none" }}
      >
        <a
          ref={badgeRef}
          href={getTechUrl(skill.name)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            color: orbit.color,
            whiteSpace: "nowrap",
            textShadow: `0 0 6px ${orbit.color}`,
            background: "rgba(25,24,37,0.9)",
            padding: "2.5px 8px",
            borderRadius: "4px",
            border: `1px solid ${orbit.color}50`,
            backdropFilter: "blur(4px)",
            marginTop: "6px",
            display: "flex",
            alignItems: "center",
            gap: "4.5px",
            transition: "opacity 0.15s ease, transform 0.15s ease",
            cursor: "pointer",
            textDecoration: "none",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <TechIcon name={skill.name} size={11} />
          {skill.name}
        </a>
      </Html>
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function OrbScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#865DFF" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#E384FF" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#FFA3FD" />
      <CoreOrb />

      {/* Render 3D gyroscope orbit ring lines */}
      {Object.values(ORBITS).map((orbit) => (
        <OrbitRing key={orbit.id} orbit={orbit} />
      ))}

      {/* Render skill items locked to their gyroscope orbit ring lines */}
      {SKILLS.map((skill) => (
        <SkillNode key={skill.name} skill={skill} />
      ))}
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function SkillOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <OrbScene />
    </Canvas>
  );
}
