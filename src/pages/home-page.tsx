import { ChartGeneralGroup } from "@/containers/chartGeneralGroup";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY_BENEFICIARIES;

export default function HomePage() {
  return (
    <div className="w-full px-2 py-4 ">
      <div className="text-center mb-2">
        <h3 className="text-2xl text-center font-medium text-gray-800 mb-6">
          Gráficas financieras y crediticias
        </h3>
      </div>
      <div className="w-full  py-6 px-2 flex justify-center">
        <ChartGeneralGroup storageKey={STORAGE_KEY} />
      </div>
    </div>
  );
}
