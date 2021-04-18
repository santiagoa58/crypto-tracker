export const typedObjectEntries = <
  T extends Record<string, any>,
  K extends keyof T
>(
  obj: T,
) => Object.entries(obj) as Array<[K, T[K]]>;
