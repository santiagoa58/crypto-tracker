import { AjaxConnection } from "../connection/AjaxConnection";
import {
  AssetsServiceInterface,
  CryptoAsset,
  GetCryptoAssetsRequest,
} from "./AssetsServiceInterface";
import { map } from "rxjs/operators";

const ASSETS_PATH = "/assets/";

interface ServerGetAssetsResponse {
  data: Array<CryptoAsset>;
}

export const AssetsService: AssetsServiceInterface = {
  getCryptoAsset: (request = {}) =>
    AjaxConnection<GetCryptoAssetsRequest, ServerGetAssetsResponse>(
      `${ASSETS_PATH}`,
      request,
    ).pipe(map((response) => ({ assets: response.data }))),
};
