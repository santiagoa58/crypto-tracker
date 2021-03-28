import { formatPrice, formatIntegerPrice, formatPercent } from "../formatters";

test("correctly formats price", () => {
  const marketcap = 123456789;
  const formattedMarketCap = formatIntegerPrice(marketcap);
  expect(formattedMarketCap).toBe("$123,456,789");

  const price = 54634.76784551;
  const formattedPrice = formatPrice(price);
  expect(formattedPrice).toBe("$54,634.77");
});

test("correctly formats percentages", () => {
  const percentChange = -5.521654;
  const formattedPercentChange = formatPercent(percentChange);
  expect(formattedPercentChange).toBe("-5.52%");
});
