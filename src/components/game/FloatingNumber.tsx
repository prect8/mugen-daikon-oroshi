'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingNumberProps {
  value: number;
  x: number;
  y: number;
  id: string;
}

export function FloatingNumber({ value, x, y, id }: FloatingNumberProps) {
  return (
    <motion.div
      key={id}
      className="absolute pointer-events-none text-2xl font-bold text-orange-400 z-50"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -50, scale: 1.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      +{value}g
    </motion.div>
  );
}

interface FloatingNumbersManagerProps {
  children: React.ReactNode;
}

export interface FloatingNumberData {
  id: string;
  value: number;
  x: number;
  y: number;
}

export function FloatingNumbersManager({ children }: FloatingNumbersManagerProps) {
  const [numbers, setNumbers] = useState<FloatingNumberData[]>([]);

  useEffect(() => {
    // 古い数字を削除
    const interval = setInterval(() => {
      setNumbers((prev) => prev.filter((n) => Date.now() - parseInt(n.id) < 500));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {numbers.map((num) => (
          <FloatingNumber key={num.id} {...num} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// カスタムフック
export function useFloatingNumbers() {
  const [numbers, setNumbers] = useState<FloatingNumberData[]>([]);

  const spawnNumber = (value: number, x: number, y: number) => {
    const id = Date.now().toString() + Math.random();
    setNumbers((prev) => [...prev, { id, value, x, y }]);
    
    // 500ms後に削除
    setTimeout(() => {
      setNumbers((prev) => prev.filter((n) => n.id !== id));
    }, 500);
  };

  return { numbers, spawnNumber };
}
