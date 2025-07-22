import { z } from "zod";
import { onlyNumbersField, evidenceFileField } from "./common-fields";

export const visitSchema = z.object({
  date: z.date({ required_error: "La fecha de la visita es obligatoria" }),
  creditUsedAsApproved: z.string().min(1, "Este campo es obligatorio"),
  creditUsageDescription: z.string({
    required_error: "Este campo es obligatorio",
  }),
  improvements: z.array(z.string()).min(1, "Este campo es obligatorio"),
  otherImprovement: z.string().optional(),
  timeToResults: z.string().min(1, "Este campo es obligatorio"),
  resultsAsExpected: z.string().min(1, "Este campo es obligatorio"),
  resultsExplanation: z.string().optional(),
  financialRecords: z.string().min(1, "Este campo es obligatorio"),
  evidenceFile: evidenceFileField,
  resourceManager: z.string().min(1, "Este campo es obligatorio"),
  otherResourceManager: z.string().optional(),
  paymentsOnSchedule: z.string().min(1, "Este campo es obligatorio"),
  paymentExplanation: z.string().optional(),
  satisfaction: z.string().min(1, "Este campo es obligatorio"),
  needAnotherCredit: z.string().min(1, "Este campo es obligatorio"),
  creditINTendedUse: z.string().optional(),

  // Diagnóstico financiero
  monthlyIncome: onlyNumbersField("Ingresos mensuales"),
  fixedCosts: onlyNumbersField("Costos fijos mensuales"),
  variableCosts: onlyNumbersField("Costos variables mensuales"),
  debtLevel: onlyNumbersField("Nivel de endeudamiento (%)"),
  creditUsedPercentage: onlyNumbersField("Monto del crédito usado (%)"),
  monthlyPayment: onlyNumbersField("Pago mensual del crédito"),
  emergencyReserve: onlyNumbersField("Reserva de emergencia"),

  // Diagnóstico comercial
  monthlyClients: onlyNumbersField("Clientes mensuales"),
  monthlySales: onlyNumbersField("Ventas mensuales"),
  totalSalesValue: onlyNumbersField("Valor total de ventas"),
  currentEmployees: z.string().min(1, "Este campo es obligatorio"),
  saleschannels: z.array(z.string()).min(1, "Este campo es obligatorio"),
  otherSalesChannel: z.string().optional(),

  // Evidencia
  fileevidenceFile: evidenceFileField,

  // Extra
  observaciones: z.string().optional(),
  estado: z.string().optional(),
  beneficiario: z.number(),
  idasesor: z.number(),

  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type VisitValues = z.infer<typeof visitSchema>;
