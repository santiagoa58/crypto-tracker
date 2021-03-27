import { ColDef } from "ag-grid-community";
import {
  formatIntegerPrice,
  formatPercent,
  formatPrice,
  formatQuantity,
} from "./formatters";
import { isDefined } from "./isDefined";
import { getSafeNumber } from "./safeGetters";

export const stringCompare = (valueA: string, valueB: string) => {
  return valueA.localeCompare(valueB, "en", { numeric: true });
};

export const percentComparator = (valueA: any, valueB: any) => {
  const percentA = getSafeNumber(valueA);
  const percentB = getSafeNumber(valueB);

  if (!isDefined(percentA)) {
    return -1;
  }

  if (!isDefined(percentB)) {
    return 1;
  }

  return percentA - percentB;
};

export const numericColDef: ColDef = {
  type: "numericColumn",
  comparator: stringCompare,
};

export const priceColDef: ColDef = {
  ...numericColDef,
  valueFormatter({ value }) {
    return formatPrice(value) || "-";
  },
};

export const integerPriceColDef: ColDef = {
  ...priceColDef,
  valueFormatter({ value }) {
    return formatIntegerPrice(value) || "-";
  },
};

export const percentColDef: ColDef = {
  ...numericColDef,
  comparator: percentComparator,
  valueFormatter({ value }) {
    return formatPercent(value) || "-";
  },
};

export const quantityColDef: ColDef = {
  ...numericColDef,
  valueFormatter({ value }) {
    return formatQuantity(value) || "-";
  },
};

export const defaultColDefs: ColDef = {
  resizable: true,
  floatingFilter: false,
  sortable: true,
};
