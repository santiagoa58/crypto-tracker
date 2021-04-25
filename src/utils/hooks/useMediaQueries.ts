import { useEffect } from "react";
import { fromEventPattern, merge } from "rxjs";
import { NodeEventHandler } from "rxjs/internal/observable/fromEvent";
import { map } from "rxjs/operators";
import { theme, Theme } from "../../theme/theme";
import { getSafeNumber } from "../safeGetters";

export interface MediaQueryMatch {
  matches: boolean /*matches is false when expanding screen size */;
  matchingScreenSize?: ScreenSize;
  numericScreenSize?: number;
}

export const useMediaQueries = (
  onMediaQueryChange: (match: MediaQueryMatch) => void,
) => {
  useEffect(() => {
    const subscription = subscribeToMediaQueries$().subscribe(
      onMediaQueryChange,
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [onMediaQueryChange]);
};

//HELPERS

type ScreenSize = Theme["screenSizes"][keyof Theme["screenSizes"]];
const screenSizes: ScreenSize[] = Object.values(theme.screenSizes);

const subscribeToMediaQuery$ = (query: string) => {
  const mediaQuery = window.matchMedia(query);

  const addChangeMediaHandler = (handler: NodeEventHandler) => {
    mediaQuery.addEventListener("change", handler);
  };

  const removeChangeMediaHandler = (handler: NodeEventHandler) => {
    mediaQuery.removeEventListener("change", handler);
  };

  return fromEventPattern<MediaQueryListEvent>(
    addChangeMediaHandler,
    removeChangeMediaHandler,
  ).pipe<MediaQueryMatch>(
    map(({ matches, media }) => {
      const screenSize = getScreenSizeFromMediaQuery(media);
      return {
        matches,
        matchingScreenSize: screenSize,
        numericScreenSize: getNumericScreenSize(screenSize),
      };
    }),
  );
};

const subscribeToMediaQueries$ = () => {
  const mediaQueries$ = screenSizes.map((width) =>
    subscribeToMediaQuery$(`(max-width: ${width})`),
  );

  return merge(...mediaQueries$);
};

const getScreenSizeFromMediaQuery = (query: string): ScreenSize | undefined => {
  const screenSize = query.match(/\d+px/)?.[0];
  if (screenSize) {
    return screenSize as ScreenSize;
  }
};

export const getNumericScreenSize = (screenSize: ScreenSize | undefined) =>
  getSafeNumber(screenSize?.match(/\d+/)?.[0]);
