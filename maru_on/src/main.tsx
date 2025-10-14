// src/main.tsx
import { Provider } from "react-redux";
import { store } from "@/app/store";
import AppRoutes from "@/app/AppRoutes";
import MobileShell from "@/components/MobileShell";
import ReactDOM from "react-dom/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MobileShell allowInnerScroll>
      <AppRoutes />
    </MobileShell>
  </Provider>
);
