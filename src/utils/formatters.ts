import { isDefined } from "./isDefined";
import { getSafeNumber } from "./safeGetters";

const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions | undefined,
  locale = "en-US",
): string => Intl.NumberFormat(locale, options).format(value);

const safelyFormatNumber = (
  value: string | number | undefined,
  options?: Intl.NumberFormatOptions,
): string => {
  const num = getSafeNumber(value);
  if (isDefined(num)) {
    return formatNumber(num, options);
  }

  return "";
};

export const formatPrice = (
  price?: string | number,
  decimalPlaces = 2,
): string =>
  safelyFormatNumber(price, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  });

export const formatIntegerPrice = (price?: string | number) =>
  formatPrice(price, 0);

export const formatPercent = (percent?: string | number) => {
  const value = getSafeNumber(percent);
  if (isDefined(value)) {
    return formatNumber(value / 100, {
      style: "percent",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
};

export const formatQuantity = (quantity?: string | number) =>
  safelyFormatNumber(quantity);
