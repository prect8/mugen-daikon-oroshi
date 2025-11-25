'use client';

import { useGameStore } from '@/lib/store/gameStore';
import { formatDaikon } from '@/lib/game/calculations';
import { formatOfflineTime } from '@/lib/game/persistence';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function OfflineProgressDialog() {
  const showOfflineDialog = useGameStore((state) => state.showOfflineDialog);
  const offlineProduction = useGameStore((state) => state.offlineProduction);
  const dismissOfflineDialog = useGameStore((state) => state.dismissOfflineDialog);

  return (
    <Dialog open={showOfflineDialog} onOpenChange={dismissOfflineDialog}>
      <DialogContent className="bg-neutral-900 border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">おかえりなさい！</DialogTitle>
          <DialogDescription className="text-neutral-400">
            不在中も大根がすりおろされていました
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 text-center">
          <div className="text-sm text-neutral-400 mb-2">不在中の生産量</div>
          <div className="text-4xl font-bold text-green-400">
            +{formatDaikon(offlineProduction)}
          </div>
        </div>

        <button
          onClick={dismissOfflineDialog}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded transition-colors"
        >
          続ける
        </button>
      </DialogContent>
    </Dialog>
  );
}
