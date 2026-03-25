'use client';
import { motion } from 'framer-motion';
import { Recommendation } from '@/lib/types';
import { Flame, TrendingUp, AlertTriangle, ArrowDown } from 'lucide-react';

const icons = {
  hot: Flame,
  opportunity: TrendingUp,
  avoid: AlertTriangle,
  dca: ArrowDown,
};

const colors = {
  hot: 'text-orange-400 bg-orange-500/10',
  opportunity: 'text-green-400 bg-green-500/10',
  avoid: 'text-red-400 bg-red-500/10',
  dca: 'text-blue-400 bg-blue-500/10',
};

export default function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const Icon = icons[rec.type];
  const color = colors[rec.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-brand-card rounded-xl p-4 border border-white/5`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm mb-2">{rec.message}</p>
          <div className="text-xs text-gray-500 mb-2">{rec.action}</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">ביטחון:</span>
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-gold"
                style={{ width: `${rec.confidence * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{(rec.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
