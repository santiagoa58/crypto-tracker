import { AjaxConnection } from "./connection/AjaxConnection";
import {
  MarketsServiceInterface,
  GetAllMarketsResponse,
  GetAllMarketsRequest,
} from "./MarketsServiceInterface";
import { map } from "rxjs/operators";

const MARKETS_PATH = "/markets";

interface ServerGetAllMarketsResponse {
  data: Array<GetAllMarketsResponse>;
}

export const MarketsService: MarketsServiceInterface = {
  getAll: (request = {}) =>
    AjaxConnection<GetAllMarketsRequest, ServerGetAllMarketsResponse>(
      `${MARKETS_PATH}`,
      request,
    ).pipe(map((response) => response?.data)),
};
