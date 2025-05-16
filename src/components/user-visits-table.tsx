import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { formatDate, formatMoney } from "@/lib/utils"

interface Visit {
  date: string
  creditUsedAsApproved?: string
  creditUsageDescription?: string
  improvements?: string[]
  otherImprovement?: string
  timeToResults?: string
  resultsAsExpected?: string
  resultsExplanation?: string
  financialRecords?: string
  resourceManager?: string
  otherResourceManager?: string
  paymentsOnSchedule?: string
  paymentExplanation?: string
  satisfaction?: string
  needAnotherCredit?: string
  creditIntendedUse?: string
  monthlyIncome?: string
  fixedCosts?: string
  variableCosts?: string
  debtLevel?: string
  creditUsedPercentage?: string
  monthlyPayment?: string
  emergencyReserve?: string
  monthlyClients?: string
  monthlySales?: string
  totalSalesValue?: string
  averageSalePrice?: string
  currentEmployees?: string
  salesChannels?: string[]
  otherSalesChannel?: string
}

interface UserVisitsTableProps {
  userId: string
  visits: Visit[]
}

export function UserVisitsTable({ userId, visits }: UserVisitsTableProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Visitas de seguimiento</h3>

      {visits.length === 0 ? (
        <p className="text-muted-foreground">No hay visitas registradas.</p>
      ) : (
        visits.map((visit, idx) => (
          <details
            key={idx}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white open:bg-blue-50 transition-all group"
          >
            <summary className="cursor-pointer flex items-center justify-between text-gray-900 font-semibold text-base sm:text-lg hover:text-gray-600 transition group-open:text-gray-800 group">
              <span>Visita #{idx + 1} — {formatDate(visit.date)}</span>
              <svg className="w-5 h-5 text-blue-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"  >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <div className="mt-3 divide-y divide-gray-200 space-y-4 text-sm text-gray-700">

              {/* Evaluación del Crédito */}
              <div className="pt-2">
                <h4 className="text-base font-semibold text-blue-900 border-b pb-1">
                  Evaluación del Crédito
                </h4>
                <div><strong>Uso del crédito:</strong> {visit.creditUsedAsApproved || "—"}</div>
                <div><strong>Descripción del uso:</strong> {visit.creditUsageDescription || "—"}</div>
                <div>
                  <strong>Mejoras:</strong>
                  {visit.improvements?.length ? (
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {visit.improvements.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : " —"}
                </div>
                {visit.otherImprovement && <div><strong>Otra mejora:</strong> {visit.otherImprovement}</div>}
                <div><strong>Tiempo para resultados:</strong> {visit.timeToResults || "—"}</div>
                <div><strong>Resultados esperados:</strong> {visit.resultsAsExpected || "—"}</div>
                {visit.resultsExplanation && <div><strong>Explicación:</strong> {visit.resultsExplanation}</div>}
                <div><strong>Registros financieros:</strong> {visit.financialRecords || "—"}</div>
                <div><strong>Administrador del crédito:</strong> {visit.resourceManager || "—"}</div>
                {visit.otherResourceManager && <div><strong>Otro administrador:</strong> {visit.otherResourceManager}</div>}
                <div><strong>Pagos al día:</strong> {visit.paymentsOnSchedule || "—"}</div>
                {visit.paymentExplanation && <div><strong>Explicación de pagos:</strong> {visit.paymentExplanation}</div>}
                <div><strong>Satisfacción:</strong> {visit.satisfaction || "—"}</div>
                <div><strong>¿Necesita otro crédito?:</strong> {visit.needAnotherCredit || "—"}</div>
                {visit.creditIntendedUse && <div><strong>Uso previsto:</strong> {visit.creditIntendedUse}</div>}
              </div>

              {/* Diagnóstico Financiero */}
              <div className="pt-2">
                <h4 className="text-base font-semibold text-blue-900 border-b pb-1">
                  Diagnóstico Financiero
                </h4>
                <div><strong>Ingresos mensuales:</strong> {formatMoney(visit.monthlyIncome)}</div>
                <div><strong>Costos fijos:</strong> {formatMoney(visit.fixedCosts)}</div>
                <div><strong>Costos variables:</strong> {formatMoney(visit.variableCosts)}</div>
                <div><strong>Nivel de endeudamiento:</strong> {visit.debtLevel || "—"}%</div>
                <div><strong>% crédito utilizado:</strong> {visit.creditUsedPercentage || "—"}%</div>
                <div><strong>Pago mensual del crédito:</strong> {formatMoney(visit.monthlyPayment)}</div>
                <div><strong>Reserva para imprevistos:</strong> {formatMoney(visit.emergencyReserve)}</div>
              </div>

              {/* Diagnóstico Comercial */}
              <div className="pt-2">
                <h4 className="text-base font-semibold text-blue-900 border-b pb-1">
                  Diagnóstico Comercial
                </h4>
                <div><strong>Clientes mensuales:</strong> {visit.monthlyClients || "—"}</div>
                <div><strong>Ventas mensuales:</strong> {visit.monthlySales || "—"}</div>
                <div><strong>Valor total ventas:</strong> {formatMoney(visit.totalSalesValue)}</div>
                <div><strong>Precio promedio:</strong> {formatMoney(visit.averageSalePrice)}</div>
                <div><strong>Empleados actuales:</strong> {visit.currentEmployees || "—"}</div>
                <div>
                  <strong>Canales de venta:</strong>
                  {visit.salesChannels?.length ? (
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {visit.salesChannels.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : " —"}
                </div>
                {visit.otherSalesChannel && <div><strong>Otro canal:</strong> {visit.otherSalesChannel}</div>}
              </div>

            </div>
          </details>
        ))
      )}

      <Button
        onClick={() => navigate(`/evaluaciones/${userId}/visitas/${visits.length + 1}`)}
        className="text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Agregar visita
      </Button>
    </div>
  )
}
