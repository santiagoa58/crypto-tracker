import React, { PropsWithChildren } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { ColDef, GridOptions } from "ag-grid-community";
import { defaultColDefs } from "../../utils/columnDefinitions";
import { GridWrapper } from "./styled";
import { NoRowsOverlay } from "./GridRowsOverlay";
import { StringKey } from "../../utils/types";

export interface ColumnDefinition<T extends Record<string, any>>
  extends ColDef {
  colId: string | StringKey<T>;
  field: StringKey<T>;
}

interface GridProps<T> extends GridOptions {
  rowData: T[] | undefined;
  columnDefs: ColumnDefinition<T>[];
  loading: boolean;
  error?: string;
}

export const Grid = <T extends Record<string, any>>({
  columnDefs,
  children,
  loading,
  error,
  ...props
}: PropsWithChildren<GridProps<T>>) => {
  return (
    <GridWrapper className="ag-theme-alpine-dark">
      <AgGridReact
        suppressDragLeaveHidesColumns={true}
        immutableData={true}
        defaultColDef={defaultColDefs}
        noRowsOverlayComponentFramework={NoRowsOverlay}
        noRowsOverlayComponentParams={{
          noRowsMessage: error ?? "No Rows To Show",
          isLoading: loading,
        }}
        {...props}
      >
        {columnDefs.map((colDef) => (
          <AgGridColumn key={colDef.colId} {...colDef} />
        ))}
      </AgGridReact>
    </GridWrapper>
  );
};
