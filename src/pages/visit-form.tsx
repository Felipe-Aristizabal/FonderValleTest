import { useParams } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"          
import { zodResolver } from "@hookform/resolvers/zod"
import type { VisitValues } from "@/lib/form-schema"
import { visitSchema } from "@/lib/form-schema"

import { Button } from "@/components/ui/button"
import CreditEvaluation from "@/containers/credit-evaluation"
import FinancialDiagnosis from "@/containers/financial-diagnosis"
import CommercialDiagnosis from "@/containers/commercial-diagnosis"
import VisitEvidence from "@/containers/visit-evidence"


export default function VisitForm() {
  const { id } = useParams<{ id: string; visitaNumero: string }>()

  const form = useForm<VisitValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
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
  })

  function onSubmit(values: VisitValues) {
    const raw = localStorage.getItem("evaluationFormData") ?? "[]"
    let arr: any[]
    try {
      arr = JSON.parse(raw)
    } catch {
      arr = []
    }
    console.log("Evaluaciones en localStorage:", arr)

    const idx = arr.findIndex((e) => e.id === id)
    console.log(`Buscando evaluación con id=${id} → índice en array:`, idx)

    if (idx === -1) {
      alert("No se encontró la evaluación con ese ID")
      return
    }

    const visitasAnteriores = Array.isArray(arr[idx].visits) ? arr[idx].visits.length : 0
    console.log("Número de visitas antes de añadir:", visitasAnteriores)

    arr[idx].visits = arr[idx].visits ?? []
    arr[idx].visits.push(values)

    localStorage.setItem("evaluationFormData", JSON.stringify(arr))
    alert(`Visita agregada. Ahora tiene ${visitasAnteriores + 1} visitas.`)
  }

  return (
    <FormProvider {...form}>
      <form   onSubmit={form.handleSubmit(
                onSubmit,
                (errors) => {
                  console.log("Validation errors:", errors);
                }
              )} 
          className="max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-center">Agregar Visita</h2>

        <CreditEvaluation isExpanded onToggle={() => {}} />
        <FinancialDiagnosis isExpanded onToggle={() => {}} />
        <CommercialDiagnosis isExpanded onToggle={() => {}} />
         <VisitEvidence isExpanded onToggle={() => {}} />

        <div className="text-right">
          <Button type="submit">Guardar Visita</Button>
        </div>
      </form>
    </FormProvider>
  )
}
