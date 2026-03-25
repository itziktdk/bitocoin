'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { fetchAllCoinData } from '@/lib/bybit-api';
import { CoinData } from '@/lib/types';
import { COINS, formatCurrency } from '@/lib/utils';

export default function Calculator() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [amount, setAmount] = useState(10000);
  const [selected, setSelected] = useState('BTC');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchAllCoinData().then(setCoins);
  }, []);

  const coin = coins.find(c => c.symbol === selected);
  const fr = coin?.fundingRate || 0;
  const daily = fr * 3 * amount;
  const monthly = daily * 30;
  const annual = daily * 365;
  const fees = amount * 0.002;
  const net = annual - fees;

  return (
    <>
      <Nav />
      <main className="pt-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">🧮 מחשבון ארביטראז&apos;</h1>

        <div className="bg-brand-card rounded-xl p-6 border border-white/5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">סכום השקעה ($)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value) || 0)}
                className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-lg font-mono focus:border-brand-gold outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">בחר מטבע</label>
              <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
                className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-lg focus:border-brand-gold outline-none"
              >
                {Object.entries(COINS).map(([sym, info]) => (
                  <option key={sym} value={sym}>{sym} — {info.name}</option>
                ))}
              </select>
            </div>
          </div>

          {coin && (
            <div className="text-sm text-gray-400 mb-4">
              מחיר נוכחי: <span className="text-white font-mono" dir="ltr">{formatCurrency(coin.price)}</span>
              {' | '}Funding Rate: <span className={`font-mono ${fr >= 0 ? 'text-brand-green' : 'text-brand-red'}`} dir="ltr">{(fr * 100).toFixed(4)}%</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'רווח יומי', value: daily, color: 'text-brand-green' },
              { label: 'רווח חודשי', value: monthly, color: 'text-brand-green' },
              { label: 'רווח שנתי', value: annual, color: 'text-brand-green' },
              { label: 'נטו (אחרי עמלות)', value: net, color: 'text-brand-gold' },
            ].map((item) => (
              <motion.div key={item.label} className="bg-brand-bg rounded-lg p-4 text-center" layout>
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-lg font-bold font-mono ${item.color}`}
                  dir="ltr"
                >
                  ${item.value.toFixed(2)}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-600 text-center">
            * העמלות כוללות ~0.1% כניסה + 0.1% יציאה = 0.2% מסך ההשקעה
          </div>
        </div>

        {/* Compare all */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full bg-brand-card border border-white/10 rounded-xl py-3 text-sm hover:bg-brand-card-hover transition-colors mb-6"
        >
          {showAll ? 'הסתר השוואה' : '📊 השווה את כל המטבעות'}
        </button>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-brand-card rounded-xl border border-white/5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-white/5">
                      <th className="py-3 px-4 text-right">מטבע</th>
                      <th className="py-3 px-4 text-right">FR</th>
                      <th className="py-3 px-4 text-right">יומי</th>
                      <th className="py-3 px-4 text-right">חודשי</th>
                      <th className="py-3 px-4 text-right">שנתי נטו</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...coins].sort((a, b) => b.fundingRate - a.fundingRate).map(c => {
                      const d = c.fundingRate * 3 * amount;
                      const m = d * 30;
                      const a = d * 365 - amount * 0.002;
                      return (
                        <tr key={c.symbol} className="border-b border-white/5 hover:bg-brand-card-hover">
                          <td className="py-2 px-4 font-medium">{c.symbol}</td>
                          <td className="py-2 px-4 font-mono text-xs" dir="ltr">{(c.fundingRate * 100).toFixed(4)}%</td>
                          <td className={`py-2 px-4 font-mono ${d >= 0 ? 'text-brand-green' : 'text-brand-red'}`} dir="ltr">${d.toFixed(2)}</td>
                          <td className={`py-2 px-4 font-mono ${m >= 0 ? 'text-brand-green' : 'text-brand-red'}`} dir="ltr">${m.toFixed(2)}</td>
                          <td className={`py-2 px-4 font-mono font-bold ${a >= 0 ? 'text-brand-green' : 'text-brand-red'}`} dir="ltr">${a.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
