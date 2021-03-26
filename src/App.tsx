import React from "react";
import { ThemeProvider } from "styled-components/macro";
import "./App.css";
import { CryptoAssetsGrid } from "./components/crypto_assets/CryptoAssetsGrid";
import { NavigationHeader } from "./components/header/NavigationHeader";
import { theme } from "./theme/colors";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavigationHeader />
        <main>
          <CryptoAssetsGrid />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
