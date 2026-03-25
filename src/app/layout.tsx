import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BitoCoin — ביטוקוין | דשבורד קריפטו',
  description: 'כל מה שצריך לדעת על קריפטו, במקום אחד',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-heebo bg-brand-bg min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
