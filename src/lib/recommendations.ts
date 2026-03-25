import { CoinData, Recommendation } from './types';
import { COINS } from './utils';

export function analyzeFundingRates(coins: CoinData[]): Recommendation[] {
  const recs: Recommendation[] = [];

  for (const coin of coins) {
    const name = COINS[coin.symbol]?.name || coin.symbol;

    if (coin.fundingRate > 0.0003) {
      recs.push({
        coin: coin.symbol,
        type: 'hot',
        message: `🔥 הזדמנות חמה! ארביטראז' על ${name} (${coin.symbol}) — תשואה שנתית ${coin.annualYield.toFixed(1)}%`,
        confidence: 0.9,
        action: `שורט פיוצ'רס + לונג ספוט על ${coin.symbol}`,
      });
    } else if (coin.fundingRate > 0.0001) {
      recs.push({
        coin: coin.symbol,
        type: 'opportunity',
        message: `שווה ארביטראז' על ${name} (${coin.symbol}) — תשואה שנתית ${coin.annualYield.toFixed(1)}%`,
        confidence: 0.7,
        action: `שורט פיוצ'רס + לונג ספוט על ${coin.symbol}`,
      });
    } else if (coin.fundingRate < 0) {
      recs.push({
        coin: coin.symbol,
        type: 'avoid',
        message: `הימנע מארביטראז' על ${name} (${coin.symbol}) כרגע — Funding Rate שלילי`,
        confidence: 0.6,
        action: 'המתן לשינוי כיוון',
      });
    }

    if (coin.change24h < -5) {
      recs.push({
        coin: coin.symbol,
        type: 'dca',
        message: `ירידה חדה ב-${name} (${coin.change24h.toFixed(1)}%) — שקול DCA`,
        confidence: 0.5,
        action: 'קנייה מדורגת',
      });
    }
  }

  return recs.sort((a, b) => b.confidence - a.confidence);
}
