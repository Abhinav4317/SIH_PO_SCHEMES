import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
export const auth_server = "http://localhost:3000";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
);
