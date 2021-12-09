import React from "react";
import ReactDOM from "react-dom";
import { AppTitle } from "./components/ui/AppTitle";
import { BrowserTheme } from "./components/BrowserTheme";
import { Options } from "./components/Options/Options";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserTheme>
      <AppTitle title="Crypto Safety App" />
      <Options />
    </BrowserTheme>
  </React.StrictMode>,
  document.getElementById("root")
);
