import { delay, map, retryWhen, tap } from "rxjs/operators";
import { DEFAULT_CURRENCY } from "../../utils/constants";
import { AjaxConnection } from "../connection/AjaxConnection";
import { assetsApi } from "../connection/apis";
import {
  AssetsServiceInterface,
  CryptoAssetIdentifier,
  GetAssetDetailsRequest,
  GetCryptoAssetsRequest,
  GlobalMarketMetricsResponse,
  HistoricalAssetPriceRequest,
  ServerCryptoAsset,
} from "./AssetsServiceInterface";

const ASSETS_PATH = `${assetsApi}/coins/`;
const MARKET_METRICS_PATH = `${assetsApi}/global/`;

type ServerGetAssetsResponse = ServerCryptoAsset[];

interface ServerGetHistoricalPriceResponse {
  prices: Array<[number, number]> /*[timestamp, price] */;
}

interface ServerGlobalMarketMetricsResponse {
  data: GlobalMarketMetricsResponse;
}

const DELAY_TIME_ONE_MINUTE = 60000;

export const AssetsService: AssetsServiceInterface = {
  getAllCoins: () =>
    AjaxConnection<{ include_platform: boolean }, CryptoAssetIdentifier[]>(
      `${ASSETS_PATH}list`,
      { include_platform: false }
    ),
  getCryptoAssets: (request = { vs_currency: DEFAULT_CURRENCY }) =>
    AjaxConnection<GetCryptoAssetsRequest, ServerGetAssetsResponse>(
      `${ASSETS_PATH}markets`,
      request
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
      retryWhen((errors) =>
        errors.pipe(
          tap(() =>
            console.error("AssetsService Connection Failed, retrying...")
          ),
          delay(DELAY_TIME_ONE_MINUTE)
        )
      )
    ),

  getGlobalMarketData: () =>
    AjaxConnection<undefined, ServerGlobalMarketMetricsResponse>(
      `${MARKET_METRICS_PATH}`,
      undefined
    ).pipe(
      map(({ data }) => ({
        totalMarketCapUsd: data.total_market_cap[DEFAULT_CURRENCY],
        totalVolumeUsd: data.total_volume[DEFAULT_CURRENCY],
        marketCapPercentage: data.market_cap_percentage,
        marketCapChangePercentage24hUsd:
          data.market_cap_change_percentage_24h_usd,
        updatedAt: data.updated_at,
      })),
      retryWhen((errors) =>
        errors.pipe(
          tap(() =>
            console.error("AssetsService Connection Failed, retrying...")
          ),
          delay(DELAY_TIME_ONE_MINUTE)
        )
      )
    ),

  getHistoricalPriceData: ({ id, ...request }: HistoricalAssetPriceRequest) =>
    AjaxConnection<
      Omit<HistoricalAssetPriceRequest, "id">,
      ServerGetHistoricalPriceResponse
    >(`${ASSETS_PATH}${id}/market_chart`, request).pipe(
      map(({ prices }) => ({
        id,
        historicalPriceData: prices.map(([time, price]) => ({ time, price })),
        days: request.days,
      })),
      retryWhen((errors) =>
        errors.pipe(
          tap(() =>
            console.error("AssetsService Connection Failed, retrying...")
          ),
          delay(DELAY_TIME_ONE_MINUTE)
        )
      )
    ),

  getAssetDetails: ({ id, ...request }: GetAssetDetailsRequest) =>
    AjaxConnection<
      Omit<GetAssetDetailsRequest, "id">,
      ServerGetAssetDetailsResponse
    >(`${ASSETS_PATH}${id}`, request).pipe(
      map(
        (response) => ({
          id: response.id,
          symbol: response.symbol,
          name: response.name,
          image: response.image.small,
          price: response.market_data.current_price.usd,
          marketCap: response.market_data.market_cap.usd,
          rank: response.market_cap_rank,
          fullyDilutedValuation:
            response.market_data.fully_diluted_valuation.usd,
          totalVolume: response.market_data.total_volume.usd,
          high24h: response.market_data.high_24h.usd,
          low24h: response.market_data.low_24h.usd,
          priceChange24h: response.market_data.price_change_24h,
          priceChangePercent24h:
            response.market_data.price_change_percentage_24h,
          priceChangePercentage7d:
            response.market_data.price_change_percentage_7d,
          priceChangePercentage14d:
            response.market_data.price_change_percentage_14d,
          priceChangePercentage30d:
            response.market_data.price_change_percentage_30d,
          priceChangePercentage60d:
            response.market_data.price_change_percentage_60d,
          priceChangePercentage200d:
            response.market_data.price_change_percentage_200d,
          priceChangePercentage1y:
            response.market_data.price_change_percentage_1y,
          marketCapChange24h: response.market_data.market_cap_change_24h,
          marketCapChangePercent24h:
            response.market_data.market_cap_change_percentage_24h,
          circulatingSupply: response.market_data.circulating_supply,
          totalSupply: response.market_data.total_supply,
          maxSupply: response.market_data.max_supply,
          lastUpdated: response.last_updated,
          blockTimeInMinutes: response.block_time_in_minutes,
          categories: response.categories,
          description: response.description.en,
          homepageLink: response.links.homepage?.find(Boolean),
          genesisDate: response.genesis_date,
          totalValueLocked: response.market_data.total_value_locked,
          mcapToTotalValueLockedRatio: response.market_data.mcap_to_tvl_ratio,
          allTimeHigh: response.market_data.ath.usd,
          allTimeHighDate: response.market_data.ath_date.usd,
        }),
        retryWhen((errors) =>
          errors.pipe(
            tap(() =>
              console.error("AssetsService Connection Failed, retrying...")
            ),
            delay(DELAY_TIME_ONE_MINUTE)
          )
        )
      )
    ),
};

interface ServerGetAssetDetailsResponse {
  id: string;
  symbol: string;
  name: string;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  description: {
    en: string;
  };
  links: {
    homepage: Array<string | undefined>;
    blockchain_site: Array<string | undefined>;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: {
      btc: number;
      usd: number;
    };
    total_value_locked?: number;
    mcap_to_tvl_ratio?: number;
    fdv_to_tvl_ratio?: number;
    ath: {
      btc: number;
      usd: number;
    };
    ath_change_percentage: {
      btc: number;
      usd: number;
    };
    ath_date: {
      btc: string;
      usd: string;
    };
    atl: {
      btc: number;
      usd: number;
    };
    atl_change_percentage: {
      btc: number;
      usd: number;
    };
    atl_date: {
      btc: string;
      usd: string;
    };
    market_cap: {
      btc: number;
      usd: number;
    };
    market_cap_rank: 1;
    fully_diluted_valuation: {
      btc: number;
      usd: number;
    };
    total_volume: {
      btc: number;
      usd: number;
    };
    high_24h: {
      btc: number;
      usd: number;
    };
    low_24h: {
      btc: number;
      usd: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_1h_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_24h_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_7d_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_14d_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_30d_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_60d_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_200d_in_currency: {
      btc: number;
      usd: number;
    };
    price_change_percentage_1y_in_currency: {
      btc: number;
      usd: number;
    };
    market_cap_change_24h_in_currency: {
      btc: number;
      usd: number;
    };
    market_cap_change_percentage_24h_in_currency: {
      btc: number;
      usd: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    commit_count_4_weeks: number;
  };
  status_updates: [];
  last_updated: string;
}
