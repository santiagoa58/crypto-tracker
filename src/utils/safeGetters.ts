import { isDefined, isNumber } from "./isDefined";

export const getSafeNumber = (value: any): number | undefined => {
  const number = parseFloat(`${value}`);
  if (isNumber(number)) {
    return number;
  }

  return undefined;
};

export const getSafeString = (value?: string | number): string => {
  if (isDefined(value)) {
    return typeof value === "string" ? value : String(value);
  }

  return "";
};

export const getSafeMinMax = <T extends Record<string, any>, K extends keyof T>(
  values: T[] | undefined,
  key: K,
): [number, number] | undefined => {
  if (!isDefined(values)) {
    return undefined;
  }
  const numericValues = values
    .map((value) => getSafeNumber(value?.[key]))
    .filter(isDefined);
  const max = Math.max(...numericValues);
  const min = Math.min(...numericValues);

  return [min, max];
};

export const getSafeDate = (date?: string | Date) => {
  if (!date) {
    return undefined;
  }

  try {
    return new Date(date);
  } catch (e) {
    return undefined;
  }
};
