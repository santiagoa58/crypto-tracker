import styled, { css } from "styled-components/macro";
import "ag-grid-community/dist/styles/ag-grid.css";

export const textEllipsisStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const GridWrapper = styled.div`
  height: 100%;

  //GLOBAL
  .ag-root-wrapper {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    color: ${({ theme }) => theme.colors.fontOnBackground};
  }

  .ag-right-aligned-cell {
    text-align: right;
  }

  .ag-left-aligned-cell {
    text-align: left;
  }

  .ag-body-viewport,
  .ag-body-horizontal-scroll-viewport {
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 0.75rem;
      background-color: rgba(0, 0, 0, 0.9);
    }

    &::-webkit-scrollbar {
      width: 0.875rem;
      height: auto;
      background-color: rgba(0, 0, 0, 0.9);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.75rem;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #484848;
    }
  }

  //HEADER
  .ag-header {
    border-bottom: solid 1px ${({ theme }) => theme.colors.backgroundLight};
    background-color: ${({ theme }) => theme.colors.backgroundLightMuted};
  }

  .ag-header-row {
    font-weight: 700;
    text-transform: uppercase;
  }

  .ag-header-cell,
  .ag-cell {
    padding-left: 1rem;
    padding-right: 1rem;

    &:focus {
      border: solid 1px ${({ theme }) => theme.colors.focus};
      outline: none;
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

    &.negative-value {
      color: ${({ theme }) => theme.colors.red};
    }
    &.positive-value {
      color: ${({ theme }) => theme.colors.green};
    }
  }

  //ICONS
  .ag-icon,
  .ag-header-icon {
    .material-icons {
      font-size: ${({ theme }) => theme.fontSize.body};
    }
  }
`;
