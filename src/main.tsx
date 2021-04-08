import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import Header from "./api/components/Header";
import App from "./api/components/App";

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
