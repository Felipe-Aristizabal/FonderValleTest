import { UsersList } from "@/components/user-list"
import { ChartGeneralGroup } from "@/containers/chartGeneralGroup"

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY ?? "fallbackKey"

export default function HomePage() {
  // const raw = localStorage.getItem(STORAGE_KEY) ?? "[]"
  // const parsed = JSON.parse(raw)
  // console.log(parsed);
  // if (parsed.length === 0) {
  //   return(
  //     "no hay na"
  //   )
  // }
  return (
    <div className="w-full px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Bienvenido a la aplicación de evaluación financiera
        </h1>
        <p className="text-2xl text-gray-900">
          Consulta y gestiona los datos guardados de tus usuarios.
        </p>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Datos guardados</h2>
      <div className="flex flex-col lg:flex-row gap-6 items-start ">
        <UsersList storageKey={STORAGE_KEY} />
        <ChartGeneralGroup storageKey={STORAGE_KEY} />
      </div>
    </div>
  )
}
