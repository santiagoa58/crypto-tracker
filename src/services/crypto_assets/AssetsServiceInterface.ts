import { Observable } from "rxjs";

type CryptoAssetOrder =
  | "market_cap_desc"
  | "gecko_desc"
  | "gecko_asc"
  | "market_cap_asc"
  | "market_cap_desc"
  | "volume_asc"
  | "volume_desc"
  | "id_asc"
  | "id_desc";
export interface GetCryptoAssetsRequest {
  vs_currency: string /** The target currency of market data (usd, eur, jpy, etc.) */;
  ids?: string /*The ids of the coin, comma separated crytocurrency symbols (base). refers to /coins/list.*/;
  category?: string /*filter by coin category, only decentralized_finance_defi and stablecoins are supported at the moment */;
  order?: CryptoAssetOrder /** sort results by field*/;
  per_page?: number /*valid values: 1…250; Total results per page*/;
  page?: number /*Page through results*/;
  sparkline?: boolean /*Include sparkline 7 days data */;
  price_change_percentage?: string /** Include price change percentage in 1h, 24h, 7d, 14d, 30d, 200d, 1y (eg. '1h,24h,7d' comma-separated, invalid values will be discarded) */;
}

export interface ServerCryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
}

export interface CryptoAssetDetails {
  blockTimeInMinutes: number;
  categories: string[];
  description: string;
  homepageLink?: string;
  genesisDate: string;
  totalValueLocked?: number;
  mcapToTotalValueLockedRatio?: number;
  allTimeHigh: number;
  allTimeHighDate: string;
  priceChangePercentage7d: number;
  priceChangePercentage14d: number;
  priceChangePercentage30d: number;
  priceChangePercentage60d: number;
  priceChangePercentage200d: number;
  priceChangePercentage1y: number;
}

export interface CryptoAssetIdentifier {
  id: string;
  symbol: string;
  name: string;
}

export interface CryptoAsset
  extends CryptoAssetIdentifier,
    Partial<CryptoAssetDetails> {
  image: string;
  price: number;
  marketCap: number;
  rank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  priceChangePercent1h?: number;
  marketCapChange24h: number;
  marketCapChangePercent24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  lastUpdated: string;
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

export interface HistoricalPriceData {
  price: number;
  time: number;
}

export type HistoricalDaysRange = number | "max";
export interface HistoricalAssetPriceRequest {
  id: string;
  vs_currency: string;
  days: HistoricalDaysRange;
}

export interface HistoricalAssetPriceResponse {
  id: string;
  historicalPriceData: HistoricalPriceData[];
  days: HistoricalDaysRange;
}

export interface GetAssetDetailsRequest {
  id: string;
}

export interface AssetsServiceInterface {
  getCryptoAssets(
    request?: GetCryptoAssetsRequest,
  ): Observable<GetCryptoAssetsResponse>;
  getGlobalMarketData(): Observable<GlobalMarketMetrics>;
  getHistoricalPriceData(
    request: HistoricalAssetPriceRequest,
  ): Observable<HistoricalAssetPriceResponse>;
  getAssetDetails(request: GetAssetDetailsRequest): Observable<CryptoAsset>;
  getAllCoins(): Observable<CryptoAssetIdentifier[]>;
}
