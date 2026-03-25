'use client';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CoinData } from '@/lib/types';
import { formatCurrency, getCoinColor, COINS } from '@/lib/utils';

export default function CoinCard({ coin }: { coin: CoinData }) {
  const isUp = coin.change24h >= 0;
  const color = getCoinColor(coin.symbol);
  const name = COINS[coin.symbol]?.name || coin.symbol;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-card rounded-xl p-4 hover:bg-brand-card-hover transition-all duration-300 border border-white/5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: color + '20', color }}>
            {coin.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-sm">{coin.symbol}</div>
            <div className="text-xs text-gray-500">{name}</div>
          </div>
        </div>
        {isUp ? <TrendingUp className="w-4 h-4 text-brand-green" /> : <TrendingDown className="w-4 h-4 text-brand-red" />}
      </div>
      <div className="text-lg font-bold mb-1" dir="ltr">{formatCurrency(coin.price)}</div>
      <div className={`text-sm font-medium ${isUp ? 'text-brand-green glow-green' : 'text-brand-red glow-red'}`}>
        {isUp ? '▲' : '▼'} {Math.abs(coin.change24h).toFixed(2)}%
      </div>
      {/* Mini bar */}
      <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(Math.abs(coin.change24h) * 10, 100)}%`,
            backgroundColor: isUp ? '#22C55E' : '#EF4444',
          }}
        />
      </div>
    </motion.div>
  );
}
