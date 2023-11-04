import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter  basename="https://tu22tu22.github.io/tutu-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
