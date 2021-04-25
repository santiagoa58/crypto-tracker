import { useState, useCallback } from "react";
import { theme } from "../../theme/theme";
import { isDefined } from "../isDefined";
import { isMediaQueryActive } from "../isMediaQueryActive";
import {
  getNumericScreenSize,
  MediaQueryMatch,
  useMediaQueries,
} from "./useMediaQueries";

const tabletSize = getNumericScreenSize(theme.screenSizes.tablet)!;

export const useMediaQueryMatch = (targetSize = tabletSize) => {
  const [isActive, setIsActive] = useState(window.innerWidth < targetSize);

  const onMediaMatch = useCallback(
    (match: MediaQueryMatch) => {
      if (isDefined(match.numericScreenSize)) {
        setIsActive(isMediaQueryActive(match, targetSize));
      }
    },
    [targetSize],
  );

  useMediaQueries(onMediaMatch);

  return isActive;
};
