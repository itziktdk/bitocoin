'use client';
import { motion } from 'framer-motion';
import { ArbOpportunity } from '@/lib/types';
import { COINS } from '@/lib/utils';

export default function ArbCard({ opp, isBest }: { opp: ArbOpportunity; isBest: boolean }) {
  const name = COINS[opp.coin]?.name || opp.coin;
  const investment = 10000;
  const dailyEarning = (opp.fundingRate * 3 * investment);
  const monthlyEarning = dailyEarning * 30;
  const annualEarning = dailyEarning * 365;
  const fees = investment * 0.002;
  const netAnnual = annualEarning - fees;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-brand-card rounded-xl p-5 border ${isBest ? 'border-brand-gold animate-pulse-gold' : 'border-white/5'}`}
    >
      {isBest && <div className="text-brand-gold text-xs font-bold mb-2">⭐ הזדמנות מומלצת</div>}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg">{name} ({opp.coin})</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          opp.risk === 'נמוך' ? 'bg-green-500/20 text-green-400' :
          opp.risk === 'בינוני' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          סיכון {opp.risk}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Funding Rate</span>
          <span className="text-brand-green font-mono" dir="ltr">{(opp.fundingRate * 100).toFixed(4)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">תשואה שנתית</span>
          <span className="text-brand-green font-bold" dir="ltr">{opp.annualYield.toFixed(1)}%</span>
        </div>
        <div className="border-t border-white/5 pt-2 mt-2">
          <div className="text-xs text-gray-500 mb-1">חישוב לדוגמה ($10,000)</div>
          <div className="flex justify-between">
            <span className="text-gray-400">יומי</span>
            <span className="text-brand-green" dir="ltr">${dailyEarning.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">חודשי</span>
            <span className="text-brand-green" dir="ltr">${monthlyEarning.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">שנתי (נטו)</span>
            <span className="text-brand-green font-bold" dir="ltr">${netAnnual.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-brand-bg/50 rounded-lg p-2 text-xs text-gray-400 mt-2">
          💡 אסטרטגיה: שורט פיוצ&apos;רס + לונג ספוט על {opp.coin}
        </div>
      </div>
    </motion.div>
  );
}
