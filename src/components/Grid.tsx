import React, { PropsWithChildren } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { ColDef, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import styled from "styled-components/macro";
import { defaultColDefs } from "../utils/columnDefinitions";

export interface ColumnDefinition extends ColDef {
  colId: string;
}

interface GridProps<T> extends GridOptions {
  rowData: T[];
  columnDefs: ColumnDefinition[];
}

const GridWrapper = styled.div`
  height: 100%;
`;

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
