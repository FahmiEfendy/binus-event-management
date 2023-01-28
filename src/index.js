import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import "./index.css";
import App from "./App";
import { api } from "./api/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <Router>
        <App />
      </Router>
    </ApiProvider>
  </React.StrictMode>
);
