export type StringKey<T, K = keyof T> = K extends string ? K : never;
