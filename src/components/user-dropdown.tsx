import { useState } from "react"
import { LogOut, HelpCircle, ChevronDown, Settings } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

interface UserData {
  name: string
  email?: string
  role?: string
  avatar?: string
}

interface UserDropdownProps {
  user: UserData
  onLogout: () => void
  onHelp?: () => void
  onProfile?: () => void
  onSettings?: () => void
  className?: string
  showEmail?: boolean
  showRole?: boolean
}

export function UserDropdown({
  user,
  onLogout,
  onHelp,
  onSettings,
  className = "",
  showEmail = false,
  showRole = true,
}: UserDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogoutClick = () => {
    setDropdownOpen(false)
    setTimeout(() => {
      onLogout()
    }, 100)
  }

  const handleMenuItemClick = (action?: () => void) => {
    if (action) {
      setDropdownOpen(false)
      setTimeout(() => {
        action()
      }, 100)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const firstName = user.name.split(" ")[0]
  const defaultAvatar = user.avatar || "https://avatars.githubusercontent.com/u/1?v=4"

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src={defaultAvatar}
              alt={`Avatar de ${user.name}`}
              className="h-9 w-9 rounded-full object-cover border-2 border-green-500 shadow-sm"
              onError={(e) => {
                // Fallback si la imagen no carga
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border-2 border-green-500 shadow-sm">
                      ${getInitials(user.name)}
                    </div>
                  `
                }
              }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* User Info */}
          <div className="hidden sm:flex flex-col items-start min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate max-w-32">
              Hola, {firstName}
            </span>
            {showRole && (
              <span className="text-xs text-gray-500 truncate max-w-32">
                {user.role || "Superuser"}
              </span>
            )}
            {showEmail && user.email && (
              <span className="text-xs text-gray-400 truncate max-w-32">
                {user.email}
              </span>
            )}
          </div>

          {/* Chevron Icon */}
          <ChevronDown 
            className={`h-4 w-4 text-gray-400 transition-transform hidden lg:inline duration-200 ${
              dropdownOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 mt-2">
        {/* User Header */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            {user.email && (
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            )}
            <p className="text-xs text-blue-600 font-medium">
              {user.role || "Superuser"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {/* Settings Option */}
        {onSettings && (
          <DropdownMenuItem 
            onClick={() => handleMenuItemClick(onSettings)}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
        )}

        {/* Help Option */}
        {onHelp && (
          <DropdownMenuItem 
            onClick={() => handleMenuItemClick(onHelp)}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Ayuda y soporte</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Logout Option */}
        <DropdownMenuItem
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}