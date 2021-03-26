import React, { PropsWithChildren } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import styled from "styled-components/macro";

export interface ColumnDefinition extends ColDef {
  colId: string;
}

interface GridProps<T> {
  data: T[];
  columns: ColumnDefinition[];
}

const GridWrapper = styled.div`
  height: 100%;
`;

export const Grid = <T extends Record<string, any>>(
  props: PropsWithChildren<GridProps<T>>,
) => {
  return (
    <GridWrapper className="ag-theme-alpine-dark">
      <AgGridReact rowData={props.data}>
        {props.columns.map((colDef) => (
          <AgGridColumn key={colDef.colId} {...colDef} />
        ))}
      </AgGridReact>
    </GridWrapper>
  );
};
