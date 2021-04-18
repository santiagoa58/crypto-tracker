import { RowNode, RowClickedEvent } from "ag-grid-community";

export type StringKey<T, K = keyof T> = K extends string ? K : never;

export interface GridRowNode<Data = any> extends RowNode {
  data: Data;
}
export interface GridRowClickedEvent<Data = any, Context = any>
  extends RowClickedEvent {
  context: Context;
  data: Data;
  node: GridRowNode<Data>;
}
