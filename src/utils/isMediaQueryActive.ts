import { theme } from "../theme/theme";
import { getNumericScreenSize, MediaQueryMatch } from "./hooks/useMediaQueries";
import { isDefined } from "./isDefined";

const tabletSize = getNumericScreenSize(theme.screenSizes.tablet)!;

const isLessThan = (val1: number, val2: number) => val1 < val2;

/**
 * determines if the (max-width: targetSize) media query is active
 * @param targetSize desired max-width; default is 768px
 * @returns
 *   true if screenSize is targetSize or smaller and
 *   false if screenSize is targetSize or larger
 */
export const isMediaQueryActive = (
  mediaQueryMatch: MediaQueryMatch,
  targetSize = tabletSize,
) => {
  if (isDefined(mediaQueryMatch.numericScreenSize)) {
    const isActive =
      mediaQueryMatch.numericScreenSize === targetSize
        ? mediaQueryMatch.matches
        : isLessThan(mediaQueryMatch.numericScreenSize, targetSize);
    return isActive;
  }
  return false;
};
