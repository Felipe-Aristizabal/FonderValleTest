import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import type { FormValues } from "@/lib/form-schema";
import { formSchema } from "@/lib/form-schema";

import { Button } from "@/components/ui/button";
import PersonalInformation from "@/containers/personal-information";
import CompanyInformation from "@/containers/company-information";
import CreditInformation from "@/containers/credit-information";
import EvaluatorObservations from "@/containers/evaluator-observations";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY_BENEFICIARIES;

export default function EvaluationBeneficiariesForm() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    company: false,
    credit: false,
    evaluator: false,
  });

  const defaultMain: FormValues = {
    // === Personal Information ===
    fullName: "",
    firstSurname: "",
    secondSurname: "",
    gender: "",
    dateOfBirth: new Date(),
    educationalProfile: "",
    ethnicity: "",
    nationalId: "",
    phoneNumber: "",

    // === Company Information ===
    companyName: "",
    nit: "",
    economicSector: "",
    mainSector: "",
    city: "",
    address: "",

    // === Credit Information ===
    approvedCreditValue: "",
    disbursementDate: new Date(),
    creditDestination: [],
    otherCreditDestination: "",

    // === Evaluator Observations ===
    evaluatorObservations: "",

    visits: [],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultMain,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  async function submitBeneficiaries() {
    const isValid = await form.trigger();
    if (!isValid) {
      const e = form.formState.errors;
      setExpandedSections((prev) => ({
        ...prev,
        personal: prev.personal || !!(e.fullName || e.firstSurname || e.gender),
        company: prev.company || !!(e.companyName || e.nit),
        credit: prev.credit || !!(e.approvedCreditValue || e.disbursementDate),
        evaluator: prev.evaluator || !!e.evaluatorObservations,
      }));
      return;
    }

    const entry = {
      id: uuidv4(),
      ...form.getValues(),
      appState: "Inactivo",
      role: "Beneficiario",
    };

    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    prev.push(entry);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    form.reset();
    setDialogOpen(true);
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <FormProvider {...form}>
        <form className="space-y-8">
          <div className="space-y-6 border-t pt-6 mt-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Información del Beneficiario
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete los datos básicos para identificar al beneficiario.
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

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={submitBeneficiaries}
              className="submit-button w-full sm:w-auto"
            >
              Guardar Beneficiario
            </Button>
          </div>
        </form>
      </FormProvider>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Guardado exitoso</AlertDialogTitle>
          <AlertDialogDescription>
            El beneficiario se ha guardado correctamente.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/beneficiarios")}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
