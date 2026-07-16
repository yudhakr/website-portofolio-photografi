import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContentProvider } from "./context/ContentContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";
import "./components/ProgressiveImage.css";

// Apply saved theme before paint to avoid flash.
const savedTheme = localStorage.getItem("lumen-theme");
document.documentElement.setAttribute(
  "data-theme",
  savedTheme === "light" ? "light" : "dark"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
