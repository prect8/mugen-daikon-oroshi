'use client';

import { useEffect, useState } from 'react';
import { createGratingSound, createPurchaseSound, playGratingSound } from '@/lib/utils/sound';

export function SoundManager() {
  const [gratingBuffer, setGratingBuffer] = useState<AudioBuffer | null>(null);
  const [purchaseBuffer, setPurchaseBuffer] = useState<AudioBuffer | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 効果音バッファを生成
    setGratingBuffer(createGratingSound());
    setPurchaseBuffer(createPurchaseSound());

    // LocalStorageからミュート設定を読み込み
    const savedMuted = localStorage.getItem('mugen-daikon-muted');
    if (savedMuted === 'true') {
      setIsMuted(true);
    }
  }, []);

  useEffect(() => {
    // グローバルに効果音再生関数を公開
    if (!isMuted) {
      (window as any).__playGratingSound = () => playGratingSound(gratingBuffer);
      (window as any).__playPurchaseSound = () => playGratingSound(purchaseBuffer);
    } else {
      (window as any).__playGratingSound = () => {};
      (window as any).__playPurchaseSound = () => {};
    }
  }, [gratingBuffer, purchaseBuffer, isMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('mugen-daikon-muted', newMuted.toString());
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
      aria-label={isMuted ? '音声をオンにする' : '音声をオフにする'}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
}
