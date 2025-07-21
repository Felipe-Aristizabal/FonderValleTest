import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoInfi from "../assets/Icons/LogoInfiValle.png";
import LogoGobValle from "../assets/Icons/Gobernacion.png";
import { UserDropdown } from "@/components/user-dropdown";
import { LogoutDialog } from "@/components/logout-dialog";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutRequest = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    logout();
    navigate("/ingreso");
  };

  const handleHelp = () => {
    alert("Abriendo ayuda...");
  };

  const handleProfile = () => {
    navigate("/perfil");
  };

  const handleSettings = () => {
    navigate("/configuracion");
  };

  const handleDialogClose = () => {
    setShowLogoutDialog(false);
  };

  const isLoginPage = location.pathname === "/ingreso";

  return (
    <header className="h-full w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <img
          src={LogoInfi}
          alt="Logo Infivalle"
          className="object-contain h-10 sm:h-12 md:h-14 w-auto"
        />
        <img
          src={LogoGobValle}
          alt="Logo Gobernación"
          className="object-contain h-10 sm:h-12 md:h-14 w-auto"
        />
        <span className="ml-2 text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-800 truncate hidden lg:inline">
          Fondervalle
        </span>
      </div>

      {!isLoginPage && user && (
        <UserDropdown
          onHelp={handleHelp}
          onProfile={handleProfile}
          onSettings={handleSettings}
          onLogout={handleLogoutRequest}
          showEmail={false}
          showRole={true}
          className="ml-auto"
        />
      )}

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onCancel={handleDialogClose}
        onConfirm={handleLogoutConfirm}
      />
    </header>
  );
}
