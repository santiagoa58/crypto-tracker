import { ColDef } from "ag-grid-community";
import { formatPercent, formatPrice } from "./formatters";

const numericColDef: ColDef = {
  type: "numericColumn",
};

export const priceColDef: ColDef = {
  ...numericColDef,
  valueFormatter({ value }) {
    return formatPrice(value) || "-";
  },
};

export const percentColDef: ColDef = {
  ...numericColDef,
  valueFormatter({ value }) {
    return formatPercent(value) || "-";
  },
};
