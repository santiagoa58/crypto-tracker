import { Observable } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { parseJson } from "../../utils/parseJson";
import { getRequestParams } from "./connectionHelpers";

export const webSocketConnection = <Request, Response>(
  endpoint: string,
  request: Request,
): Observable<Response> => {
  const { url } = getRequestParams(endpoint, request, undefined);
  const subject = webSocket({
    url,
    deserializer: (event) => parseJson(event.data),
    openObserver: {
      next() {
        console.info(`websocket connection opened.\nsubscribed to ${url}`);
      },
    },
    closeObserver: {
      next(closeEvent) {
        console.warn(closeEvent.code, "websocket connection closed");
      },
    },
  });

  return subject;
};
