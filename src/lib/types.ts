export interface Ticker {
  symbol: string;
  lastPrice: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  volume24h: string;
  turnover24h: string;
}

export interface FundingRate {
  symbol: string;
  fundingRate: string;
  nextFundingTime: string;
}

export interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  fundingRate: number;
  annualYield: number;
  volume: number;
}

export interface Recommendation {
  coin: string;
  type: 'hot' | 'opportunity' | 'avoid' | 'dca';
  message: string;
  confidence: number;
  action: string;
}

export interface ArbOpportunity {
  coin: string;
  fundingRate: number;
  annualYield: number;
  risk: 'נמוך' | 'בינוני' | 'גבוה';
  dailyEarning: number;
  monthlyEarning: number;
}
