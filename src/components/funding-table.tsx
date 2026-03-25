'use client';
import { motion } from 'framer-motion';
import { CoinData } from '@/lib/types';
import { formatPercent, COINS } from '@/lib/utils';

function getStatus(fr: number) {
  if (fr > 0.0001) return { label: '🟢 הזדמנות', cls: 'text-brand-green' };
  if (fr < 0) return { label: '🔴 הימנע', cls: 'text-brand-red' };
  return { label: '⚪ ניטרלי', cls: 'text-gray-400' };
}

export default function FundingTable({ coins }: { coins: CoinData[] }) {
  const sorted = [...coins].sort((a, b) => b.fundingRate - a.fundingRate);
  const maxRate = Math.max(...coins.map(c => Math.abs(c.fundingRate)), 0.001);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-white/5">
            <th className="py-3 text-right font-medium">מטבע</th>
            <th className="py-3 text-right font-medium">Funding Rate</th>
            <th className="py-3 text-right font-medium">תשואה שנתית</th>
            <th className="py-3 text-right font-medium hidden sm:table-cell">עוצמה</th>
            <th className="py-3 text-right font-medium">סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((coin, i) => {
            const status = getStatus(coin.fundingRate);
            const barWidth = (Math.abs(coin.fundingRate) / maxRate) * 100;
            return (
              <motion.tr
                key={coin.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-brand-card-hover transition-colors"
              >
                <td className="py-3 font-medium">
                  {coin.symbol} <span className="text-gray-500 text-xs">{COINS[coin.symbol]?.name}</span>
                </td>
                <td className={`py-3 font-mono ${coin.fundingRate >= 0 ? 'text-brand-green' : 'text-brand-red'}`} dir="ltr">
                  {formatPercent(coin.fundingRate)}
                </td>
                <td className={`py-3 font-mono ${coin.annualYield >= 0 ? 'text-brand-green' : 'text-brand-red'}`} dir="ltr">
                  {coin.annualYield.toFixed(1)}%
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: coin.fundingRate >= 0 ? '#22C55E' : '#EF4444',
                      }}
                    />
                  </div>
                </td>
                <td className={`py-3 text-xs ${status.cls}`}>{status.label}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
