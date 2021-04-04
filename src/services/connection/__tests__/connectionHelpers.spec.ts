import { getRequestParams } from "../connectionHelpers";

const endpoint = "https://example.com/prices";

test("correctly combines enpoint with request as string params url", () => {
  const request = { assets: "ALL" };
  let requestParams = getRequestParams(endpoint, request, undefined);

  expect(requestParams.initRequest).toBeUndefined();
  expect(requestParams.url).toBe("https://example.com/prices?assets=ALL");
});

test("correctly parses request object to string params url", () => {
  const request = { cryptos: ["bitcoin", "xrp", "ethereum"] };
  let { url } = getRequestParams(endpoint, request, undefined);

  expect(url).toBe("https://example.com/prices?cryptos=bitcoin,xrp,ethereum");

  expect(getRequestParams(endpoint, { assets: null }, undefined).url).toBe(
    "https://example.com/prices",
  );

  expect(getRequestParams(endpoint, null, undefined).url).toBe(
    "https://example.com/prices",
  );
});
