import { isNumber } from "./isDefined";

export const getSafeNumber = (value: any): number | undefined => {
  const number = parseFloat(`${value}`);
  if (isNumber(number)) {
    return number;
  }

  return undefined;
};
