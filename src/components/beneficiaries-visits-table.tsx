import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { formatDate, formatMoney } from "@/lib/utils";
import type { VisitValues } from "@/lib/schemas/visit-schema";

export interface ExportItem {
  userId: string;
  campo: string;
  valor: string | number | boolean | null;
}

interface UserVisitsTableProps {
  userId: string;
  visits: VisitValues[];
}

export function BeneficiariesVisitsTable({
  userId,
  visits,
}: UserVisitsTableProps) {
  const navigate = useNavigate();

  if (visits.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Asesorías de seguimiento
        </h3>
        <p className="text-muted-foreground">No hay asesorías registradas.</p>
        <Button
          onClick={() => navigate(`/asesorias/${userId}/1`)}
          className="text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Agregar primera asesoría
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {visits.map((visit, idx) => (
          <AccordionItem key={idx} value={`visit-${idx}`}>
            <AccordionTrigger className="flex justify-between items-center px-4 py-3 bg-gray-100 rounded-t-md hover:bg-gray-200">
              <span>
                Asesoría #{idx + 1} — {formatDate(visit.createdAt ?? "")}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-4 border border-t-0 rounded-b-md bg-white space-y-6 text-sm text-gray-700">
              {/* Evaluación del Crédito */}
              <div className="rounded-md border border-gray-200 p-4 bg-gray-50">
                <h4 className="font-semibold text-lg text-blue-900 mb-4">
                  Evaluación del Crédito
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                  <div>
                    <strong>Uso del crédito:</strong>{" "}
                    {visit.creditUsedAsApproved ?? "—"}
                  </div>
                  <div>
                    <strong>Descripción del uso:</strong>{" "}
                    {visit.creditUsageDescription ?? "—"}
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <strong>Mejoras:</strong>
                    {visit.improvements?.length ? (
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {visit.improvements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      " —"
                    )}
                  </div>
                  {visit.otherImprovement && (
                    <div>
                      <strong>Otra mejora:</strong> {visit.otherImprovement}
                    </div>
                  )}
                  <div>
                    <strong>Tiempo para resultados:</strong>{" "}
                    {visit.timeToResults ?? "—"}
                  </div>
                  <div>
                    <strong>Resultados esperados:</strong>{" "}
                    {visit.resultsAsExpected ?? "—"}
                  </div>
                  {visit.resultsExplanation && (
                    <div className="md:col-span-2">
                      <strong>Explicación:</strong> {visit.resultsExplanation}
                    </div>
                  )}
                  <div>
                    <strong>Registros financieros:</strong>{" "}
                    {visit.financialRecords ?? "—"}
                  </div>
                  <div>
                    <strong>Administrador del crédito:</strong>{" "}
                    {visit.resourceManager ?? "—"}
                  </div>
                  {visit.otherResourceManager && (
                    <div>
                      <strong>Otro administrador:</strong>{" "}
                      {visit.otherResourceManager}
                    </div>
                  )}
                  <div>
                    <strong>Pagos al día:</strong>{" "}
                    {visit.paymentsOnSchedule ?? "—"}
                  </div>
                  {visit.paymentExplanation && (
                    <div>
                      <strong>Explicación de pagos:</strong>{" "}
                      {visit.paymentExplanation}
                    </div>
                  )}
                  <div>
                    <strong>Satisfacción:</strong> {visit.satisfaction ?? "—"}
                  </div>
                  <div>
                    <strong>¿Necesita otro crédito?:</strong>{" "}
                    {visit.needAnotherCredit ?? "—"}
                  </div>
                  {visit.creditINTendedUse && (
                    <div>
                      <strong>Uso previsto:</strong> {visit.creditINTendedUse}
                    </div>
                  )}
                </div>
              </div>

              {/* Diagnóstico Financiero */}
              <div className="rounded-md border border-gray-200 p-4 bg-gray-50">
                <h4 className="font-semibold text-lg text-blue-900 mb-4">
                  Diagnóstico Financiero
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                  <div>
                    <strong>Ingresos mensuales:</strong>{" "}
                    {visit.monthlyIncome
                      ? formatMoney(visit.monthlyIncome)
                      : "—"}
                  </div>
                  <div>
                    <strong>Costos fijos:</strong>{" "}
                    {visit.fixedCosts ? formatMoney(visit.fixedCosts) : "—"}
                  </div>
                  <div>
                    <strong>Costos variables:</strong>{" "}
                    {visit.variableCosts
                      ? formatMoney(visit.variableCosts)
                      : "—"}
                  </div>
                  <div>
                    <strong>Nivel de endeudamiento:</strong>{" "}
                    {visit.debtLevel ?? "—"}%
                  </div>
                  <div>
                    <strong>% crédito utilizado:</strong>{" "}
                    {visit.creditUsedPercentage ?? "—"}%
                  </div>
                  <div>
                    <strong>Pago mensual del crédito:</strong>{" "}
                    {visit.monthlyPayment
                      ? formatMoney(visit.monthlyPayment)
                      : "—"}
                  </div>
                  <div>
                    <strong>Reserva para imprevistos:</strong>{" "}
                    {visit.emergencyReserve
                      ? formatMoney(visit.emergencyReserve)
                      : "—"}
                  </div>
                </div>
              </div>

              {/* Diagnóstico Comercial */}
              <div className="rounded-md border border-gray-200 p-4 bg-gray-50">
                <h4 className="font-semibold text-lg text-blue-900 mb-4">
                  Diagnóstico Comercial
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                  <div>
                    <strong>Clientes mensuales:</strong>{" "}
                    {visit.monthlyClients ?? "—"}
                  </div>
                  <div>
                    <strong>Ventas mensuales:</strong>{" "}
                    {visit.monthlySales ?? "—"}
                  </div>
                  <div>
                    <strong>Valor total ventas:</strong>{" "}
                    {visit.totalSalesValue
                      ? formatMoney(visit.totalSalesValue)
                      : "—"}
                  </div>
                  <div>
                    <strong>Empleados actuales:</strong>{" "}
                    {visit.currentEmployees ?? "—"}
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <strong>Canales de venta:</strong>
                    {visit.saleschannels?.length ? (
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {visit.saleschannels.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      " —"
                    )}
                  </div>
                  {visit.otherSalesChannel && (
                    <div>
                      <strong>Otro canal:</strong> {visit.otherSalesChannel}
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        onClick={() => navigate(`/asesorias/${userId}/${visits.length + 1}`)}
        className="mt-4 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Agregar asesoría
      </Button>
    </div>
  );
}
