import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import {NextUIProvider} from '@nextui-org/react'

axios.defaults.baseURL = "http://localhost:5275/api";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
    <Router>
    <main className="dark text-foreground bg-background">
      <App />
      </main>
    </Router>
    </NextUIProvider>
  </React.StrictMode>
);
