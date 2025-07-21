import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { exportToExcel } from "@/lib/utils";
import type { ExportItem } from "@/components/beneficiaries-data-table";
import { BeneficiariesBreadcrumb } from "@/components/beneficiaries-breadcrumb";
import { BeneficiariesDataTable } from "@/components/beneficiaries-data-table";
import { BeneficiariesVisitsTable } from "@/components/beneficiaries-visits-table";
// import { ChartGroup } from "@/containers/chart-group";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useBeneficiary } from "@/hooks/use-beneficiaries";
import type { Section } from "@/components/beneficiaries-breadcrumb";
import { useVisits } from "@/hooks/use-visits";

const STEPS: Section[] = [
  { id: "personal", label: "Información Personal" },
  { id: "empresa", label: "Información Empresarial" },
  { id: "credito", label: "Historial Crediticio" },
  { id: "visitas", label: "Asesorías / Seguimiento" },
];

export default function BeneficiariesInformation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detailRef = useRef<HTMLDivElement>(null);

  const {
    userData,
    updateField,
    loading,
    validationError,
    setValidationError,
  } = useBeneficiary(id);

  const beneficiaryId = useMemo(() => Number(id), [id]);
  const { all: visits, loading: loadingVisits } = useVisits(beneficiaryId);
  const [exportData, setExportData] = useState<ExportItem[]>([]);
  const [activeSection, setActiveSection] = useState<
    "personal" | "empresa" | "credito" | "visitas"
  >("personal");

  // Memoizar labels de cada sección
  const sectionedFieldLabels = useMemo(
    () => ({
      "Información Personal": {
        primernombre: "Nombre",
        segundonombre: "Apellido",
        genero: "Género",
        fechaexpedicioncc: "Fecha de Nacimiento",
        edad: "Edad",
        etnias: "Etnia",
        numerodedocumento: "Cédula",
        celular: "Teléfono",
      },
      "Información Empresarial": {
        nombreempresa: "Empresa",
        nit: "RUT",
        actividadeconomica: "Actividad Económica",
        municipioempresa: "Municipio",
        residencia: "Dirección",
      },
      "Información del Crédito": {
        dinerosolicitado: "Valor aprobado",
        cuotas: "Cuotas",
        motivos: "Destino del crédito",
      },
      "Observaciones del Evaluador": {
        observaciones: "Observaciones",
      },
    }),
    []
  );

  // Efecto para preparar los datos de exportación
  useEffect(() => {
    if (!userData) return;
    const items: ExportItem[] = [];

    Object.entries(userData).forEach(([key, val]) => {
      if (key === "observaciones" || key === "idsolicitud") return;
      items.push({ userId: id!, campo: key, valor: val as any });
    });

    visits.forEach((vis, idx) => {
      Object.entries(vis).forEach(([k, v]) => {
        items.push({
          userId: id!,
          campo: `observaciones[${idx}].${k}`,
          valor: v as any,
        });
      });
    });

    setExportData(items);
  }, [userData, visits, id]);

  // Handler memoizado para descargar Excel
  const handleDownloadExcel = useCallback(() => {
    if (exportData.length === 0) {
      alert("Los datos aún no están listos para exportar.");
      return;
    }
    const grouped: Record<string, Record<string, any>> = {};
    exportData.forEach(({ userId, campo, valor }) => {
      grouped[userId] = grouped[userId] || {};
      grouped[userId][campo] = valor;
    });
    const rows = Object.entries(grouped).map(([userId, rec]) => ({
      userId,
      ...rec,
    }));
    exportToExcel(
      [{ name: "DetalleBeneficiario", rows }],
      `beneficiario_${id}`
    );
  }, [exportData, id]);

  // Handler memoizado para las acciones de edición
  const handleActionClick = useCallback(
    (field: string) => {
      const nuevo = prompt("Nuevo valor");
      if (nuevo != null) {
        updateField(field, nuevo);
      }
    },
    [updateField]
  );

  if (loading || loadingVisits) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <span className="mt-4 text-lg font-medium text-slate-700">
          Cargando beneficiario…
        </span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full px-4 sm:px-8 py-10">
        <p className="text-center py-4 text-red-500">
          Beneficiario no encontrado.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/beneficiarios")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            ← Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${userData.primernombre} ${userData.segundonombre}`;

  return (
    <div className="w-full px-4 sm:px-8 py-10 space-y-8 bg-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Detalle de {fullName}
        </h1>
        <Button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow"
        >
          📊 Descargar Excel
        </Button>
      </div>

      <BeneficiariesBreadcrumb
        sections={STEPS}
        activeId={activeSection}
        onStepClick={(step) => setActiveSection(step as any)}
      />

      <div
        className="bg-white rounded-xl shadow-md p-6 space-y-6"
        ref={detailRef}
      >
        {activeSection === "personal" && (
          <BeneficiariesDataTable
            sectionTitle="Información Personal"
            fields={sectionedFieldLabels["Información Personal"]}
            userData={userData}
            showActions
            onActionClick={handleActionClick}
            editValue=""
            setEditValue={() => {}}
          />
        )}

        {activeSection === "empresa" && (
          <BeneficiariesDataTable
            sectionTitle="Información Empresarial"
            fields={sectionedFieldLabels["Información Empresarial"]}
            userData={userData}
            showActions
            onActionClick={handleActionClick}
            editValue=""
            setEditValue={() => {}}
          />
        )}

        {activeSection === "credito" && (
          <>
            <BeneficiariesDataTable
              sectionTitle="Historial Crediticio"
              fields={sectionedFieldLabels["Información del Crédito"]}
              userData={userData}
              showActions
              onActionClick={handleActionClick}
              editValue=""
              setEditValue={() => {}}
            />
            <BeneficiariesDataTable
              sectionTitle="Observaciones del Evaluador"
              fields={sectionedFieldLabels["Observaciones del Evaluador"]}
              userData={userData}
              showActions
              onActionClick={handleActionClick}
              editValue=""
              setEditValue={() => {}}
            />
          </>
        )}

        {activeSection === "visitas" && (
          <BeneficiariesVisitsTable userId={id!} visits={visits} />
        )}
      </div>

      {visits.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Gráficos de Diagnóstico
          </h2>
          {/* <ChartGroup visits={visits} />  TODO: CHECK THIS WITH THE NEW VISIT SCHEMA*/}
        </div>
      )}

      <AlertDialog
        open={!!validationError}
        onOpenChange={() => setValidationError(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error de validación</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
