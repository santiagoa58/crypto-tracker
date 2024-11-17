import { isDefined } from "./isDefined";

export const typedObjectEntries = <
  T extends Record<string, any>,
  K extends keyof T
>(
  obj: T
) => Object.entries(obj) as Array<[K, T[K]]>;

export const removeUndefinedEntries = <T extends Record<string, any>>(
  obj: T
): Required<T> => {
  const validEntries = Object.entries(obj).filter(([key, value]) =>
    isDefined(value)
  );

  return Object.fromEntries(validEntries) as Required<T>;
};
