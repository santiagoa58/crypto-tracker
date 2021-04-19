import styled from "styled-components/macro";
import { BaseWrapper } from "../ContentWrappers";

export const MainChartWrapper = styled.div`
  color: ${({ theme }) => theme.colors.fontOnBackground};
  margin-top: 3rem;
`;

export const ToolTipWrapper = styled(BaseWrapper)`
  line-height: 1.5;
  background-color: ${({ theme }) =>
    `${theme.colors.secondaryDark}BB`}; //add opacity to background HEX color
  color: ${({ theme }) => theme.colors.fontOnBackground};
  padding: 1rem;

  span {
    display: block;
  }
  .tooltip {
    &__label {
      font-size: ${({ theme }) => theme.fontSize.bodyXSmall};
      opacity: ${({ theme }) => theme.opacityMuted};
    }
    &__value {
      font-weight: bold;
    }
  }
`;
