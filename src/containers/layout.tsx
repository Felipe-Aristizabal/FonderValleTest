import { Outlet, NavLink } from "react-router-dom"
import { Header } from "@/containers/Header"
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fijo con altura */}
      <header className="sticky top-0 z-50 h-20 bg-white shadow flex items-center px-4 sm:px-8">
        <Header />
      </header>

      {/* Navbar justo debajo */}
      <nav className="sticky top-20 z-40 bg-gray-800 text-white px-4 py-3 flex flex-wrap items-center gap-4 sm:gap-6">
        <NavLink to="/" end className={({ isActive }) => `px-3 py-2 text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 ${isActive ? "text-white underline underline-offset-4 decoration-2" : "text-gray-300 hover:text-white hover:underline underline-offset-4"}`}  >
          Inicio
        </NavLink>
        <NavLink to="/formulario" className={({ isActive }) => `px-3 py-2 text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 ${isActive ? "text-white underline underline-offset-4 decoration-2" : "text-gray-300 hover:text-white hover:underline underline-offset-4"}`} >
          Asesoramiento
        </NavLink>
      </nav>

      <main className="flex-1 w-full bg-blue-100 px-4 py-6 sm:px-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © 2025 FonderValle - Gobernación del Valle del Cauca
      </footer>
      <Toaster />
    </div>
  )
}

