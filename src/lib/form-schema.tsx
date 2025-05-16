import { z } from "zod"

/**
 * Credit Evaluation Form schema.
 * Only optional fields are explicitly marked; the rest are required.
 */

// ONLY letters field
function onlyLettersField(fieldName = "Este campo") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .min(2, `${fieldName} debe tener al menos 2 caracteres`)
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
      message: `${fieldName} solo puede contener letras y espacios`,
    })
}

// ONLY numbers field
function onlyNumbersField(fieldName = "Este campo") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .min(1, `${fieldName} no puede estar vacío`)
    .regex(/^\d+$/, {
      message: `${fieldName} solo puede contener números`,
    })
}

function rutWithDvField(fieldName = "El NIT con dígito de verificación") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .regex(/^\d{5,10}-\d$/, {
      message: `${fieldName} debe tener el formato 123456789-0`,
    })
}

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/vnd.ms-excel",
  "application/msword",
]

const MAX_FILE_SIZE_MB = 5
const MAX_FILE_AMOUNT = 5

const evidenceFileField = z
  .array(z.instanceof(File))
  .max(MAX_FILE_AMOUNT, {
    message: `No puedes subir más de ${MAX_FILE_AMOUNT} archivos`,
  })
  .refine(
    (files) => files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
    {
      message: "Todos los archivos deben ser PDF, JPG, JPEG, PNG, XLS o DOC",
    }
  )
  .refine(
    (files) => files.every((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
    {
      message: `Cada archivo no debe exceder los ${MAX_FILE_SIZE_MB}MB`,
    }
  )
  .optional()

// === Visit Schema ===
export const visitSchema = z.object({
  date: z.date({ required_error: "La fecha de la visita es obligatoria" }),

  // Credit Evaluation
  creditUsedAsApproved: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  creditUsageDescription: z.string({ required_error: "Este campo es obligatorio" }),
  improvements: z
    .array(z.string(), { required_error: "Debes seleccionar al menos una mejora" })
    .min(1, { message: "Este campo es obligatorio" }),
  otherImprovement: z.string().optional(),
  timeToResults: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  resultsAsExpected: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  resultsExplanation: z.string().optional(),
  financialRecords: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  evidenceFile: evidenceFileField,
  resourceManager: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  otherResourceManager: z.string().optional(),
  paymentsOnSchedule: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  paymentExplanation: z.string().optional(),
  satisfaction: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  needAnotherCredit: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  creditIntendedUse: z.string().optional(),

  // Financial Diagnosis
  monthlyIncome: onlyNumbersField("Ingresos mensuales"),
  fixedCosts: onlyNumbersField("Costos fijos"),
  variableCosts: onlyNumbersField("Costos variables"),
  debtLevel: onlyNumbersField("Nivel de endeudamiento"),
  creditUsedPercentage: onlyNumbersField("Porcentaje del crédito usado"),
  monthlyPayment: onlyNumbersField("Pago mensual del crédito"),
  emergencyReserve: onlyNumbersField("Reserva para imprevistos"),

  // Commercial Diagnosis
  monthlyClients: onlyNumbersField("Clientes mensuales"),
  monthlySales: onlyNumbersField("Ventas mensuales"),
  totalSalesValue: onlyNumbersField("Valor total de ventas"),
  currentEmployees: z.string({ required_error: "Este campo es obligatorio" }).min(1, { message: "Este campo es obligatorio" }),
  salesChannels: z.array(z.string()).min(1, { message: "Este campo es obligatorio" }),
  otherSalesChannel: z.string().optional(),
  evidenceVisitFile: evidenceFileField
})

// === Main Form Schema ===
export const formSchema = z.object({
  //#region Personal Information
  fullName: onlyLettersField("El nombre completo"),
  firstSurname: onlyLettersField("El primer apellido"),
  secondSurname: onlyLettersField("El segundo apellido").optional(),
  gender: z.string({ required_error: "El género es obligatorio" }),
  dateOfBirth: z.date({ required_error: "La fecha de nacimiento es obligatoria" }),
  educationalProfile: z.string({ required_error: "El perfil educativo es obligatorio" }),
  ethnicity: z.string({ required_error: "La étnia es obligatoria" }),
  nationalId: onlyNumbersField("El Número de cédula"),
  phoneNumber: onlyNumbersField("Número de contacto"),
  //#endregion

  //#region Company Information
  companyName: z.string({ required_error: "El nombre de la empresa es obligatorio" }).min(2),
  nit: rutWithDvField("El Número de RUT"),
  economicSector: z.string({ required_error: "El sector económico es obligatorio" }),
  mainSector: z.string({ required_error: "El sector económico es obligatorio" }),
  city: onlyLettersField("La ciudad"),
  address: z.string({ required_error: "La dirección es obligatoria" }).min(2),
  //#endregion

  //#region Credit Information
  approvedCreditValue: onlyNumbersField("El valor del crédito"),
  disbursementDate: z.date({ required_error: "La fecha de desembolso es obligatoria" }),
  creditDestination: z
    .array(z.string(), { required_error: "Debes seleccionar al menos una mejora" })
    .min(1, { message: "Este campo es obligatorio" }),
  otherCreditDestination: z.string().optional(),
  //#endregion

  //#region Evaluator's Observations
  evaluatorObservations: z.string({ required_error: "Las observaciones del evaluador son obligatoria" }),
  //#endregion

  visits: z.array(visitSchema).min(1, { message: "Debe haber al menos una visita" }),
})

export type FormValues = z.infer<typeof formSchema> & { id?: string }
export type VisitValues = z.infer<typeof visitSchema>
