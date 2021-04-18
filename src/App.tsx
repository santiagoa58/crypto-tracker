import React from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import "./App.css";
import { NavigationHeader } from "./components/header/NavigationHeader";
import { theme } from "./theme/theme";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { CryptoAssetContextProvider } from "./components/context/CryptoAssetContext";
import { MarketOverview } from "./components/overview/MarketOverview";
import { PriceAction } from "./components/price-action/PriceAction";

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
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <NavigationHeader />
          <main>
            <CryptoAssetContextProvider>
              <Switch>
                <Route path="/" exact={true}>
                  <MarketOverview />
                </Route>
                <Route path="/price-action">
                  <PriceAction />
                </Route>
              </Switch>
            </CryptoAssetContextProvider>
          </main>
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
