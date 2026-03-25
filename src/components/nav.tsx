'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bitcoin, BarChart3, Calculator, Info } from 'lucide-react';

export default function Nav() {
  const [btcPrice, setBtcPrice] = useState<string>('---');
  const [ethPrice, setEthPrice] = useState<string>('---');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://api.bybit.com/v5/market/tickers?category=linear');
        const json = await res.json();
        const list = json.result?.list || [];
        const btc = list.find((t: any) => t.symbol === 'BTCUSDT');
        const eth = list.find((t: any) => t.symbol === 'ETHUSDT');
        if (btc) setBtcPrice('$' + parseFloat(btc.lastPrice).toLocaleString());
        if (eth) setEthPrice('$' + parseFloat(eth.lastPrice).toLocaleString());
      } catch {}
    };
    load();
    const i = setInterval(load, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-brand-gold font-bold text-xl">
          <Bitcoin className="w-7 h-7" />
          <span>BitoCoin</span>
        </Link>
        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
          <span className="text-brand-gold">BTC {btcPrice}</span>
          <span className="text-brand-blue">ETH {ethPrice}</span>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/dashboard" className="px-3 py-2 rounded-lg text-sm hover:bg-brand-card transition-colors flex items-center gap-1">
            <BarChart3 className="w-4 h-4" /> דשבורד
          </Link>
          <Link href="/calculator" className="px-3 py-2 rounded-lg text-sm hover:bg-brand-card transition-colors flex items-center gap-1">
            <Calculator className="w-4 h-4" /> מחשבון
          </Link>
          <Link href="/about" className="px-3 py-2 rounded-lg text-sm hover:bg-brand-card transition-colors flex items-center gap-1">
            <Info className="w-4 h-4" /> אודות
          </Link>
        </div>
      </div>
    </nav>
  );
}
