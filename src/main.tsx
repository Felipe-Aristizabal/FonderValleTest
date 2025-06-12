import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { BeneficiaryProvider } from "@/contexts/BeneficiaryContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <BeneficiaryProvider>
      <App />
    </BeneficiaryProvider>
  </BrowserRouter>
);
