import { Ticker, FundingRate, CoinData } from './types';
import { COIN_SYMBOLS } from './utils';

const BASE = 'https://api.bybit.com/v5/market';

export async function fetchTickers(): Promise<Ticker[]> {
  try {
    const res = await fetch(`${BASE}/tickers?category=linear`, { cache: 'no-store' });
    const json = await res.json();
    if (json.retCode !== 0) throw new Error(json.retMsg);
    return (json.result?.list || []).filter((t: Ticker) =>
      COIN_SYMBOLS.some(s => t.symbol === s + 'USDT')
    );
  } catch {
    return [];
  }
}

export async function fetchFundingRates(): Promise<FundingRate[]> {
  try {
    const res = await fetch(`${BASE}/tickers?category=linear`, { cache: 'no-store' });
    const json = await res.json();
    if (json.retCode !== 0) throw new Error(json.retMsg);
    return (json.result?.list || [])
      .filter((t: any) => COIN_SYMBOLS.some(s => t.symbol === s + 'USDT'))
      .map((t: any) => ({
        symbol: t.symbol,
        fundingRate: t.fundingRate || '0',
        nextFundingTime: t.nextFundingTime || '',
      }));
  } catch {
    return [];
  }
}

export async function fetchAllCoinData(): Promise<CoinData[]> {
  try {
    const res = await fetch(`${BASE}/tickers?category=linear`, { cache: 'no-store' });
    const json = await res.json();
    if (json.retCode !== 0) return [];
    const list: any[] = json.result?.list || [];
    return COIN_SYMBOLS.map(sym => {
      const t = list.find((x: any) => x.symbol === sym + 'USDT');
      if (!t) return null;
      const fr = parseFloat(t.fundingRate || '0');
      return {
        symbol: sym,
        name: sym,
        price: parseFloat(t.lastPrice),
        change24h: parseFloat(t.price24hPcnt) * 100,
        fundingRate: fr,
        annualYield: fr * 3 * 365 * 100,
        volume: parseFloat(t.turnover24h || '0'),
      };
    }).filter(Boolean) as CoinData[];
  } catch {
    return [];
  }
}
