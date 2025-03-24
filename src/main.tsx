import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProviderWrapper } from "./context/auth.context"; 
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProviderWrapper> 
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderWrapper>
  </React.StrictMode>
);