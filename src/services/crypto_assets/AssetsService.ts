import { AjaxConnection } from "../connection/AjaxConnection";
import {
  AssetsServiceInterface,
  GetCryptoAssetsRequest,
  GlobalMarketMetricsResponse,
  HistoricalAssetPriceRequest,
  ServerCryptoAsset,
} from "./AssetsServiceInterface";
import { map } from "rxjs/operators";
import { assetsApi } from "../connection/apis";
import { DEFAULT_CURRENCY } from "../../utils/constants";

const ASSETS_PATH = `${assetsApi}/coins/markets/`;
const HISTORICAL_MARKET_PATH = `${assetsApi}/coins/`;
const MARKET_METRICS_PATH = `${assetsApi}/global/`;

type ServerGetAssetsResponse = ServerCryptoAsset[];

interface ServerGlobalMarketMetricsResponse {
  data: GlobalMarketMetricsResponse;
}

interface ServerGetHistoricalPriceResponse {
  prices: Array<[number, number]> /*[timestamp, price] */;
}

export const AssetsService: AssetsServiceInterface = {
  getCryptoAsset: (request = { vs_currency: DEFAULT_CURRENCY }) =>
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
        totalMarketCapUsd: data.total_market_cap[DEFAULT_CURRENCY],
        totalVolumeUsd: data.total_volume[DEFAULT_CURRENCY],
        marketCapPercentage: data.market_cap_percentage,
        marketCapChangePercentage24hUsd:
          data.market_cap_change_percentage_24h_usd,
        updatedAt: data.updated_at,
      })),
    ),

  getHistoricalPriceData: ({ id, ...request }: HistoricalAssetPriceRequest) =>
    AjaxConnection<
      Omit<HistoricalAssetPriceRequest, "id">,
      ServerGetHistoricalPriceResponse
    >(`${HISTORICAL_MARKET_PATH}${id}/market_chart`, request).pipe(
      map(({ prices }) => ({
        id,
        historicalPriceData: prices.map(([time, price]) => ({ time, price })),
        days: request.days,
      })),
    ),
};
