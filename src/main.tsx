// src/main.tsx
import "./shared/lib/i18n";
import AppRoutes from "@/app/AppRoutes";
import ReactDOM from "react-dom/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppRoutes />
);