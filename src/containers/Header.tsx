import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import LogoInfi from "../assets/Icons/LogoInfiValle.png"
import LogoGobValle from "../assets/Icons/Gobernacion.png"
import { UserDropdown } from "@/components/user-dropdown"
import { LogoutDialog } from "@/components/logout-dialog"

interface User {
  name: string
  email?: string
  role?: string
  avatar?: string
}

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({
          name: parsedUser.name || "Usuario",
          email: parsedUser.email,
          role: parsedUser.role || "Superuser",
          avatar: parsedUser.avatar
        })
      } catch {
        setUser(null)
      }
    }
  }, [])

  const handleLogout = () => {
    setShowLogoutDialog(false)
    localStorage.removeItem("user")
    setTimeout(() => {
      navigate("/ingreso")
    }, 100)
  }

  const handleLogoutRequest = () => {
    setShowLogoutDialog(true)
  }

  const handleHelp = () => {
    alert("Abriendo ayuda...")
  }

  const handleProfile = () => {
    navigate("/perfil")
  }

  const handleSettings = () => {
    navigate("/configuracion")
  }

  const handleDialogClose = () => {
    setShowLogoutDialog(false)
  }

  const isLoginPage = location.pathname === "/ingreso"

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
          user={user}
          onLogout={handleLogoutRequest}
          onHelp={handleHelp}
          onProfile={handleProfile}
          onSettings={handleSettings}
          showEmail={false}
          showRole={true}
        />
      )}
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
        onCancel={handleDialogClose}
      />
    </header>
  )
}