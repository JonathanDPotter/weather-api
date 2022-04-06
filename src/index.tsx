import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
// utils
import { Provider } from "react-redux";
import { store } from "./store";
// components
import Router from "./Router";
// styles
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Router />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
