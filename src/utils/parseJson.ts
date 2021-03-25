import { isDefined } from "./isDefined";

export const jsonToString = (val: any): string | undefined => {
  if (!isDefined(val)) {
    return undefined;
  }

  try {
    return JSON.stringify(val);
  } catch (err) {
    return `${val}`;
  }
};
