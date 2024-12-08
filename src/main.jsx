import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import "./i18n.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

export const auth_server = "http://localhost:3000";
export const feedback_server = "http://localhost:3001";

const container = document.getElementById("root");

// Check if root is already created to prevent duplicate calls.
if (!window._root) {
  window._root = createRoot(container);
}

window._root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
