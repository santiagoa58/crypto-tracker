import { Colors } from "../theme/theme";
import { DEFAULT_CURRENCY } from "./constants";
import { isDefined } from "./isDefined";
import { getSafeDate, getSafeNumber } from "./safeGetters";
import { format } from "date-fns";

const DEFAULT_LOCALE = "en-US";
const TIME_FORMAT = "h:mm:ss aa";
const DAY_DATE_FORMAT = "MMMM d yyyy";
const DAY_TIME_FORMAT = `MMM d, ${TIME_FORMAT}`;
const DATETIME_FORMAT = `${DAY_DATE_FORMAT}, ${TIME_FORMAT}`;

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

const safeDateFormat = (
  timestamp: number | string | undefined,
  formatTemplate: string,
) => {
  const milliseconds = getSafeNumber(timestamp);
  if (!isDefined(milliseconds)) {
    return "";
  }
  return format(milliseconds, formatTemplate);
};
export const formatWeekdayDate = (
  timestamp: number | string | undefined,
): string => safeDateFormat(timestamp, DAY_DATE_FORMAT);

export const formatDateTime = (
  timestamp: number | string | undefined,
): string => safeDateFormat(timestamp, DATETIME_FORMAT);

export const formatDayTime = (timestamp: number | string | undefined): string =>
  safeDateFormat(timestamp, DAY_TIME_FORMAT);

export const parseDateString = (date: string | Date | undefined) => {
  const safeDate = getSafeDate(date);
  return safeDate ? format(safeDate, DATETIME_FORMAT) : "";
};
