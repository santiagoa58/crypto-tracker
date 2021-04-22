import styled from "styled-components/macro";
import { Colors } from "../../theme/theme";

export const PercentChange = styled.span<{ color?: Colors }>`
  color: ${({ theme, color }) => color && theme.colors[color]};
  font-size: ${({ theme }) => theme.fontSize.body};
  padding-left: ${({ theme }) => theme.fontSize.bodyXSmall};
  white-space: nowrap;
`;

const BasePlaceHolder = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.backgroundLightMuted};
`;
export const PlaceHolder = styled(BasePlaceHolder)<{
  size?: string;
  borderRadius?: string;
}>`
  height: ${({ size = "2rem" }) => size};
  width: ${({ size = "2rem" }) => size};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
`;

export const TextPlaceHolder = styled(BasePlaceHolder)<{
  width?: string;
  height?: string;
}>`
  height: ${({ height = "1rem" }) => height};
  width: ${({ width = "5rem" }) => width};
`;
