import { AjaxConnection } from "../connection/AjaxConnection";
import {
  AssetsServiceInterface,
  GetCryptoAssetsRequest,
  GlobalMarketMetricsResponse,
  HistoricalAssetPriceRequest,
  HistoricalPriceData,
  ServerCryptoAsset,
} from "./AssetsServiceInterface";
import { map } from "rxjs/operators";
import {
  assetsApi,
  historicalMarketApi,
  marketMetricsApi,
} from "../connection/apis";

const ASSETS_PATH = `${assetsApi}/coins/markets/`;
const HISTORICAL_MARKET_PATH = `${historicalMarketApi}/assets/`;
const MARKET_METRICS_PATH = `${marketMetricsApi}/global/`;

type ServerGetAssetsResponse = ServerCryptoAsset[];

interface ServerGlobalMarketMetricsResponse {
  data: GlobalMarketMetricsResponse;
}

interface ServerGetHistoricalPriceResponse {
  data: HistoricalPriceData[];
}

export const AssetsService: AssetsServiceInterface = {
  getCryptoAsset: (request = { vs_currency: "usd" }) =>
    AjaxConnection<GetCryptoAssetsRequest, ServerGetAssetsResponse>(
      `${ASSETS_PATH}`,
      request,
    ).pipe(
      map((response) => ({
        assets: response.map((asset) => ({
          id: asset.id,
          symbol: asset.symbol,
          name: asset.name,
          image: asset.image,
          price: asset.current_price,
          marketCap: asset.market_cap,
          rank: asset.market_cap_rank,
          fullyDilutedValuation: asset.fully_diluted_valuation,
          totalVolume: asset.total_volume,
          high24h: asset.high_24h,
          low24h: asset.low_24h,
          priceChange24h: asset.price_change_24h,
          priceChangePercent24h: asset.price_change_percentage_24h,
          priceChangePercent1h: asset.price_change_percentage_1h_in_currency,
          marketCapChange24h: asset.market_cap_change_24h,
          marketCapChangePercent24h: asset.market_cap_change_percentage_24h,
          circulatingSupply: asset.circulating_supply,
          totalSupply: asset.total_supply,
          maxSupply: asset.max_supply,
          lastUpdated: asset.last_updated,
        })),
      })),
    ),

  getGlobalMarketData: () =>
    AjaxConnection<undefined, ServerGlobalMarketMetricsResponse>(
      `${MARKET_METRICS_PATH}`,
      undefined,
    ).pipe(
      map(({ data }) => ({
        totalMarketCapUsd: data.total_market_cap["usd"],
        totalVolumeUsd: data.total_volume["usd"],
        marketCapPercentage: data.market_cap_percentage,
        marketCapChangePercentage24hUsd:
          data.market_cap_change_percentage_24h_usd,
        updatedAt: data.updated_at,
      })),
    ),

  getHistoricalPriceData: ({ id, ...request }: HistoricalAssetPriceRequest) =>
    AjaxConnection<
      Pick<HistoricalAssetPriceRequest, "interval">,
      ServerGetHistoricalPriceResponse
    >(`${HISTORICAL_MARKET_PATH}${id}/history`, request).pipe(
      map(({ data }) => ({
        id,
        historicalPriceData: data,
        interval: request.interval,
      })),
    ),
};
