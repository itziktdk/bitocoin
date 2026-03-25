export function formatCurrency(n: number): string {
  if (n >= 1000) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return '$' + n.toFixed(2);
  return '$' + n.toFixed(4);
}

export function formatPercent(n: number): string {
  return (n >= 0 ? '+' : '') + (n * 100).toFixed(4) + '%';
}

export function formatPercentSimple(n: number): string {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}

export function formatNumber(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toFixed(2);
}

export const COINS: Record<string, { name: string; color: string }> = {
  BTC: { name: 'ביטקוין', color: '#F7931A' },
  ETH: { name: 'את\'ריום', color: '#627EEA' },
  SOL: { name: 'סולנה', color: '#9945FF' },
  XRP: { name: 'ריפל', color: '#23292F' },
  DOGE: { name: 'דוג\'קוין', color: '#C2A633' },
  BNB: { name: 'ביננס', color: '#F3BA2F' },
  ADA: { name: 'קרדנו', color: '#0033AD' },
  AVAX: { name: 'אבלאנצ\'', color: '#E84142' },
  LINK: { name: 'צ\'יינלינק', color: '#2A5ADA' },
};

export const COIN_SYMBOLS = Object.keys(COINS);

export function getCoinColor(symbol: string): string {
  return COINS[symbol]?.color || '#3B82F6';
}
