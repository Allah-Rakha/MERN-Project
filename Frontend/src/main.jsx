import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {SnackbarProvider} from 'notistack'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);
