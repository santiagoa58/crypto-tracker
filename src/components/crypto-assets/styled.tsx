import styled from "styled-components/macro";
import { Colors } from "../../theme/theme";

export const PercentChange = styled.span<{ color?: Colors }>`
  color: ${({ theme, color }) => color && theme.colors[color]};
  font-size: ${({ theme }) => theme.fontSize.body};
  padding-left: ${({ theme }) => theme.fontSize.bodyXSmall};
  white-space: nowrap;
`;
