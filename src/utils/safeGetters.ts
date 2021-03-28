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
