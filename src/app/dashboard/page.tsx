'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import CoinCard from '@/components/coin-card';
import FundingTable from '@/components/funding-table';
import ArbCard from '@/components/arb-card';
import RecommendationCard from '@/components/recommendation-card';
import { fetchAllCoinData } from '@/lib/bybit-api';
import { analyzeFundingRates } from '@/lib/recommendations';
import { CoinData, Recommendation, ArbOpportunity } from '@/lib/types';

export default function Dashboard() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAllCoinData();
    setCoins(data);
    setRecs(analyzeFundingRates(data));
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const i = setInterval(loadData, 60000);
    return () => clearInterval(i);
  }, []);

  const arbOpps: ArbOpportunity[] = coins
    .filter(c => c.fundingRate > 0)
    .sort((a, b) => b.fundingRate - a.fundingRate)
    .slice(0, 4)
    .map(c => ({
      coin: c.symbol,
      fundingRate: c.fundingRate,
      annualYield: c.annualYield,
      risk: c.fundingRate > 0.0003 ? 'גבוה' as const : c.fundingRate > 0.0001 ? 'בינוני' as const : 'נמוך' as const,
      dailyEarning: c.fundingRate * 3 * 10000,
      monthlyEarning: c.fundingRate * 3 * 10000 * 30,
    }));

  return (
    <>
      <Nav />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">דשבורד</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {lastUpdate && <span>עודכן: {lastUpdate.toLocaleTimeString('he-IL')}</span>}
            <button onClick={loadData} className="p-2 rounded-lg hover:bg-brand-card transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Section 1: Market Overview */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-brand-gold">📊 סקירת שוק</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {coins.map(coin => (
              <CoinCard key={coin.symbol} coin={coin} />
            ))}
          </div>
        </section>

        {/* Section 2: Funding Rates */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-brand-blue">💰 Funding Rates</h2>
          <div className="bg-brand-card rounded-xl p-4 border border-white/5">
            <FundingTable coins={coins} />
          </div>
        </section>

        {/* Section 3: Arb Opportunities */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-brand-green">🔄 הזדמנויות ארביטראז&apos;</h2>
          {arbOpps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {arbOpps.map((opp, i) => (
                <ArbCard key={opp.coin} opp={opp} isBest={i === 0} />
              ))}
            </div>
          ) : (
            <div className="bg-brand-card rounded-xl p-8 text-center text-gray-500">
              אין הזדמנויות ארביטראז&apos; כרגע
            </div>
          )}
        </section>

        {/* Section 4: Recommendations */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-brand-gold">🤖 המלצות</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recs.map((rec, i) => (
              <RecommendationCard key={`${rec.coin}-${rec.type}`} rec={rec} index={i} />
            ))}
          </div>
          {recs.length === 0 && !loading && (
            <div className="bg-brand-card rounded-xl p-8 text-center text-gray-500">
              אין המלצות כרגע
            </div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-center text-xs text-gray-600"
          >
            ⚠️ אין זה ייעוץ פיננסי. כל המידע מוצג למטרות מידע בלבד.
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
