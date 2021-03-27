//https://www.material.io/resources/color/#!/?view.left=1&view.right=0&primary.color=212121&secondary.color=1976D2&primary.text.color=EEEEEE&secondary.text.color=ffffff

export interface Theme {
  colors: {
    background: string;
    backgroundLight: string;
    backgroundDark: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    fontPrimary: string;
    fontPrimaryAlt: string;
  };

  borderRadius: string;
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
    backgroundDark: "#000000",
    fontPrimary: "#ededed",
    primary: "#1976d2",
    primaryLight: "#63a4ff",
    primaryDark: "#004ba0",
    fontPrimaryAlt: "#000000",
  },
  borderRadius: "0.5rem",
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
