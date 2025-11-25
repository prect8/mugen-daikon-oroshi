import { Upgrade } from '@/types/game';

/**
 * アップグレードの現在のコストを計算
 * コスト = baseCost * (costMultiplier ^ quantityOwned)
 */
export const calculateCost = (upgrade: Upgrade, quantityOwned: number): number => {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, quantityOwned));
};

/**
 * 大根の数値を読みやすい形式にフォーマット
 * g → kg → t → kt → Mt
 */
export const formatDaikon = (grams: number): string => {
  if (grams < 1000) {
    return `${grams.toFixed(1)}g`;
  } else if (grams < 1_000_000) {
    return `${(grams / 1000).toFixed(2)}kg`;
  } else if (grams < 1_000_000_000) {
    return `${(grams / 1_000_000).toFixed(2)}t`;
  } else if (grams < 1_000_000_000_000) {
    return `${(grams / 1_000_000_000).toFixed(2)}kt`;
  } else {
    return `${(grams / 1_000_000_000_000).toFixed(2)}Mt`;
  }
};

/**
 * DPS（秒間生産量）を読みやすい形式にフォーマット
 */
export const formatDPS = (dps: number): string => {
  return `${formatDaikon(dps)}/秒`;
};

/**
 * 大きな数値を短縮表記に変換（オプション）
 * 例: 1,234,567 → 1.23M
 */
export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toFixed(0);
  if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num < 1_000_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  return `${(num / 1_000_000_000_000).toFixed(2)}T`;
};
