import { Colors } from "../theme/theme";
import { DEFAULT_CURRENCY } from "./constants";
import { isDefined } from "./isDefined";
import { getSafeNumber } from "./safeGetters";

const DEFAULT_LOCALE = "en-US";

const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions | undefined,
  locale = DEFAULT_LOCALE,
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
    currency: DEFAULT_CURRENCY.toUpperCase(),
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  }) || "--";

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
  return "--";
};

export const formatQuantity = (quantity?: string | number) =>
  safelyFormatNumber(quantity) || "--";

export const getColorFromSign = (
  value?: string | number,
): Colors | undefined => {
  const num = getSafeNumber(value);

  if (!isDefined(num) || num === 0) {
    return undefined;
  }

  return num > 0 ? "green" : "red";
};

const formatDateTime = (
  milliseconds: number,
  options: Intl.DateTimeFormatOptions | undefined,
  locale = DEFAULT_LOCALE,
) => {
  const date = new Date(milliseconds);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatWeekdayDateString = (
  timestamp: number | string | undefined,
): string => {
  const milliseconds = getSafeNumber(timestamp);
  if (!isDefined(milliseconds)) {
    return "";
  }
  return formatDateTime(milliseconds, {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long",
  });
};
