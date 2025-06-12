import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LogoutDialog } from "@/components/logout-dialog"
import { useNavigate } from "react-router-dom"

export default function Configuracion() {
  const navigate = useNavigate()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    setShowLogoutDialog(false)
    localStorage.removeItem("user")
    setTimeout(() => {
      navigate("/ingreso")
    }, 100)
  }

  const handleDialogClose = () => {
    setShowLogoutDialog(false)
  }

  return (
    <div className="w-full px-6 py-8 space-y-12">
      <h2 className="text-2xl font-semibold">Configuración de Usuario</h2>

      {/* Ajustes de la cuenta */}
      <section className="border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Ajustes de la Cuenta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Usuario</Label>
            <Input id="username" defaultValue="" placeholder="Nuevo nombre de usuario" />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" defaultValue="" type="email" placeholder="nuevo@email.com" />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" defaultValue=""  type="password" placeholder="********" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input id="confirmPassword" defaultValue="" type="password" placeholder="********" />
          </div>
        </div>
        <Button className="mt-6">Guardar Cambios</Button>
      </section>

      {/* Ajustes de sesión */}
      <section className="border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Ajustes de la Sesión</h3>
        <p className="text-sm text-gray-700">Aquí podrías incluir duración de sesión, tiempo de expiración, etc.</p>
      </section>

      {/* Cerrar sesión */}
      <section className="border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Cerrar Sesión</h3>
        <p className="text-sm text-gray-700 mb-4">Si deseas salir de tu cuenta, puedes cerrar sesión desde aquí.</p>
        <Button
          variant="destructive"
          onClick={() => setShowLogoutDialog(true)}
        >
          Cerrar Sesión
        </Button>
      </section>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
        onCancel={handleDialogClose}
      />
    </div>
  )
}
