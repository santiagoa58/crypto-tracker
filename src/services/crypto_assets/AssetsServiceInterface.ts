import { Observable } from "rxjs";

export interface GetCryptoAssetsRequest {
  search?: string /*search by asset id (bitcoin) or symbol (BTC)*/;
  ids?: string /*query with multiple ids=bitcoin,ethereum,monero*/;
  limit?: number /*max limit of 2000*/;
  offset?: number;
}

export interface CryptoAsset {
  id: string /*unique identifier for asset*/;
  rank: string /*rank is in ascending order - this number is directly associated with the marketcap whereas the highest marketcap receives rank 1*/;
  symbol: string /*most common symbol used to identify this asset on an exchange*/;
  name: string /*proper name for asset*/;
  supply: string /*available supply for trading*/;
  maxSupply: string /*total quantity of asset issued*/;
  marketCapUsd: string /*supply x price*/;
  volumeUsd24Hr: string /*quantity of trading volume represented in USD over the last 24 hours*/;
  priceUsd: string /*volume-weighted price based on real-time market data, translated to USD*/;
  changePercent24Hr: string /*the direction and value change in the last 24 hours*/;
  vwap24Hr: string /*Volume Weighted Average Price in the last 24 hours*/;
}

export interface GetCryptoAssetsResponse {
  assets: CryptoAsset[];
}
interface CryptoAssetMetric {
  [cryptoAsset: string]: number;
}
export interface GlobalMarketMetricsResponse {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: CryptoAssetMetric;
  total_volume: CryptoAssetMetric;
  market_cap_percentage: CryptoAssetMetric;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}
export interface GlobalMarketMetrics {
  totalMarketCapUsd: number;
  totalVolumeUsd: number;
  marketCapPercentage: CryptoAssetMetric;
  marketCapChangePercentage24hUsd: number;
  updatedAt: number;
}

export type HistoricalPriceInterval =
  | "m1"
  | "m5"
  | "m15"
  | "m30"
  | "h1"
  | "h2"
  | "h6"
  | "h12"
  | "d1";

export interface HistoricalPriceData {
  priceUsd: string;
  time: number;
  date: string;
}
export interface HistoricalAssetPriceRequest {
  id: string;
  interval: HistoricalPriceInterval;
}

export interface HistoricalAssetPriceResponse {
  id: string;
  historicalPriceData: HistoricalPriceData[];
  interval: HistoricalPriceInterval;
}

export interface AssetsServiceInterface {
  getCryptoAsset(
    request?: GetCryptoAssetsRequest,
  ): Observable<GetCryptoAssetsResponse>;
  getGlobalMarketData(): Observable<GlobalMarketMetrics>;
  getHistoricalPriceData(
    request: HistoricalAssetPriceRequest,
  ): Observable<HistoricalAssetPriceResponse>;
}
