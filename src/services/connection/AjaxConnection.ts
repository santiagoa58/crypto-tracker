import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { getRequestParams } from "./connectionHelpers";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

export const AjaxConnection = <Request, Response>(
  endpoint: string,
  request: Request,
  method: RequestMethod = RequestMethod.GET,
): Observable<Response> => {
  const { url, initRequest } = getRequestParams(endpoint, request, method);
  return fromFetch(url, initRequest).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`got non-ok response: ${response.status}`);
    }),
  );
};
