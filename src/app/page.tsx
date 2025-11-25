import { StatsDisplay } from '@/components/game/StatsDisplay';
import { DaikonClicker } from '@/components/game/DaikonClicker';
import { ShopPanel } from '@/components/game/ShopPanel';
import { GameLoop } from '@/components/game/GameLoop';
import { OfflineProgressDialog } from '@/components/game/OfflineProgressDialog';
import { ResetButton } from '@/components/game/ResetButton';
import { SoundManager } from '@/components/game/SoundManager';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* ゲームループ（非表示） */}
      <GameLoop />
      
      {/* サウンドマネージャー */}
      <SoundManager />
      
      {/* オフラインダイアログ */}
      <OfflineProgressDialog />

      {/* ヘッダー */}
      <header className="bg-neutral-900 border-b border-neutral-700 p-4">
        <div className="max-w-7xl mx-auto relative">
          <h1 className="text-3xl font-bold text-center">
            無限大根 <span className="text-orange-400">おろし</span>
          </h1>
          <p className="text-center text-neutral-400 text-sm mt-1">
            労働の虚無と、自動化の快感
          </p>
          <div className="absolute right-0 top-0">
            <ResetButton />
          </div>
        </div>
      </header>

      {/* 統計表示 */}
      <StatsDisplay />

      {/* メインコンテンツ */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-180px)]">
        {/* ショップパネル（左側/モバイルは下部） */}
        <div className="w-full md:w-80 lg:w-96 order-2 md:order-1">
          <ShopPanel />
        </div>

        {/* クリッカーエリア（右側/モバイルは上部） */}
        <div className="flex-1 order-1 md:order-2 flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
          <DaikonClicker />
        </div>
      </div>
    </main>
  );
}
