export const isDefined = <T>(
  val: T | null | undefined,
): val is NonNullable<T> => val !== null && val !== undefined;

export const isNumber = (value: any): value is number =>
  isDefined(value) && typeof value === "number" && Number.isFinite(value);
