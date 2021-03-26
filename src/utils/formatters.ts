import { isDefined } from "./isDefined";
import { getSafeNumber } from "./safeGetters";

const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions,
  locale = "en-US",
): string => Intl.NumberFormat(locale, options).format(value);

const safelyFormatNumber = (
  value: string | number | undefined,
  options: Intl.NumberFormatOptions,
): string => {
  const num = getSafeNumber(value);
  if (isDefined(num)) {
    return formatNumber(num, options);
  }

  return "";
};

export const formatPrice = (price?: string | number): string =>
  safelyFormatNumber(price, {
    style: "currency",
    currency: "USD",
  });

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
