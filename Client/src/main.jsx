import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { NextUIProvider } from "@nextui-org/react";

axios.defaults.baseURL = "http://localhost:5275/api";



const Main = () => {
 

  return (
    <React.StrictMode>
      <NextUIProvider>
        <Router>
          
            <App />
          
        </Router>
      </NextUIProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);