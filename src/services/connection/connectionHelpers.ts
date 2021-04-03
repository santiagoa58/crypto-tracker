import { isDefined } from "../../utils/isDefined";
import { jsonToString } from "../../utils/parseJson";
import { RequestMethod } from "./AjaxConnection";

const objectEntriesToStringParams = (entries: Array<[string, unknown]>) =>
  entries.reduce((stringParams, [field, value]) => {
    if (isDefined(value)) {
      return `${stringParams ? `${stringParams}&` : ""}${field}=${value}`;
    }
    return stringParams;
  }, "");

const parseStringParams = (params: any): string => {
  if (!params) {
    return "";
  }

  if (typeof params === "object" && !Array.isArray(params)) {
    return objectEntriesToStringParams(Object.entries(params));
  }

  return String(params);
};

const parseUrl = (url: string, params?: any) => {
  if (isDefined(params)) {
    const stringParams = parseStringParams(params);
    return encodeURI(`${url}?${stringParams}`);
  }
  return encodeURI(url);
};

const getInitRequest = (method: RequestMethod, request: any): RequestInit => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  let body = undefined;

  if (method === RequestMethod.POST) {
    body = jsonToString(request);
  }

  return {
    headers,
    method,
    body,
  };
};

export const getRequestParams = (
  endpoint: string,
  request: any,
  method: RequestMethod,
) => {
  const validRequest = getValidRequest(request);
  const url = parseUrl(endpoint, validRequest);
  const initRequest = getInitRequest(method, validRequest);

  return {
    url,
    initRequest,
  };
};

const getValidRequest = <T = any>(request: T): T | undefined => {
  if (!request) {
    return undefined;
  }

  if (typeof request === "object") {
    const values = Object.values(request).filter(isDefined);
    if (!values.length) {
      return undefined;
    }
  }

  return request;
};
