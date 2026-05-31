"use client";
import { useState, useEffect } from "react";

interface ParticleData {
  size: number;
  left: number;
  delay: number;
  dur: number;
}

export function Particles({ count = 24 }: { count?: number }) {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, () => ({
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        dur: 10 + Math.random() * 14,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/60 blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: `-10px`,
            animation: `particle-rise ${p.dur}s linear ${p.delay}s infinite`,
            boxShadow: "0 0 8px var(--gold)",
          }}
        />
      ))}
    </div>
  );
}
