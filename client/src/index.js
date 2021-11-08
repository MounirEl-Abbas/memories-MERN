import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/css/main.css";
import AppContextProvider from "./global/AppContext";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
