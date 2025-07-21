import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { BeneficiaryProvider } from "@/contexts/BeneficiaryContext";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { UserProvider } from "@/contexts/UserContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <BeneficiaryProvider>
          <App />
        </BeneficiaryProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
