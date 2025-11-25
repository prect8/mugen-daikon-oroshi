// ゲームの型定義

export interface GameState {
  // リソース
  daikon: number; // 現在の大根量（グラム）
  totalDaikon: number; // 累計生産量
  
  // 統計
  clickPower: number; // クリックあたりのグラム数
  dps: number; // 秒間生産量（Daicons Per Second）
  totalClicks: number; // 累計クリック数
  
  // インベントリ
  upgrades: Record<string, number>; // upgradeId -> 所有数
  
  // メタ情報
  startTime: number; // ゲーム開始時刻（Unix timestamp）
  lastSaveTime: number; // 最終保存時刻（オフライン進行計算用）
  
  // アクション
  click: () => void;
  purchase: (upgradeId: string) => boolean;
  calculateDPS: () => void;
  calculateClickPower: () => void;
  save: () => void;
  load: () => void;
}

export type UpgradeCategory = 'tool' | 'worker' | 'machine' | 'transcendence';

export type EffectType = 'clickPower' | 'dps';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  flavorText: string; // 社会風刺テキスト
  category: UpgradeCategory;
  baseCost: number; // 初期コスト（グラム）
  costMultiplier: number; // コスト増加率（デフォルト1.15）
  effect: {
    type: EffectType;
    value: number; // 追加されるグラム数
  };
  icon?: string; // 絵文字またはSVGパス
}

export interface SaveData {
  version: string; // バージョン管理用
  daikon: number;
  totalDaikon: number;
  clickPower: number;
  totalClicks: number;
  upgrades: Record<string, number>;
  startTime: number;
  lastSaveTime: number;
}
