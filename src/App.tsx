import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useMarketsService } from "./markets/hooks/useMarketsService";

function App() {
  const markets = useMarketsService();
  console.log("cryptocurrency list: ", markets);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
