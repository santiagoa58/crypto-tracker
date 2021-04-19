import { Observable } from "rxjs";
import { RequiredPartial } from "../../utils/types";
import { CryptoAsset } from "../crypto_assets/AssetsServiceInterface";

export interface AssetPrice {
  [cryptoAssetId: string]: number; // ex: "bitcoin":"63891.06534240"
}

export interface PriceFeedSubscriptionRequest {
  assets: Array<string> | "ALL";
}

export type AssetUpdate = RequiredPartial<CryptoAsset, "id" | "price">;

export interface FeedServiceInterface {
  priceFeed(request: PriceFeedSubscriptionRequest): Observable<AssetUpdate>;
}
