import React from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import "./App.css";
import { CryptoAssetsGrid } from "./components/crypto-assets/CryptoAssetsGrid";
import { NavigationHeader } from "./components/header/NavigationHeader";
import { theme } from "./theme/theme";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { CryptoAssetContextProvider } from "./components/context/CryptoAssetContext";

const AppWrapper = styled.div`
  max-width: 1920px;
  min-width: 360px;
  margin: 0 auto;
  height: 100%;
  overflow: auto;
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.fontOnBackground};

  main {
    padding: 1rem 0;
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
