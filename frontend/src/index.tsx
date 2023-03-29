import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <html lang="en">
    <head></head>
    <body className="dx-viewport">
      <App />
    </body>
  </html>,
  document.getElementById("root")
);

reportWebVitals();
