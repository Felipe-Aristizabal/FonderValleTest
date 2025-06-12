import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBeneficiary } from "@/contexts/BeneficiaryContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import type { VisitValues } from "@/lib/form-schema";
import { visitSchema } from "@/lib/form-schema";

import { Button } from "@/components/ui/button";
import CreditEvaluation from "@/containers/credit-evaluation";
import FinancialDiagnosis from "@/containers/financial-diagnosis";
import CommercialDiagnosis from "@/containers/commercial-diagnosis";
import VisitEvidence from "@/containers/visit-evidence";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const STORAGE_KEY_VISITS = import.meta.env.VITE_STORAGE_KEY_BENEFICIARIES;

export default function BeneficiariesVisitsForm() {
  const navigate = useNavigate();
  const { id: urlId } = useParams();
  const { beneficiaryId } = useBeneficiary();

  if (urlId !== beneficiaryId) {
    return (
      <p className="text-red-600">
        No puedes registrar visitas para otro beneficiario desde esta vista.
      </p>
    );
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    creditEval: true,
    financial: false,
    commercial: false,
    evidenceVisit: false,
  });

  const defaultVisit: VisitValues = {
    // === Basic Fields ===
    date: new Date(),
    creditUsedAsApproved: "",
    creditUsageDescription: "",
    improvements: [],
    otherImprovement: "",
    timeToResults: "",
    resultsAsExpected: "",
    resultsExplanation: "",
    financialRecords: "",
    creditEvidenceFiles: [],
    resourceManager: "",
    otherResourceManager: "",
    paymentsOnSchedule: "",
    paymentExplanation: "",
    satisfaction: "",
    needAnotherCredit: "",
    creditIntendedUse: "",

    // === Financial Diagnosis ===
    monthlyIncome: "",
    fixedCosts: "",
    variableCosts: "",
    debtLevel: "",
    creditUsedPercentage: "",
    monthlyPayment: "",
    emergencyReserve: "",

    // === Commercial Diagnosis ===
    monthlyClients: "",
    monthlySales: "",
    totalSalesValue: "",
    currentEmployees: "",
    salesChannels: [],
    otherSalesChannel: "",

    // === Visit Evidence ===
    evidenceVisitFile: [],
  };

  const visitForm = useForm<VisitValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: defaultVisit,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  async function submitVisit() {
    const isValid = await visitForm.trigger();
    if (!isValid) {
      const e = visitForm.formState.errors;
      setExpandedSections((prev) => ({
        ...prev,
        creditEval: !!(e.creditUsedAsApproved || e.creditUsageDescription),
        financial: !!e.financialRecords,
        commercial: !!e.monthlySales,
        evidenceVisit: !!e.evidenceVisitFile,
      }));
      return;
    }

    const visit = { id: uuidv4(), ...visitForm.getValues() };
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY_VISITS) ?? "[]");
    const updated = prev.map((b: any) => {
      if (b.id === beneficiaryId) {
        const visits = Array.isArray(b.visits) ? b.visits : [];
        return { ...b, visits: [...visits, visit] };
      }
      return b;
    });

    localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(updated));
    visitForm.reset();
    setDialogOpen(true);
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <FormProvider {...visitForm}>
        <form className="space-y-8">
          <div className="space-y-6 border-t pt-6 mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Información de la Asesoría
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete los datos financieros y comerciales de la asesoria.
            </p>

            <CreditEvaluation
              isExpanded={expandedSections.creditEval}
              onToggle={() => toggleSection("creditEval")}
            />

            <FinancialDiagnosis
              isExpanded={expandedSections.financial}
              onToggle={() => toggleSection("financial")}
            />

            <CommercialDiagnosis
              isExpanded={expandedSections.commercial}
              onToggle={() => toggleSection("commercial")}
            />

            <VisitEvidence
              isExpanded={expandedSections.evidenceVisit}
              onToggle={() => toggleSection("evidenceVisit")}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={submitVisit}
              className="submit-button w-full sm:w-auto"
            >
              Guardar Asesoría
            </Button>
          </div>
        </form>
      </FormProvider>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Visita guardada</AlertDialogTitle>
            <AlertDialogDescription>
              La asesoría se ha guardado correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => navigate(`/beneficiario-detalles/${urlId}`)}
            >
              Ir al detalle del beneficiario
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
