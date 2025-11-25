# 無限大根おろし (Mugen Daikon)

> 労働の虚無と、自動化の快感

元食品工場作業員の過酷で虚無な「大根おろし業務」をテーマにした、ブラウザで動くクリッカー系放置ゲーム。

![無限大根おろし](https://img.shields.io/badge/status-playable-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)

## 🎮 ゲームの特徴

- **クリッカー体験**: 大根をクリックしてすりおろす。パーティクルエフェクトと浮遊数字で気持ちいい！
- **自動化システム**: 労働者や機械を雇って自動生産。労働から解放される快感を味わえ。
- **11種類のアップグレード**: 100均のおろし金から大根シンギュラリティまで
- **オフライン進行**: ブラウザを閉じている間も生産が継続（最大24時間）
- **永続化**: LocalStorageで進捗を自動保存
- **レスポンシブ**: デスクトップでもモバイルでも快適にプレイ可能

## 🚀 プレイ方法

### オンラインでプレイ

[こちらからプレイ](https://your-deployment-url.vercel.app) *(デプロイ後に更新)*

### ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/mugen-daikon.git
cd mugen-daikon

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 🛠️ 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7
- **State Management**: Zustand 4.x
- **Styling**: Tailwind CSS 3.x
- **Animation**: Framer Motion 11.x
- **UI Components**: Shadcn/ui
- **Persistence**: LocalStorage API

## 📦 プロジェクト構造

```
mugen-daikon/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # メインゲーム画面
│   │   ├── layout.tsx         # レイアウト＆メタデータ
│   │   └── globals.css        # グローバルスタイル
│   ├── components/
│   │   ├── game/              # ゲームコンポーネント
│   │   │   ├── DaikonClicker.tsx      # クリッカー
│   │   │   ├── ShopPanel.tsx          # ショップ
│   │   │   ├── ShopItem.tsx           # アイテム
│   │   │   ├── StatsDisplay.tsx       # 統計表示
│   │   │   ├── GameLoop.tsx           # ゲームループ
│   │   │   ├── ParticleEffect.tsx     # パーティクル
│   │   │   ├── FloatingNumber.tsx     # 浮遊数字
│   │   │   ├── OfflineProgressDialog.tsx  # オフライン通知
│   │   │   └── ResetButton.tsx        # リセット
│   │   └── ui/                # Shadcn/ui コンポーネント
│   ├── lib/
│   │   ├── game/
│   │   │   ├── constants.ts   # ゲーム定数＆アップグレード定義
│   │   │   ├── calculations.ts # 計算ロジック
│   │   │   └── persistence.ts  # 保存/読込
│   │   ├── store/
│   │   │   └── gameStore.ts   # Zustand ストア
│   │   └── utils.ts           # ユーティリティ
│   └── types/
│       └── game.ts            # 型定義
└── package.json
```

## 🎯 ゲームバランス

| カテゴリ | アイテム例 | 効果 | 初期コスト |
|---------|-----------|------|-----------|
| 道具 | 100均のおろし金 | クリック +1g | 100g |
| 労働者 | 新人バイト | 自動 +10g/秒 | 500g |
| 機械 | 電動ミル | 自動 +1kg/秒 | 1t |
| 超越 | 大根シンギュラリティ | 自動 +100t/秒 | 100,000t |

## 🌟 フレーバーテキスト

このゲームの魅力は、各アップグレードに込められた社会風刺：

- *"プラスチック製。すぐ壊れる。"* - 100均のおろし金
- *"時給1000円。夢も希望もない。"* - 新人バイト
- *"責任だけ重く、時給は50円しか変わらない。"* - バイトリーダー
- *"これが導入された日、3人が配置転換された。"* - 産業用フードプロセッサー
- *"もはや大根ではない。概念だ。"* - 大根シンギュラリティ

## 🎨 デザインコンセプト

- **工場感**: グレー、ベージュ、メタリックな配色
- **ミニマリズム**: 情報過多を避け、重要な要素に集中
- **触覚的快感**: クリックの気持ちよさを最優先
- **虚無と快感**: 労働の虚無感と自動化の快感を同時に表現

## ♿ アクセシビリティ

- キーボード操作対応（Enter/Spaceキーでクリック）
- ARIA属性による支援技術対応
- フォーカス表示の改善
- prefers-reduced-motion 対応（予定）

## 📝 ライセンス

MIT License

## 🙏 謝辞

元食品工場作業員の皆様へ。あなたの労働は虚無ではありません。

---

**注意**: このゲームは中毒性が高いため、プレイ時間にご注意ください。
