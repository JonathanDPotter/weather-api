import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
// utils
import { Provider } from "react-redux";
import { store } from "./store";
import { saveState } from "./store/localStorage";
// components
import Router from "./Router";
// styles
import "./index.scss";

// saves redux state to local storage
store.subscribe(() => saveState(store.getState()));

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
