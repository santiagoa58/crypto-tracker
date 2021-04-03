import React from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import "./App.css";
import { CryptoAssetsGrid } from "./components/crypto-assets/CryptoAssetsGrid";
import { NavigationHeader } from "./components/header/NavigationHeader";
import { theme } from "./theme/theme";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { CryptoAssetContextProvider } from "./components/context/CryptoAssetContext";

const AppWrapper = styled.div`
  max-width: ${({ theme }) => theme.screenSizes.desktop};
  min-width: ${({ theme }) => theme.screenSizes.mobileS};
  margin: 0 auto;
  height: 100%;
  overflow: auto;
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.fontOnBackground};

  main {
    padding: 1rem;
  }
`;

function App() {
  return (
    <Router>
      <CryptoAssetContextProvider>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <NavigationHeader />
            <main>
              <Switch>
                <Route path="/" exact={true}>
                  <CryptoAssetsGrid />
                </Route>
              </Switch>
            </main>
          </AppWrapper>
        </ThemeProvider>
      </CryptoAssetContextProvider>
    </Router>
  );
}

export default App;
