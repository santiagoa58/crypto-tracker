import { ColDef } from "ag-grid-community";
import {
  formatIntegerPrice,
  formatPercent,
  formatPrice,
  formatQuantity,
} from "./formatters";

const numericColDef: ColDef = {
  type: "numericColumn",
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
