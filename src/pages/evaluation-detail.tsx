// src/pages/EvaluationDetail.tsx

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { exportToExcel } from "@/lib/utils";
import { UserDetails } from "@/components/user-details";
import type { ExportItem } from "@/components/user-details";

export default function EvaluationDetail() {
  const { id } = useParams<{ id: string }>();
  const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY ?? "fallbackKey";
  const detailRef = useRef<HTMLDivElement>(null);

  const [exportData, setExportData] = useState<ExportItem[]>([]);

  const handleDownloadExcel = () => {
    if (!id) {
      return alert("No hay ID de evaluación");
    }
    if (exportData.length === 0) {
      return alert("Los datos aún no están listos");
    }

    const grouped: Record<string, Record<string, any>> = {};
    exportData.forEach(({ userId, campo, valor }) => {
      if (!grouped[userId]) grouped[userId] = {};
      if (campo === "id") return;
      grouped[userId][campo] = valor;
    });

    const rows = Object.entries(grouped).map(([userId, record]) => ({
      userId,
      ...record,
    }));

    exportToExcel([{ name: "DetalleUsuarios", rows }], `evaluacion_${id}`);
  };

  return (
    <div className="w-full px-4 sm:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Detalle de Evaluación</h1>
      </div>

      {/* Download button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          📊 Descargar Excel
        </button>
      </div>

      {/* Detail container */}
      <div ref={detailRef} className="w-full bg-white rounded-xl shadow-md p-6">
        {id && (
          <UserDetails
            storageKey={STORAGE_KEY}
            userId={id}
            onExportData={setExportData}
          />
        )}
      </div>
    </div>
  );
}
