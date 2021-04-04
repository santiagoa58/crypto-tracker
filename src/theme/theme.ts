//https://www.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=37474F&secondary.color=efb90b

export const theme = {
  colors: {
    background: "#212121" as "#212121",
    backgroundLight: "#484848" as "#484848",
    backgroundDark: "#121212" as "#121212",
    backgroundMuted: "rgba(33,33,33,0.3)" as "rgba(33,33,33,0.3)",
    backgroundLightMuted: "rgba(72,72,72, 0.3)" as "rgba(72,72,72, 0.3)",
    fontOnBackground: "rgba(238,238,238)" as "rgba(238,238,238)",
    fontOnBackgroundLight: "rgba(238,238,238)" as "rgba(238,238,238)",
    fontOnBackgroundDark: "rgba(238,238,238)" as "rgba(238,238,238)",
    fontOnPrimary: "rgba(255,255,255)" as "rgba(255,255,255)",
    fontOnPrimaryLight: "rgb(0,0,0)" as "rgb(0,0,0)",
    fontOnPrimaryDark: "rgb(255,255,255)" as "rgb(255,255,255)",
    primary: "#f0b90b" as "#f0b90b",
    primaryLight: "#ffeb50" as "#ffeb50",
    primaryDark: "#b98900" as "#b98900",
    secondary: "#37474f" as "#37474f",
    secondaryLight: "#62717b" as "#62717b",
    secondaryDark: "#101f27" as "#101f27",
    focus: "#80bdff" as "#80bdff",
    border: "#5c5c5d" as "#5c5c5d",
    red: "#f75a6e" as "#f75a6e",
    green: "#73e1b6" as "#73e1b6",
  },
  borderRadius: "3px" as "3px",
  opacityMuted: 0.7,
  opacityDisabled: 0.45,
  boxShadow: "rgba(0,0,0,0.12) 0px 3px 4px 0px" as "rgba(0,0,0,0.12) 0px 3px 4px 0px",
  fontSize: {
    h1: "6rem" as "6rem",
    h2: "3.75rem" as "3.75rem",
    h3: "3rem" as "3rem",
    h4: "2.125rem" as "2.125rem",
    h5: "1.5rem" as "1.5rem",
    h6: "1.25rem" as "1.25rem",
    body: "1rem" as "1rem",
    bodySmall: "0.875rem" as "0.875rem",
    bodyXSmall: "0.75rem" as "0.75rem",
  },
  screenSizes: {
    mobileS: "320px" as "320px",
    mobileM: "375px" as "375px",
    mobileL: "425px" as "425px",
    tablet: "768px" as "768px",
    laptop: "1024px" as "1024px",
    laptopL: "1440px" as "1440px",
    desktop: "2560px" as "2560px",
  },
};

export type Theme = typeof theme;
export type Colors = keyof Theme["colors"];
