import { create } from 'zustand';
import { GameState } from '@/types/game';
import { UPGRADES, INITIAL_CLICK_POWER, getAllUpgradeIds } from '../game/constants';
import { calculateCost } from '../game/calculations';
import { saveGame, loadGame, calculateOfflineProgress } from '../game/persistence';

interface GameStoreState extends Omit<GameState, 'save' | 'load'> {
  // 追加の状態
  offlineProduction: number;
  showOfflineDialog: boolean;
  
  // アクション
  click: () => void;
  purchase: (upgradeId: string) => boolean;
  calculateDPS: () => void;
  calculateClickPower: () => void;
  save: () => void;
  load: () => void;
  dismissOfflineDialog: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  // 初期状態
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

  // クリックアクション
  click: () => {
    const { clickPower, daikon, totalDaikon, totalClicks } = get();
    set({
      daikon: daikon + clickPower,
      totalDaikon: totalDaikon + clickPower,
      totalClicks: totalClicks + 1,
    });
  },

  // アップグレード購入
  purchase: (upgradeId: string): boolean => {
    const upgrade = UPGRADES[upgradeId];
    if (!upgrade) return false;

    const { daikon, upgrades } = get();
    const currentQuantity = upgrades[upgradeId] || 0;
    const cost = calculateCost(upgrade, currentQuantity);

    // 資金チェック
    if (daikon < cost) return false;

    // 購入処理
    set({
      daikon: daikon - cost,
      upgrades: {
        ...upgrades,
        [upgradeId]: currentQuantity + 1,
      },
    });

    // DPS/クリックパワーを再計算
    get().calculateDPS();
    get().calculateClickPower();
    
    return true;
  },

  // DPS計算
  calculateDPS: () => {
    const { upgrades } = get();
    let totalDPS = 0;

    Object.entries(upgrades).forEach(([id, quantity]) => {
      const upgrade = UPGRADES[id];
      if (upgrade && upgrade.effect.type === 'dps') {
        totalDPS += upgrade.effect.value * quantity;
      }
    });

    set({ dps: totalDPS });
  },

  // クリックパワー計算
  calculateClickPower: () => {
    const { upgrades } = get();
    let totalClickPower = INITIAL_CLICK_POWER;

    Object.entries(upgrades).forEach(([id, quantity]) => {
      const upgrade = UPGRADES[id];
      if (upgrade && upgrade.effect.type === 'clickPower') {
        totalClickPower += upgrade.effect.value * quantity;
      }
    });

    set({ clickPower: totalClickPower });
  },

  // 保存
  save: () => {
    const state = get();
    saveGame({
      daikon: state.daikon,
      totalDaikon: state.totalDaikon,
      clickPower: state.clickPower,
      totalClicks: state.totalClicks,
      upgrades: state.upgrades,
      startTime: state.startTime,
    });
  },

  // 読み込み
  load: () => {
    const savedData = loadGame();
    
    if (savedData) {
      // オフライン進行を計算
      const { production, offlineSeconds } = calculateOfflineProgress(
        savedData.lastSaveTime,
        0 // DPSは後で再計算
      );

      set({
        daikon: savedData.daikon,
        totalDaikon: savedData.totalDaikon,
        clickPower: savedData.clickPower,
        totalClicks: savedData.totalClicks,
        upgrades: savedData.upgrades,
        startTime: savedData.startTime,
        lastSaveTime: savedData.lastSaveTime,
      });

      // DPSとクリックパワーを再計算
      get().calculateDPS();
      get().calculateClickPower();

      // オフライン進行を適用
      if (offlineSeconds > 60) { // 1分以上オフラインだった場合のみ
        const { dps } = get();
        const actualProduction = dps * offlineSeconds;
        
        set({
          daikon: savedData.daikon + actualProduction,
          totalDaikon: savedData.totalDaikon + actualProduction,
          offlineProduction: actualProduction,
          showOfflineDialog: actualProduction > 0,
        });
      }
    }
  },

  // オフラインダイアログを閉じる
  dismissOfflineDialog: () => {
    set({ showOfflineDialog: false, offlineProduction: 0 });
  },
}));
