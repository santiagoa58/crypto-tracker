import { Map } from "immutable";

export const arrayToMap = <T, K extends keyof T>(
  array: T[],
  key: K,
): Map<T[K], T> => Map(array.map((val) => [val[key], val]));
