'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PriceTicker() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://api.bybit.com/v5/market/tickers?category=linear');
        const json = await res.json();
        const btc = json.result?.list?.find((t: any) => t.symbol === 'BTCUSDT');
        if (btc) setPrice(parseFloat(btc.lastPrice));
      } catch {}
    };
    load();
    const i = setInterval(load, 15000);
    return () => clearInterval(i);
  }, []);

  return (
    <motion.div
      className="text-4xl sm:text-6xl font-bold text-brand-gold glow-gold"
      dir="ltr"
      key={price}
      initial={{ opacity: 0.5, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {price ? `$${price.toLocaleString()}` : '...'}
    </motion.div>
  );
}
