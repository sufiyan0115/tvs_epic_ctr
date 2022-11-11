import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer/>
    </AuthProvider>
  </BrowserRouter>
);
