import React from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import "./App.css";
import { CryptoAssetsGrid } from "./components/crypto_assets/CryptoAssetsGrid";
import { NavigationHeader } from "./components/header/NavigationHeader";
import { theme } from "./theme/theme";

const AppWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  background: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.fontOnBackground};

  main {
    padding: 1rem 0;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <NavigationHeader />
        <main>
          <CryptoAssetsGrid />
        </main>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
