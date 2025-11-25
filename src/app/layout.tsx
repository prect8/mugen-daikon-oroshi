import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '無限大根おろし - Mugen Daikon',
  description: '労働の虚無と、自動化の快感を体験するクリッカーゲーム',
  keywords: ['クリッカーゲーム', '放置ゲーム', '大根おろし', 'インクリメンタルゲーム'],
  authors: [{ name: 'Mugen Daikon Team' }],
  openGraph: {
    title: '無限大根おろし',
    description: '労働の虚無と、自動化の快感',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
