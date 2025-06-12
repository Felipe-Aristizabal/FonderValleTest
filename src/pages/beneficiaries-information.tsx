import { useRef, useState, useEffect } from "react";
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
import { ChartGroup } from "@/containers/chart-group";

import { Button } from "@/components/ui/button";
import { useBeneficiary } from "@/hooks/use-beneficiaries";

const sectionedFieldLabels: Record<string, Record<string, string>> = {
  "Información Personal": {
    fullName: "Nombre",
    firstSurname: "Primer Apellido",
    secondSurname: "Segundo Apellido",
    gender: "Género",
    dateOfBirth: "Fecha de Nacimiento",
    educationalProfile: "Nivel Educativo",
    ethnicity: "Étnia",
    nationalId: "Cédula",
    phoneNumber: "Teléfono / Celular",
  },
  "Información de la Empresa": {
    companyName: "Nombre de la Empresa",
    nit: "RUT",
    economicSector: "Nivel del Sector económico",
    mainSector: "Actividad económica",
    city: "Ciudad",
    address: "Dirección de la empresa",
  },
  "Información del Crédito": {
    approvedCreditValue: "Valor aprobado del crédito",
    disbursementDate: "Fecha de desembolso",
  },
  "Observaciones del Evaluador": {
    evaluatorObservations: "Observaciones del evaluador",
  },
};

export default function BeneficiariesInformation() {
  const { id } = useParams<{ id: string }>();
  const { updateField, validationError, setValidationError } =
    useBeneficiary(id);

  const [updatedValue, setUpdatedValue] = useState<string>("");
  const navigate = useNavigate();
  const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY_BENEFICIARIES;
  const detailRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const visits = Array.isArray(userData?.visits) ? userData.visits : [];
  const [exportData, setExportData] = useState<ExportItem[]>([]);
  const [activeSection, setActiveSection] = useState<
    "personal" | "empresa" | "credito" | "visitas"
  >("personal");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
      const arr = JSON.parse(raw);
      const found = Array.isArray(arr)
        ? arr.find((e: any) => e.id === id)
        : null;
      setUserData(found ?? null);
    } catch {
      setUserData(null);
    }
  }, [STORAGE_KEY, id]);

  useEffect(() => {
    if (!userData) return;
    const items: ExportItem[] = [];
    Object.entries(userData).forEach(([key, val]) => {
      if (key === "visits" || key === "id") return;
      items.push({ userId: id!, campo: key, valor: val as any });
    });
    visits.forEach((vis: any, idx: number) =>
      Object.entries(vis).forEach(([visitKey, visitVal]) => {
        items.push({
          userId: id!,
          campo: `visits[${idx}].${visitKey}`,
          valor: visitVal as any,
        });
      })
    );
    setExportData(items);
  }, [userData, visits, id]);

  const handleDownloadExcel = () => {
    if (!id) return alert("No hay ID del beneficiario");
    if (exportData.length === 0) return alert("Los datos aún no están listos");
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
    exportToExcel(
      [{ name: "DetalleBeneficiarios", rows }],
      `beneficiarios_${id}`
    );
  };

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

  const steps = [
    { id: "personal", label: "Información Personal" },
    { id: "empresa", label: "Información Empresarial" },
    { id: "credito", label: "Historial Crediticio" },
    { id: "visitas", label: "Asesorías / Seguimiento" },
  ];

  return (
    <div className="w-full px-4 sm:px-8 py-10 space-y-8 bg-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">
          Detalle de {userData.fullName}
        </h1>
        <Button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          📊 Descargar Excel
        </Button>
      </div>

      <BeneficiariesBreadcrumb
        sections={steps}
        activeId={activeSection}
        onStepClick={(id) => setActiveSection(id as any)}
      />

      <div
        className="bg-white rounded-xl shadow-md p-6 space-y-6"
        ref={detailRef}
      >
        {activeSection === "personal" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Información Personal
            </h2>
            <BeneficiariesDataTable
              sectionTitle=""
              fields={sectionedFieldLabels["Información Personal"]}
              userData={userData}
              showActions={true}
              onActionClick={(fieldKey) => {
                setUserData({ ...userData, [fieldKey]: updatedValue });
                updateField(fieldKey, updatedValue);
              }}
              editValue={updatedValue}
              setEditValue={setUpdatedValue}
            />
          </div>
        )}

        {activeSection === "empresa" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Información Empresarial
            </h2>
            <BeneficiariesDataTable
              sectionTitle={""}
              fields={sectionedFieldLabels["Información de la Empresa"]}
              userData={userData}
              showActions={true}
              onActionClick={(fieldKey) => {
                setUserData({ ...userData, [fieldKey]: updatedValue });
                updateField(fieldKey, updatedValue);
              }}
              editValue={updatedValue}
              setEditValue={setUpdatedValue}
            />
          </div>
        )}

        {activeSection === "credito" && (
          <div className="space-y-10">
            <h2 className="text-2xl font-semibold mb-4">
              Historial Crediticio
            </h2>
            <BeneficiariesDataTable
              sectionTitle={""}
              fields={sectionedFieldLabels["Información del Crédito"]}
              userData={userData}
              showActions={true}
              onActionClick={(fieldKey) => {
                setUserData({ ...userData, [fieldKey]: updatedValue });
                updateField(fieldKey, updatedValue);
              }}
              editValue={updatedValue}
              setEditValue={setUpdatedValue}
            />

            <h3 className="text-xl font-semibold mb-2">
              Observaciones del Evaluador
            </h3>
            <BeneficiariesDataTable
              sectionTitle={""}
              fields={sectionedFieldLabels["Observaciones del Evaluador"]}
              userData={userData}
              showActions={true}
              onActionClick={(fieldKey) => {
                setUserData({ ...userData, [fieldKey]: updatedValue });
                updateField(fieldKey, updatedValue);
              }}
              editValue={updatedValue}
              setEditValue={setUpdatedValue}
            />
          </div>
        )}

        {activeSection === "visitas" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Asesorías</h2>
            <BeneficiariesVisitsTable userId={id!} visits={visits} />
          </div>
        )}
      </div>

      {visits.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Gráficos de Diagnóstico
          </h2>
          <ChartGroup visits={visits} />
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
