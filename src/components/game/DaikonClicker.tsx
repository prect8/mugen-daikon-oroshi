'use client';

import { useGameStore } from '@/lib/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { ParticleEffect } from './ParticleEffect';
import { FloatingNumber } from './FloatingNumber';

interface ClickEffect {
  id: string;
  x: number;
  y: number;
  value: number;
}

export function DaikonClicker() {
  const click = useGameStore((state) => state.click);
  const clickPower = useGameStore((state) => state.clickPower);
  const [isPressed, setIsPressed] = useState(false);
  const [effects, setEffects] = useState<ClickEffect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    click();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);

    // 効果音を再生
    if (typeof window !== 'undefined' && (window as any).__playGratingSound) {
      (window as any).__playGratingSound();
    }

    // クリック位置を取得
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const id = Date.now().toString() + Math.random();
      const newEffect: ClickEffect = { id, x, y, value: clickPower };
      
      setEffects((prev) => [...prev, newEffect]);
      
      // 500ms後に削除
      setTimeout(() => {
        setEffects((prev) => prev.filter((effect) => effect.id !== id));
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // キーボード操作時は中央にエフェクトを表示
      click();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);

      // 効果音を再生
      if (typeof window !== 'undefined' && (window as any).__playGratingSound) {
        (window as any).__playGratingSound();
      }

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        const id = Date.now().toString() + Math.random();
        const newEffect: ClickEffect = { id, x, y, value: clickPower };
        
        setEffects((prev) => [...prev, newEffect]);
        
        setTimeout(() => {
          setEffects((prev) => prev.filter((effect) => effect.id !== id));
        }, 500);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center justify-center min-h-[400px] p-8 overflow-hidden">
      <motion.button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="大根をすりおろす"
        className="relative cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-orange-500 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isPressed ? { scale: 0.95 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {/* 大根の絵文字 */}
        <div className="text-[200px] md:text-[300px] drop-shadow-2xl">
          🥕
        </div>

        {/* ホバー時のグロー効果 */}
        <motion.div
          className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* パーティクルと浮遊数字 */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {effects.map((effect) => (
            <div key={effect.id}>
              <ParticleEffect x={effect.x} y={effect.y} id={effect.id} />
              <FloatingNumber value={effect.value} x={effect.x} y={effect.y} id={effect.id} />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* クリックパワー表示 */}
      <div className="absolute bottom-8 text-center pointer-events-none">
        <div className="text-sm text-neutral-400">クリックで</div>
        <div className="text-xl font-bold text-orange-400">
          +{clickPower}g
        </div>
      </div>
    </div>
  );
}
