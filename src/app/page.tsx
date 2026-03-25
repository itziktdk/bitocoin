'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bitcoin, BarChart3, Calculator, TrendingUp } from 'lucide-react';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import PriceTicker from '@/components/price-ticker';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Hero */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Bitcoin className="w-12 h-12 text-brand-gold" />
              <h1 className="text-5xl sm:text-7xl font-black text-brand-gold">BitoCoin</h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4">ביטוקוין</p>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
              כל מה שצריך לדעת על קריפטו, במקום אחד
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-10">
            <div className="text-sm text-gray-500 mb-2">מחיר ביטקוין כרגע</div>
            <PriceTicker />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-gold text-black font-bold px-8 py-4 rounded-xl text-lg hover:bg-brand-gold/90 transition-all hover:scale-105"
            >
              כניסה לדשבורד
              <BarChart3 className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Funding Rates', desc: 'מעקב בזמן אמת אחרי שיעורי המימון' },
              { icon: Calculator, title: 'מחשבון ארביטראז\'', desc: 'חשב את הרווח הפוטנציאלי שלך' },
              { icon: BarChart3, title: 'סקירת שוק', desc: 'מחירים, שינויים ונפחי מסחר' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="bg-brand-card rounded-xl p-6 border border-white/5 text-center"
              >
                <f.icon className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
