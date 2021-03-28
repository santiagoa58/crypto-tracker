import { AjaxConnection } from "../connection/AjaxConnection";
import {
  AssetsServiceInterface,
  CryptoAsset,
  GetCryptoAssetsRequest,
  GlobalMarketMetricsResponse,
} from "./AssetsServiceInterface";
import { map } from "rxjs/operators";
import { assetsApi, marketMetricsApi } from "../connection/apis";

const ASSETS_PATH = `${assetsApi}/assets/`;
const MARKET_METRICS_PATH = `${marketMetricsApi}/global`;

interface ServerGetAssetsResponse {
  data: Array<CryptoAsset>;
}

interface ServerGlobalMarketMetricsResponse {
  data: GlobalMarketMetricsResponse;
}

export const AssetsService: AssetsServiceInterface = {
  getCryptoAsset: (request = {}) =>
    AjaxConnection<GetCryptoAssetsRequest, ServerGetAssetsResponse>(
      `${ASSETS_PATH}`,
      request,
    ).pipe(map((response) => ({ assets: response.data }))),

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
};
