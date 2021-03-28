//https://www.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=37474F&secondary.color=efb90b

export interface Theme {
  colors: {
    background: string;
    backgroundMuted: string;
    backgroundLight: string;
    backgroundLightMuted: string;
    backgroundDark: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    fontOnBackground: string;
    fontOnBackgroundLight: string;
    fontOnBackgroundDark: string;
    fontOnPrimary: string;
    fontOnPrimaryLight: string;
    fontOnPrimaryDark: string;
    focus: string;
    border: string;
    red: string;
    green: string;
  };

  borderRadius: string;
  opacityMuted: number;
  opacityDisabled: number;
  boxShadow: string;
  fontSize: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    body: string;
    bodySmall: string;
    bodyXSmall: string;
  };
}

export const theme: Theme = {
  colors: {
    background: "#212121",
    backgroundLight: "#484848",
    backgroundDark: "#121212",
    backgroundMuted: "rgba(33,33,33,0.3)",
    backgroundLightMuted: "rgba(72,72,72, 0.3)",
    fontOnBackground: "rgba(238,238,238)",
    fontOnBackgroundLight: "rgba(238,238,238)",
    fontOnBackgroundDark: "rgba(238,238,238)",
    fontOnPrimary: "rgba(255,255,255)",
    fontOnPrimaryLight: "rgb(0,0,0)",
    fontOnPrimaryDark: "rgb(255,255,255)",
    primary: "#f0b90b",
    primaryLight: "#ffeb50",
    primaryDark: "#b98900",
    secondary: "#37474f",
    secondaryLight: "#62717b",
    secondaryDark: "#101f27",
    focus: "#80bdff",
    border: "#5c5c5d",
    red: "#f75a6e",
    green: "#73e1b6",
  },
  borderRadius: "3px",
  opacityMuted: 0.7,
  opacityDisabled: 0.45,
  boxShadow: "rgba(0,0,0,0.12) 0px 3px 4px 0px",
  fontSize: {
    h1: "6rem",
    h2: "3.75rem",
    h3: "3rem",
    h4: "2.125rem",
    h5: "1.5rem",
    h6: "1.25rem",
    body: "1rem",
    bodySmall: "0.875rem",
    bodyXSmall: "0.75rem",
  },
};
