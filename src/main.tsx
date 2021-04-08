import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./api/components/App";

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
