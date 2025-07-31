import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBeneficiary } from "@/contexts/BeneficiaryContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { useUserId } from "@/contexts/UserContext";

import type { VisitValues } from "@/lib/schemas/visit-schema";
import { visitSchema } from "@/lib/schemas/visit-schema";

import { Button } from "@/components/ui/button";
import CreditEvaluation from "@/containers/credit-evaluation";
import FinancialDiagnosis from "@/containers/financial-diagnosis";
import CommercialDiagnosis from "@/containers/commercial-diagnosis";
import VisitEvidence from "@/containers/visit-evidence";

import { SmsVerificationDialog } from "@/components/sms-verification-dialog";

import { useVisits } from "@/hooks/use-visits";
import axios from "@/lib/axios";

export default function BeneficiariesVisitsForm() {
  const navigate = useNavigate();
  // const { id: urlId } = useParams();
  const { beneficiaryId } = useBeneficiary();
  const idasesor = useUserId();

  // const [setDialogOpen] = useState(false);
  const [smsDialogOpen, setSmsDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    creditEval: true,
    financial: false,
    commercial: false,
    evidenceVisit: false,
  });
  const { createVisit } = useVisits(
    beneficiaryId ? Number(beneficiaryId) : undefined
  );

  const defaultVisit: VisitValues = {
    date: new Date(),
    creditUsedAsApproved: "",
    creditUsageDescription: "",
    improvements: [],
    otherImprovement: "",
    timeToResults: "",
    resultsAsExpected: "",
    resultsExplanation: "",
    financialRecords: "",
    evidenceFile: [],
    resourceManager: "",
    otherResourceManager: "",
    paymentsOnSchedule: "",
    paymentExplanation: "",
    satisfaction: "",
    needAnotherCredit: "",
    creditINTendedUse: "",

    monthlyIncome: "",
    fixedCosts: "",
    variableCosts: "",
    debtLevel: "",
    creditUsedPercentage: "",
    monthlyPayment: "",
    emergencyReserve: "",

    monthlyClients: "",
    monthlySales: "",
    totalSalesValue: "",
    currentEmployees: "",
    saleschannels: [],
    otherSalesChannel: "",

    fileevidenceFile: [],
    observaciones: "",
    estado: "Activo",
    beneficiario: beneficiaryId ? Number(beneficiaryId) : 0,
    idasesor: 0,
  };

  const visitForm = useForm<VisitValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: defaultVisit,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function findFirstErrorField(
    errors: FieldErrors<any>,
    path: string[] = []
  ): string | null {
    for (const key in errors) {
      const error = errors[key];
      const currentPath = [...path, key];

      if (error?.types || error?.message) {
        return currentPath.join(".");
      }

      if (typeof error === "object") {
        const deep = findFirstErrorField(
          error as FieldErrors<any>,
          currentPath
        );
        if (deep) return deep;
      }
    }
    return null;
  }

  const onError = (errors: FieldErrors<VisitValues>) => {
    const firstErrorKey = findFirstErrorField(errors);

    if (firstErrorKey) {
      const domId = `${firstErrorKey.replace(/\./g, "-")}-field`;
      const errorElement = document.getElementById(domId);

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = errorElement.querySelector(
          "input, select, textarea, button"
        );
        if (input) {
          (input as HTMLElement).focus();
        }
      }
    }
    // Expandir sección correspondiente
    setExpandedSections((prev) => ({
      ...prev,
      creditEval:
        prev.creditEval ||
        !!(
          errors.date ||
          errors.creditUsedAsApproved ||
          errors.creditUsageDescription ||
          errors.improvements
        ),
      financial:
        prev.financial ||
        !!(
          errors.monthlyIncome ||
          errors.fixedCosts ||
          errors.variableCosts ||
          errors.debtLevel ||
          errors.monthlyPayment ||
          errors.emergencyReserve ||
          errors.financialRecords
        ),
      commercial:
        prev.commercial ||
        !!(
          errors.monthlyClients ||
          errors.monthlySales ||
          errors.totalSalesValue ||
          errors.currentEmployees ||
          errors.saleschannels
        ),
      evidenceVisit: prev.evidenceVisit || !!errors.fileevidenceFile,
    }));
  };

  const onValidSubmit = async () => {
    try {
      const id = Number(beneficiaryId);
      console.log("Enviando SMS a beneficiario con ID:", id);

      await axios.post("/advices/send-sms-advice", {
        idbeneficiario: id,
      });

      setSmsDialogOpen(true);
    } catch (err) {
      console.error("Error enviando SMS:", err);
      alert("❌ No se pudo enviar el SMS.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <FormProvider {...visitForm}>
        <form
          onSubmit={visitForm.handleSubmit(onValidSubmit, onError)}
          className="space-y-8"
        >
          <div className="space-y-6 border-t pt-6 mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Información de la Asesoría
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete los datos financieros y comerciales de la asesoría.
            </p>

            <CreditEvaluation
              isExpanded={expandedSections.creditEval}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  creditEval: !prev.creditEval,
                }))
              }
            />

            <FinancialDiagnosis
              isExpanded={expandedSections.financial}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  financial: !prev.financial,
                }))
              }
            />

            <CommercialDiagnosis
              isExpanded={expandedSections.commercial}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  commercial: !prev.commercial,
                }))
              }
            />

            <VisitEvidence
              isExpanded={expandedSections.evidenceVisit}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  evidenceVisit: !prev.evidenceVisit,
                }))
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(`/beneficiario-detalles/${beneficiaryId}`)
              }
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button type="submit" className="submit-button w-full sm:w-auto">
              Guardar Asesoría
            </Button>
          </div>
        </form>
      </FormProvider>

      <SmsVerificationDialog
        open={smsDialogOpen}
        onOpenChange={setSmsDialogOpen}
        idbeneficiario={Number(beneficiaryId)}
        onSuccess={async () => {
          try {
            const values = visitForm.getValues();
            const fixedValues = {
              ...values,
              idbeneficiario: Number(beneficiaryId),
              idasesor: Number(idasesor),
            };
            await createVisit(fixedValues);
            visitForm.reset();
          } catch (err) {
            console.error("Error al guardar la visita", err);
            alert("❌ Ocurrió un error al guardar la visita.");
          }
        }}
      />
    </div>
  );
}
