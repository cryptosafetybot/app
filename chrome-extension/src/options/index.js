import React from "react";
import ReactDOM from "react-dom";
import { BrowserTheme } from "../components/BrowserTheme";
import { Options } from "../components/Options/Options";
import "../index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserTheme>
      <Options />
    </BrowserTheme>
  </React.StrictMode>,
  document.getElementById("options")
);
