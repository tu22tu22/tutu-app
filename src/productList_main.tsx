import React from "react";
import ReactDOM from "react-dom/client";
import ProductList from "./productList.tsx";

ReactDOM.createRoot(document.getElementById("productList")!).render(
  <React.StrictMode>
    <ProductList />
  </React.StrictMode>
);
