'use client';

import { useState } from 'react';
import { getUpgradesByCategory } from '@/lib/game/constants';
import { ShopItem } from './ShopItem';
import { UpgradeCategory } from '@/types/game';

const CATEGORIES: { id: UpgradeCategory; label: string; icon: string }[] = [
  { id: 'tool', label: '道具', icon: '🔪' },
  { id: 'worker', label: '労働者', icon: '👤' },
  { id: 'machine', label: '機械', icon: '⚙️' },
  { id: 'transcendence', label: '超越', icon: '✨' },
];

export function ShopPanel() {
  const [activeCategory, setActiveCategory] = useState<UpgradeCategory>('tool');
  const upgrades = getUpgradesByCategory(activeCategory);

  return (
    <div className="bg-neutral-900 border-r border-neutral-700 h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-4 border-b border-neutral-700">
        <h2 className="text-xl font-bold text-white">ショップ</h2>
        <p className="text-sm text-neutral-400">アップグレードを購入</p>
      </div>

      {/* カテゴリタブ */}
      <div className="flex border-b border-neutral-700 overflow-x-auto">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-neutral-800 text-orange-400 border-b-2 border-orange-400'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <div className="text-xl mb-1">{category.icon}</div>
            <div>{category.label}</div>
          </button>
        ))}
      </div>

      {/* アイテムリスト */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {upgrades.length > 0 ? (
          upgrades.map((upgrade) => (
            <ShopItem key={upgrade.id} upgrade={upgrade} />
          ))
        ) : (
          <div className="text-center text-neutral-500 py-8">
            アイテムがありません
          </div>
        )}
      </div>
    </div>
  );
}
