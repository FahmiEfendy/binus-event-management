import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("index.js rendered");
root.render(
  <React.StrictMode>
    {/* <Router basename="/binus-event-management"> */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
