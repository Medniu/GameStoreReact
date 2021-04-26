import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./redux/reducers";
import App from "./api/components/App";

const store = createStore(reducers, compose(applyMiddleware(reduxThunk), composeWithDevTools()));

function Main() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

ReactDom.render(<Main />, document.getElementById("app"));
