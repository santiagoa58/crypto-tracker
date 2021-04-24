import styled from "styled-components/macro";
import { Colors } from "../../theme/theme";
import { GridContentWrapper } from "../ContentWrappers";
import { TextPlaceHolder } from "../placeholders/styled";

export const PercentChange = styled.span<{ color?: Colors }>`
  color: ${({ theme, color }) => color && theme.colors[color]};
  font-size: ${({ theme }) => theme.fontSize.body};
  padding-left: ${({ theme }) => theme.fontSize.bodyXSmall};
  white-space: nowrap;
`;

export const DetailsWrapper = styled(GridContentWrapper)`
  padding-top: 3rem;
  column-gap: 6rem;
  @media (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    width: 90%;
  }
  @media (max-width: ${({ theme }) => theme.screenSizes.mobileL}) {
    column-gap: 3rem;
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.screenSizes.mobileM}) {
    grid-template-columns: 1fr;
  }

  ${TextPlaceHolder} {
    justify-self: center;
  }
`;

export const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    flex-direction: column;
    align-items: unset;
  }
  @media (max-width: ${({ theme }) => theme.screenSizes.mobileM}) {
    align-items: center;
  }

  .value,
  .label {
    text-transform: capitalize;
  }
  .value {
    font-weight: bold;
    &--small {
      font-size: ${({ theme }) => theme.fontSize.bodyXSmall};
      opacity: ${({ theme }) => theme.opacityMuted};
    }
  }
  .label {
    opacity: ${({ theme }) => theme.opacityMuted};
  }
`;
