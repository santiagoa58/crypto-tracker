import styled, { css } from "styled-components/macro";
import "ag-grid-community/dist/styles/ag-grid.css";

export const textEllipsisStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const GridWrapper = styled.div`
  height: 100%;

  .ag-root-wrapper {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.fontOnBackground};
  }

  .ag-right-aligned-cell {
    text-align: right;
  }

  .ag-left-aligned-cell {
    text-align: left;
  }

  //HEADER
  .ag-header {
    border-bottom: solid 1px ${({ theme }) => theme.colors.backgroundLight};
  }

  .ag-header-row {
    font-weight: 700;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.backgroundLightMuted};
  }

  .ag-header-cell,
  .ag-cell {
    padding-left: 1rem;
    padding-right: 1rem;

    &:focus {
      border: solid 1px ${({ theme }) => theme.colors.focus};
    }
  }

  .ag-header-cell {
    &-resize {
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        content: "";
        width: 2px;
        height: 50%;
        background-color: ${({ theme }) => theme.colors.border};
      }
    }
  }

  //ROW
  .ag-row {
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  //CELL
  .ag-cell {
    line-height: 40px; //Default row height used to center text vertically
  }

  //ICONS
  .ag-icon,
  .ag-header-icon {
    .material-icons {
      font-size: ${({ theme }) => theme.fontSize.body};
    }
  }
`;
