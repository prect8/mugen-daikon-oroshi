import { Upgrade } from '@/types/game';

// ゲーム定数
export const GAME_VERSION = '1.0.0';
export const COST_MULTIPLIER = 1.15; // 購入ごとのコスト増加率
export const MAX_OFFLINE_HOURS = 24; // オフライン進行の最大時間
export const AUTO_SAVE_INTERVAL = 5000; // 自動保存間隔（ミリ秒）
export const INITIAL_CLICK_POWER = 1; // 初期クリックパワー（グラム）

// アップグレード定義
export const UPGRADES: Record<string, Upgrade> = {
  // === 道具カテゴリ（クリック効率UP） ===
  'tool-100yen-grater': {
    id: 'tool-100yen-grater',
    name: '100均のおろし金',
    description: 'クリック効率 +1g',
    flavorText: 'プラスチック製。すぐ壊れる。',
    category: 'tool',
    baseCost: 100,
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'clickPower', value: 1 },
    icon: '🔪',
  },
  'tool-stainless-grater': {
    id: 'tool-stainless-grater',
    name: '業務用ステンレスおろし金',
    description: 'クリック効率 +5g',
    flavorText: 'これが本物の道具だ。',
    category: 'tool',
    baseCost: 5000,
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'clickPower', value: 5 },
    icon: '⚙️',
  },
  'tool-electric-mixer': {
    id: 'tool-electric-mixer',
    name: '電動ハンドミキサー',
    description: 'クリック効率 +25g',
    flavorText: '手首の痛みから解放される。',
    category: 'tool',
    baseCost: 50000,
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'clickPower', value: 25 },
    icon: '🔌',
  },

  // === 労働者カテゴリ（自動生産） ===
  'worker-newbie': {
    id: 'worker-newbie',
    name: '新人バイト',
    description: '自動生産 +10g/秒',
    flavorText: '時給1000円。夢も希望もない。',
    category: 'worker',
    baseCost: 500,
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 10 },
    icon: '👤',
  },
  'worker-veteran': {
    id: 'worker-veteran',
    name: 'ベテランパート',
    description: '自動生産 +50g/秒',
    flavorText: '10年選手。無言で黙々と。',
    category: 'worker',
    baseCost: 10000,
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 50 },
    icon: '👨‍🏭',
  },
  'worker-leader': {
    id: 'worker-leader',
    name: 'バイトリーダー',
    description: '自動生産 +200g/秒',
    flavorText: '責任だけ重く、時給は50円しか変わらない。',
    category: 'worker',
    baseCost: 100000,
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 200 },
    icon: '👔',
  },

  // === 機械カテゴリ（大量生産） ===
  'machine-electric-mill': {
    id: 'machine-electric-mill',
    name: '業務スーパーの電動ミル',
    description: '自動生産 +1kg/秒',
    flavorText: '人間より正確で、文句も言わない。',
    category: 'machine',
    baseCost: 1000000, // 1t = 1,000,000g
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 1000 },
    icon: '⚡',
  },
  'machine-food-processor': {
    id: 'machine-food-processor',
    name: '産業用フードプロセッサー',
    description: '自動生産 +50kg/秒',
    flavorText: 'これが導入された日、3人が配置転換された。',
    category: 'machine',
    baseCost: 50000000, // 50t
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 50000 },
    icon: '🏭',
  },
  'machine-auto-line': {
    id: 'machine-auto-line',
    name: '完全自動化ライン',
    description: '自動生産 +1t/秒',
    flavorText: '工場長の夢。作業員の悪夢。',
    category: 'machine',
    baseCost: 1000000000, // 1000t
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 1000000 },
    icon: '🤖',
  },

  // === 超越カテゴリ（エンドゲーム） ===
  'transcend-singularity': {
    id: 'transcend-singularity',
    name: '大根シンギュラリティ',
    description: '自動生産 +100t/秒',
    flavorText: 'もはや大根ではない。概念だ。',
    category: 'transcendence',
    baseCost: 100000000000, // 100,000t
    costMultiplier: COST_MULTIPLIER,
    effect: { type: 'dps', value: 100000000 },
    icon: '✨',
  },
};

// カテゴリ別にアップグレードを取得
export const getUpgradesByCategory = (category: string): Upgrade[] => {
  return Object.values(UPGRADES).filter((u) => u.category === category);
};

// すべてのアップグレードIDを取得
export const getAllUpgradeIds = (): string[] => {
  return Object.keys(UPGRADES);
};
