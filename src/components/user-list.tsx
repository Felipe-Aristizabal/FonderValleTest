import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "@/lib/utils";

export type FormValues = Record<string, any>;

export function UsersList({
  storageKey = "fallbackKey",
}: {
  storageKey?: string;
}) {
  const [users, setUsers] = useState<FormValues[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey) ?? "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setUsers(parsed);
      else if (parsed && typeof parsed === "object") setUsers([parsed]);
      else setUsers([]);
    } catch {
      setUsers([]);
    }
  }, [storageKey]);

  if (users.length === 0) {
    return (
      <div className="w-full  min-w-20 max-w-4xl mx-auto rounded-xl shadow-lg p-6 space-y-6 border border-gray-800 bg-white">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">
            Usuarios Guardados
          </h2>
          <p className="text-gray-600 text-base">No hay datos guardados:</p>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    const rows = users.map((user) => {
      const flat: Record<string, any> = {};
      Object.entries(user).forEach(([key, val]) => {
        if (key === "visits") return;
        flat[key] = typeof val === "object" ? JSON.stringify(val) : val;
      });
      (user.visits ?? []).forEach((vis: any, idx: number) => {
        Object.entries(vis).forEach(([k, v]) => {
          flat[`visits[${idx}].${k}`] = v;
        });
      });
      return flat;
    });

    exportToExcel([{ name: "Usuarios", rows }], "usuarios_guardados");
  };
  return (
    <div className="w-full  min-w-20 max-w-4xl mx-auto rounded-xl shadow-lg p-6 space-y-6 border border-gray-800">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">Usuarios Guardados</h2>
        <p className="text-gray-600 text-base">
          Selecciona un usuario para ver su información detallada:
        </p>
      </div>

      {/* Lista con altura máxima y scroll si se excede */}
      <ul className="space-y-4 overflow-y-auto pr-2 max-h-[780px]">
        {users.map((u, idx) => {
          const visits = u.visits ?? [];
          const maxVisits = 4;

          return (
            <li key={idx}>
              <button
                onClick={() => navigate(`/detalles/${u.id}`)}
                className={`flex flex-col sm:flex-row sm:justify-between items-start sm:items-center w-full 
                text-left px-5 py-4 rounded-lg border border-gray-800
                ${visits.length > 0 ? "bg-blue-50" : "bg-white"} 
                shadow-sm hover:shadow-md transition-all text-gray-800 font-medium`}
              >
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <span className="text-2xl text-purple-800">👤</span>
                  <div className="flex flex-col items-start">
                    <span className="truncate">
                      {u.fullName || `Usuario ${idx + 1}`}{" "}
                      {u.firstSurname || `Apellido ${idx + 1}`}
                    </span>
                    <span className="truncate">
                      C.C. {u.nationalId || `Cedula ${idx + 1}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-gray-800">
                    Visitas:
                  </span>
                  {[...Array(maxVisits)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center border-2 rounded-md text-sm
                      ${
                        i < visits.length
                          ? "border-gray-800 text-gray-800 bg-white"
                          : "border-gray-800 text-gray-400 bg-white"
                      }`}
                    >
                      {i < visits.length ? "✔️" : ""}
                    </span>
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="pt-2">
        <button
          onClick={handleExport}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          📥 Exportar lista a Excel
        </button>
      </div>
    </div>
  );
}
