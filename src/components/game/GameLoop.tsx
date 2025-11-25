'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { AUTO_SAVE_INTERVAL } from '@/lib/game/constants';

export function GameLoop() {
  const daikon = useGameStore((state) => state.daikon);
  const totalDaikon = useGameStore((state) => state.totalDaikon);
  const dps = useGameStore((state) => state.dps);
  const save = useGameStore((state) => state.save);
  const load = useGameStore((state) => state.load);

  // 初回ロード
  useEffect(() => {
    load();
  }, [load]);

  // ゲームループ（自動生産）
  useEffect(() => {
    if (dps === 0) return;

    const interval = setInterval(() => {
      useGameStore.setState((state) => ({
        daikon: state.daikon + state.dps / 60, // 60fps
        totalDaikon: state.totalDaikon + state.dps / 60,
      }));
    }, 1000 / 60); // 60fps

    return () => clearInterval(interval);
  }, [dps]);

  // 自動保存
  useEffect(() => {
    const interval = setInterval(() => {
      save();
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [save]);

  // ページを閉じる時に保存
  useEffect(() => {
    const handleBeforeUnload = () => {
      save();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [save]);

  return null; // このコンポーネントは何もレンダリングしない
}
