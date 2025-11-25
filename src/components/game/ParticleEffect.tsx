'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

interface ParticleEffectProps {
  x: number;
  y: number;
  id: string;
}

function SingleParticle({ particle }: { particle: Particle }) {
  const endX = particle.x + Math.cos(particle.angle) * particle.distance;
  const endY = particle.y + Math.sin(particle.angle) * particle.distance;

  return (
    <motion.div
      className="absolute rounded-full bg-orange-400 pointer-events-none"
      style={{
        width: particle.size,
        height: particle.size,
        left: particle.x,
        top: particle.y,
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: endX - particle.x,
        y: endY - particle.y,
        opacity: 0,
        scale: 0.5,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  );
}

export function ParticleEffect({ x, y, id }: ParticleEffectProps) {
  const particles: Particle[] = [];
  const particleCount = 6 + Math.floor(Math.random() * 3); // 6-8個

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: `${id}-${i}`,
      x,
      y,
      angle: (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5,
      distance: 30 + Math.random() * 40,
      size: 4 + Math.random() * 6,
    });
  }

  return (
    <>
      {particles.map((particle) => (
        <SingleParticle key={particle.id} particle={particle} />
      ))}
    </>
  );
}

interface ParticleManagerProps {
  children: React.ReactNode;
}

export interface ParticleData {
  id: string;
  x: number;
  y: number;
}

export function ParticleManager({ children }: ParticleManagerProps) {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    // 古いパーティクルを削除
    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - parseInt(p.id) < 400));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
        <AnimatePresence>
          {particles.map((particle) => (
            <ParticleEffect key={particle.id} {...particle} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// カスタムフック
export function useParticles() {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  const spawnParticles = (x: number, y: number) => {
    const id = Date.now().toString() + Math.random();
    setParticles((prev) => [...prev, { id, x, y }]);
    
    // 400ms後に削除
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 400);
  };

  return { particles, spawnParticles };
}
