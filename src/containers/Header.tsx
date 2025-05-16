import LogoInfi from "../assets/Icons/LogoInfiValle.png"
import LogoGobValle from "../assets/Icons/Gobernacion.png"

export function Header() {
  return (
    <header className="h-full w-full flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3 w-full px-4 sm:px-6 lg:px-8">
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
        <span className="ml-2 text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-800 truncate">
          Fondervalle
        </span>
      </div>
    </header>
  )
}
