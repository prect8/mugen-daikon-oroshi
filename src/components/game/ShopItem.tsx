'use client';

import { Upgrade } from '@/types/game';
import { useGameStore } from '@/lib/store/gameStore';
import { calculateCost, formatDaikon } from '@/lib/game/calculations';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ShopItemProps {
  upgrade: Upgrade;
}

export function ShopItem({ upgrade }: ShopItemProps) {
  const daikon = useGameStore((state) => state.daikon);
  const upgrades = useGameStore((state) => state.upgrades);
  const purchase = useGameStore((state) => state.purchase);

  const owned = upgrades[upgrade.id] || 0;
  const cost = calculateCost(upgrade, owned);
  const canAfford = daikon >= cost;

  const [justPurchased, setJustPurchased] = useState(false);

  const handlePurchase = () => {
    if (canAfford) {
      const success = purchase(upgrade.id);
      if (success) {
        setJustPurchased(true);
        setTimeout(() => setJustPurchased(false), 300);
        
        // 購入効果音を再生
        if (typeof window !== 'undefined' && (window as any).__playPurchaseSound) {
          (window as any).__playPurchaseSound();
        }
      }
    }
  };

  return (
    <motion.div
      className={`bg-neutral-800 border rounded-lg p-4 transition-all ${
        canAfford
          ? 'border-neutral-600 hover:border-orange-500 cursor-pointer'
          : 'border-neutral-700 opacity-50 cursor-not-allowed'
      } ${justPurchased ? 'ring-2 ring-green-500' : ''}`}
      whileHover={canAfford ? { scale: 1.02 } : {}}
      whileTap={canAfford ? { scale: 0.98 } : {}}
      animate={justPurchased ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
      onClick={handlePurchase}
    >
      <div className="flex items-start gap-3">
        {/* アイコン */}
        <div className="text-4xl">{upgrade.icon}</div>

        {/* 情報 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-white">{upgrade.name}</h3>
              <p className="text-sm text-neutral-400">{upgrade.description}</p>
            </div>
            {owned > 0 && (
              <div className="text-sm font-bold text-orange-400 whitespace-nowrap">
                ×{owned}
              </div>
            )}
          </div>

          {/* フレーバーテキスト */}
          <p className="text-xs text-neutral-500 italic mt-1">
            {upgrade.flavorText}
          </p>

          {/* コスト */}
          <div className="mt-2">
            <button
              className={`w-full px-4 py-2 rounded font-bold transition-colors ${
                canAfford
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
              }`}
              disabled={!canAfford}
            >
              {formatDaikon(cost)}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
