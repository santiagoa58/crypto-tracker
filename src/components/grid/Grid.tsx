import React, { PropsWithChildren } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { ColDef, GridOptions } from "ag-grid-community";
import { defaultColDefs } from "../../utils/columnDefinitions";
import { GridWrapper } from "./styled";

export interface ColumnDefinition extends ColDef {
  colId: string;
}

interface GridProps<T> extends GridOptions {
  rowData: T[] | undefined;
  columnDefs: ColumnDefinition[];
}

export const Grid = <T extends Record<string, any>>({
  columnDefs,
  children,
  ...props
}: PropsWithChildren<GridProps<T>>) => {
  return (
    <GridWrapper className="ag-theme-alpine-dark">
      <AgGridReact
        suppressDragLeaveHidesColumns={true}
        immutableData={true}
        defaultColDef={defaultColDefs}
        {...props}
      >
        {columnDefs.map((colDef) => (
          <AgGridColumn key={colDef.colId} {...colDef} />
        ))}
      </AgGridReact>
    </GridWrapper>
  );
};
