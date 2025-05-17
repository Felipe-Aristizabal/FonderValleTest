import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { FormValues } from "@/lib/form-schema";
import { formSchema } from "@/lib/form-schema";
import type { VisitValues } from "@/lib/form-schema";
import { visitSchema } from "@/lib/form-schema";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import PersonalInformation from "@/containers/personal-information";
import CompanyInformation from "@/containers/company-information";
import CreditInformation from "@/containers/credit-information";
import EvaluatorObservations from "@/containers/evaluator-observations";
import CreditEvaluation from "@/containers/credit-evaluation";
import FinancialDiagnosis from "@/containers/financial-diagnosis";
import CommercialDiagnosis from "@/containers/commercial-diagnosis";
import VisitEvidence from "@/containers/visit-evidence";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY ?? "fallbackKey";

export default function EvaluationForm() {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    company: false,
    credit: false,
    evaluator: false,
    creditEval: false,
    financial: false,
    commercial: false,
    evidenceVisit: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      creditDestination: [],
      otherCreditDestination: "",
      visits: [
        {
          date: new Date(),

          creditUsedAsApproved: "",
          creditUsageDescription: "",
          improvements: [],
          otherImprovement: "",
          timeToResults: "",
          resultsAsExpected: "",
          resultsExplanation: "",
          evidenceFile: [],
          financialRecords: "",
          resourceManager: "",
          otherResourceManager: "",
          paymentsOnSchedule: "",
          paymentExplanation: "",
          satisfaction: "",
          needAnotherCredit: "",
          creditIntendedUse: "",

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
          salesChannels: [],
          otherSalesChannel: "",
          evidenceVisitFile: []
        },
      ],
    },
  });

  const visit0 = form.getValues("visits")[0];

  const visitForm = useForm<VisitValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: visit0,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  useEffect(() => {
    console.log("WATCH", form.watch());
  }, [form]);

  async function submitBoth() {
    const visitOk = await visitForm.trigger();
    form.setValue("visits.0", visitForm.getValues(), { shouldDirty: true });
    const mainOk = await form.trigger();
    if (!mainOk) {
      const e = form.formState.errors;
      setExpandedSections((prev) => ({
        ...prev,
        personal: !!(e.fullName || e.firstSurname || e.gender),
        company: !!(e.companyName || e.nit),
        credit: !!(e.approvedCreditValue || e.disbursementDate),
        evaluator: !!e.evaluatorObservations,
      }));
      return;
    }

    saveAll(form.getValues());
  }

  function saveAll(mainData: FormValues) {
    const entry = { id: uuidv4(), ...mainData };
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    prev.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    alert("✅ Evaluación guardada");
  }

  return (
    <div className="max-w-4xl mx-auto py-8 w-full">
      <FormProvider {...form}>
        <form className="space-y-8">
          <div className="space-y-6 border-t pt-6 mt-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Información relacionada con el usuario
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Datos básicos que permiten identificar y caracterizar al usuario.
            </p>

            <PersonalInformation
              form={form}
              isExpanded={expandedSections.personal}
              onToggle={() => toggleSection("personal")}
            />

            <CompanyInformation
              form={form}
              isExpanded={expandedSections.company}
              onToggle={() => toggleSection("company")}
            />

            <CreditInformation
              form={form}
              isExpanded={expandedSections.credit}
              onToggle={() => toggleSection("credit")}
            />

            <EvaluatorObservations
              form={form}
              isExpanded={expandedSections.evaluator}
              onToggle={() => toggleSection("evaluator")}
            />
          </div>

          <div className="space-y-6 border-t pt-6 mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Información relacionada con la visita
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Registro detallado de la evaluación financiera y comercial.
            </p>

            <FormProvider {...visitForm}>
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
            </FormProvider>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={submitBoth}
              className="submit-button w-full sm:w-auto"
            >
              Enviar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
