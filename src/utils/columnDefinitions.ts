import { ColDef } from "ag-grid-community";
import {
  formatIntegerPrice,
  formatPercent,
  formatPrice,
  formatQuantity,
} from "./formatters";
import { isDefined } from "./isDefined";
import { getSafeNumber, getSafeString } from "./safeGetters";

export const stringCompare = (valueA?: string, valueB?: string) => {
  return getSafeString(valueA).localeCompare(getSafeString(valueB), "en", {
    numeric: true,
  });
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
  minWidth: 60,
};

export const priceColDef: ColDef = {
  ...numericColDef,
  valueFormatter({ value }) {
    return formatPrice(value, 3);
  },
};

export const integerPriceColDef: ColDef = {
  ...priceColDef,
  valueFormatter({ value }) {
    return formatIntegerPrice(value);
  },
};

export const percentColDef: ColDef = {
  ...numericColDef,
  comparator: percentComparator,
  valueFormatter({ value }) {
    return formatPercent(value);
  },
  cellClassRules: {
    "negative-value ": (params: { value?: string }) =>
      (getSafeNumber(params.value) ?? 0) < 0,
    "positive-value ": (params: { value?: string }) =>
      (getSafeNumber(params.value) ?? 0) > 0,
  },
};

export const quantityColDef: ColDef = {
  ...numericColDef,
  valueFormatter({ value }) {
    return formatQuantity(value);
  },
};

export const defaultColDefs: ColDef = {
  resizable: false,
  floatingFilter: false,
  sortable: true,
  suppressMovable: true,
  icons: {
    sortAscending: '<span class="material-icons">arrow_upward</span>',
    sortDescending: '<span class="material-icons">arrow_downward</span>',
    first: '<span class="material-icons">first_page</span>',
    previous: '<span class="material-icons">arrow_back_ios</span>',
    next: '<span class="material-icons">arrow_forward_ios</span>',
    last: '<span class="material-icons">last_page</span>',
  },
};
