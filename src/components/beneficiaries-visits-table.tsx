import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { formatDate, formatMoney } from "@/lib/utils";

interface Visit {
  date: string;
  creditUsedAsApproved?: string;
  creditUsageDescription?: string;
  improvements?: string[];
  otherImprovement?: string;
  timeToResults?: string;
  resultsAsExpected?: string;
  resultsExplanation?: string;
  financialRecords?: string;
  resourceManager?: string;
  otherResourceManager?: string;
  paymentsOnSchedule?: string;
  paymentExplanation?: string;
  satisfaction?: string;
  needAnotherCredit?: string;
  creditIntendedUse?: string;
  monthlyIncome?: string;
  fixedCosts?: string;
  variableCosts?: string;
  debtLevel?: string;
  creditUsedPercentage?: string;
  monthlyPayment?: string;
  emergencyReserve?: string;
  monthlyClients?: string;
  monthlySales?: string;
  totalSalesValue?: string;
  currentEmployees?: string;
  salesChannels?: string[];
  otherSalesChannel?: string;
}

export interface ExportItem {
  userId: string;
  campo: string;
  valor: string | number | boolean | null;
}

interface UserVisitsTableProps {
  userId: string;
  visits: Visit[];
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
                Asesoría #{idx + 1} — {formatDate(visit.date)}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 border border-t-0 rounded-b-md bg-white">
              <div className="space-y-6 text-sm text-gray-700">
                {/* 1) Evaluación del Crédito */}
                <div>
                  <h4 className="font-semibold text-lg text-blue-900 mb-2">
                    Evaluación del Crédito
                  </h4>
                  <div className="space-y-1">
                    <div>
                      <strong>Uso del crédito:</strong>{" "}
                      {visit.creditUsedAsApproved ?? "—"}
                    </div>
                    <div>
                      <strong>Descripción del uso:</strong>{" "}
                      {visit.creditUsageDescription ?? "—"}
                    </div>
                    <div>
                      <strong>Mejoras:</strong>
                      {visit.improvements?.length ? (
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {visit.improvements.map((item: string, i: number) => (
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
                      <div>
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
                    {visit.creditIntendedUse && (
                      <div>
                        <strong>Uso previsto:</strong> {visit.creditIntendedUse}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-blue-900 mb-2">
                    Diagnóstico Financiero
                  </h4>
                  <div className="space-y-1">
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

                <div>
                  <h4 className="font-semibold text-lg text-blue-900 mb-2">
                    Diagnóstico Comercial
                  </h4>
                  <div className="space-y-1">
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
                    <div>
                      <strong>Canales de venta:</strong>
                      {visit.salesChannels?.length ? (
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {visit.salesChannels.map(
                            (item: string, i: number) => (
                              <li key={i}>{item}</li>
                            )
                          )}
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
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        onClick={() =>
          navigate(`/asesorias/${userId}/${visits.length + 1}`, {})
        }
        className="mt-4 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Agregar asesoría
      </Button>
    </div>
  );
}
