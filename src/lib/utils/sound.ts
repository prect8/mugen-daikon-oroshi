/**
 * Web Audio APIで「シュッ」という効果音を生成
 */
export const createGratingSound = (): AudioBuffer | null => {
  if (typeof window === 'undefined') return null;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const duration = 0.15; // 150ms
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  // ホワイトノイズ + エンベロープで「シュッ」という音を作る
  for (let i = 0; i < buffer.length; i++) {
    // ホワイトノイズ
    const noise = Math.random() * 2 - 1;
    
    // エンベロープ（急激に減衰）
    const envelope = Math.exp(-i / (sampleRate * 0.05));
    
    // ハイパスフィルター効果（高周波を強調）
    data[i] = noise * envelope * 0.3;
  }

  return buffer;
};

/**
 * 効果音を再生
 */
export const playGratingSound = (buffer: AudioBuffer | null) => {
  if (!buffer || typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
};

/**
 * 購入時の効果音を生成
 */
export const createPurchaseSound = (): AudioBuffer | null => {
  if (typeof window === 'undefined') return null;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const duration = 0.2;
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  // 上昇する「ピロリン」という音
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    const frequency = 800 + (t * 400); // 800Hz → 1200Hz
    const envelope = Math.exp(-t * 8);
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2;
  }

  return buffer;
};
