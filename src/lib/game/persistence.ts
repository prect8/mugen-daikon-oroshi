import { SaveData } from '@/types/game';
import { GAME_VERSION, MAX_OFFLINE_HOURS } from './constants';

const SAVE_KEY = 'mugen-daikon-save';

/**
 * ゲーム状態をLocalStorageに保存
 */
export const saveGame = (data: Omit<SaveData, 'version' | 'lastSaveTime'>): void => {
  try {
    const saveData: SaveData = {
      ...data,
      version: GAME_VERSION,
      lastSaveTime: Date.now(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

/**
 * LocalStorageからゲーム状態を読み込み
 */
export const loadGame = (): SaveData | null => {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return null;

    const data = JSON.parse(saved) as SaveData;
    
    // バージョンチェック（将来のマイグレーション用）
    if (data.version !== GAME_VERSION) {
      console.warn(`Save version mismatch: ${data.version} vs ${GAME_VERSION}`);
      // ここでマイグレーション処理を実行
    }

    // データバリデーション
    if (!validateSaveData(data)) {
      console.error('Invalid save data');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
};

/**
 * セーブデータの妥当性を検証
 */
const validateSaveData = (data: any): data is SaveData => {
  return (
    typeof data === 'object' &&
    typeof data.daikon === 'number' &&
    typeof data.totalDaikon === 'number' &&
    typeof data.clickPower === 'number' &&
    typeof data.totalClicks === 'number' &&
    typeof data.upgrades === 'object' &&
    typeof data.startTime === 'number' &&
    typeof data.lastSaveTime === 'number' &&
    !isNaN(data.daikon) &&
    !isNaN(data.totalDaikon) &&
    data.daikon >= 0 &&
    data.totalDaikon >= 0
  );
};

/**
 * オフライン進行を計算
 * @param lastSaveTime 最終保存時刻
 * @param currentDPS 現在のDPS
 * @returns 生産された大根量とオフライン時間（秒）
 */
export const calculateOfflineProgress = (
  lastSaveTime: number,
  currentDPS: number
): { production: number; offlineSeconds: number } => {
  const now = Date.now();
  const elapsedMs = now - lastSaveTime;
  const elapsedSeconds = elapsedMs / 1000;

  // 最大24時間まで
  const maxSeconds = MAX_OFFLINE_HOURS * 60 * 60;
  const cappedSeconds = Math.min(elapsedSeconds, maxSeconds);

  const production = currentDPS * cappedSeconds;

  return {
    production: Math.floor(production),
    offlineSeconds: cappedSeconds,
  };
};

/**
 * セーブデータを削除（リセット用）
 */
export const deleteSave = (): void => {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error('Failed to delete save:', error);
  }
};

/**
 * 時間を読みやすい形式にフォーマット
 */
export const formatOfflineTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}時間${minutes}分`;
  } else if (minutes > 0) {
    return `${minutes}分`;
  } else {
    return `${Math.floor(seconds)}秒`;
  }
};
