'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { deleteSave } from '@/lib/game/persistence';
import { INITIAL_CLICK_POWER } from '@/lib/game/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export function ResetButton() {
  const [showDialog, setShowDialog] = useState(false);

  const handleReset = () => {
    // ストアをリセット
    useGameStore.setState({
      daikon: 0,
      totalDaikon: 0,
      clickPower: INITIAL_CLICK_POWER,
      dps: 0,
      totalClicks: 0,
      upgrades: {},
      startTime: Date.now(),
      lastSaveTime: Date.now(),
      offlineProduction: 0,
      showOfflineDialog: false,
    });

    // LocalStorageを削除
    deleteSave();

    setShowDialog(false);

    // ページをリロード
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="px-4 py-2 text-sm text-neutral-400 hover:text-red-400 transition-colors"
      >
        リセット
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-neutral-900 border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">本当にリセットしますか？</DialogTitle>
            <DialogDescription className="text-neutral-400">
              すべての進行状況が失われます。この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 mt-4">
            <button
              onClick={() => setShowDialog(false)}
              className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 rounded transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors"
            >
              リセット
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
