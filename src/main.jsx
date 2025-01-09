import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import "./i18n.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { AdminProvider } from "./context/AdminContext.jsx";

export const auth_server = "sihpoauth-production.up.railway.app";
export const feedback_server = "sihpofeedback-production.up.railway.app";

const container = document.getElementById("root");

// Check if root is already created to prevent duplicate calls.
if (!window._root) {
  window._root = createRoot(container);
}

window._root.render(
  <AdminProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AdminProvider>
);
