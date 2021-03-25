export const isDefined = <T>(
  val: T | null | undefined,
): val is NonNullable<T> => val !== null && val !== undefined;
