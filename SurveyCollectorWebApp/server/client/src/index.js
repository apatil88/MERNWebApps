//Data Layer - Primary location for booting up Redux side of our application
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

import "materialize-css/dist/css/materialize.min.css";

import App from "./components/App";

//For Testing purposes only
//import axios from "axios";
//window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
