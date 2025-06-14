import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./containers/layout";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import { UsersPage } from "./pages/users-page";
import EvaluationForm from "@/pages/evaluation-form";
import VisitForm from "@/pages/beneficiaries-visits-form";
import NotFound from "./pages/not-found";
import { BeneficiariesPage } from "./pages/beneficiaries-page";
import ReportsPage from "./pages/reports-page";
import EvaluationBeneficiariesForm from "./pages/beneficiaries-form";
import BeneficiariesInformation from "@/pages/beneficiaries-information";
import SettingsPage from "./pages/settings-page";
import UserCreatePage from "./pages/user-create";

function App() {
  useEffect(() => {
    const STORAGE_KEY_BENEFICIARIES = import.meta.env
      .VITE_STORAGE_KEY_BENEFICIARIES;

    const STORAGE_KEY_USERS = import.meta.env.VITE_STORAGE_KEY_USERS;

    const loadInitialData = async () => {
      try {
        // localStorage.removeItem(STORAGE_KEY_BENEFICIARIES);
        // localStorage.removeItem(STORAGE_KEY_USERS);
        // console.log("Datos previos eliminados");

        const resBeneficiaries = await fetch(
          "/example_beneficiaries_data_negative.json"
        );
        const dataBeneficiaries = await resBeneficiaries.json();
        localStorage.setItem(
          STORAGE_KEY_BENEFICIARIES,
          JSON.stringify(dataBeneficiaries)
        );
        const resUsers = await fetch("/example_users_data_negative.json");
        const dataUsers = await resUsers.json();
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(dataUsers));

        console.log(
          "Datos precargados en localStorage. Beneficiarios y Usuarios"
        );
      } catch (error) {
        console.error("Error cargando los datos iniciales:", error);
      }
    };

    loadInitialData();
  }, []);

  return (
    <Routes>
      <Route path="/ingreso" element={<LoginPage />} />
      <Route index element={<Navigate to="/ingreso" replace />} />

      <Route path="/" element={<Layout />}>
        <Route path="inicio" element={<HomePage />} />
        <Route path="beneficiarios" element={<BeneficiariesPage />} />
        <Route
          path="nuevo-beneficiario"
          element={<EvaluationBeneficiariesForm />}
        />
        <Route
          path="beneficiario-detalles/:id"
          element={<BeneficiariesInformation />}
        />
        <Route path="/nuevo-usuario" element={<UserCreatePage />} />

        <Route path="usuarios" element={<UsersPage />} />
        <Route path="formulario" element={<EvaluationForm />} />
        <Route path="configuracion" element={<SettingsPage />} />
        <Route path="reportes" element={<ReportsPage />} />
        <Route path="asesorias/:id/:visitaNumero" element={<VisitForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
