'use client';

import { useGameStore } from '@/lib/store/gameStore';
import { formatDaikon, formatDPS } from '@/lib/game/calculations';

export function StatsDisplay() {
  const daikon = useGameStore((state) => state.daikon);
  const totalDaikon = useGameStore((state) => state.totalDaikon);
  const dps = useGameStore((state) => state.dps);
  const clickPower = useGameStore((state) => state.clickPower);
  const totalClicks = useGameStore((state) => state.totalClicks);

  return (
    <div className="bg-neutral-800 border-b border-neutral-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* 現在の大根量 */}
          <div className="text-center">
            <div className="text-sm text-neutral-400">所持大根</div>
            <div className="text-2xl font-bold text-white">
              {formatDaikon(daikon)}
            </div>
          </div>

          {/* DPS */}
          <div className="text-center">
            <div className="text-sm text-neutral-400">秒間生産</div>
            <div className="text-2xl font-bold text-green-400">
              {formatDPS(dps)}
            </div>
          </div>

          {/* クリックパワー */}
          <div className="text-center">
            <div className="text-sm text-neutral-400">クリック効率</div>
            <div className="text-2xl font-bold text-blue-400">
              {formatDaikon(clickPower)}
            </div>
          </div>

          {/* 総生産量 */}
          <div className="text-center">
            <div className="text-sm text-neutral-400">累計生産</div>
            <div className="text-2xl font-bold text-yellow-400">
              {formatDaikon(totalDaikon)}
            </div>
          </div>

          {/* 総クリック数 */}
          <div className="text-center">
            <div className="text-sm text-neutral-400">総クリック</div>
            <div className="text-2xl font-bold text-purple-400">
              {totalClicks.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
