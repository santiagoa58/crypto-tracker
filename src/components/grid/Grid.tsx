import { ColDef, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { PropsWithChildren } from "react";
import { defaultColDefs } from "../../utils/columnDefinitions";
import { StringKey } from "../../utils/types";
import { NoRowsOverlay } from "./GridRowsOverlay";
import { GridWrapper } from "./styled";

export interface ColumnDefinition<T extends Record<string, any>>
  extends ColDef {
  colId: string | StringKey<T>;
  field: StringKey<T>;
}

interface GridProps<T extends Record<string, any>> extends GridOptions {
  rowData: T[] | undefined;
  columnDefs: ColumnDefinition<T>[];
  loading: boolean;
  error?: string;
}

export const Grid = <T extends Record<string, any>>({
  children,
  loading,
  error,
  ...props
}: PropsWithChildren<GridProps<T>>) => {
  return (
    <GridWrapper className="ag-theme-quartz-dark">
      <AgGridReact
        suppressDragLeaveHidesColumns={true}
        defaultColDef={defaultColDefs}
        noRowsOverlayComponent={NoRowsOverlay}
        noRowsOverlayComponentParams={{
          noRowsMessage: error ?? "No Rows To Show",
          isLoading: loading, 
        }}
        {...props}
      />
    </GridWrapper>
  );
};
