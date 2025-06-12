import { z } from "zod";

/* ========================================================================
 * Utility Functions
 * ======================================================================== */

/**
 * Creates a Zod schema that validates a string contains only letters (including accented characters) and spaces.
 * @param fieldName - The display name of the field for error messaging.
 * @returns Zod schema for a string of letters and spaces.
 */
function onlyLettersField(fieldName = "This field") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .min(2, `${fieldName} debe tener al menos 2 caracteres`)
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
      message: `${fieldName} solo puede contener letras y espacios`,
    });
}

/**
 * Creates a Zod schema that validates a string contains only numeric digits.
 * @param fieldName - The display name of the field for error messaging.
 * @returns Zod schema for a numeric string.
 */
function onlyNumbersField(fieldName = "This field") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .min(1, `${fieldName} no puede estar vacío`)
    .regex(/^\d+$/, {
      message: `${fieldName} solo puede contener números`,
    });
}

/**
 * Creates a Zod schema that validates a RUT (NIT with check digit) in the format '123456789-0'.
 * @param fieldName - The display name of the field for error messaging.
 * @returns Zod schema for a RUT string with verification digit.
 */
function rutWithDvField(fieldName = "NIT with verification digit") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .regex(/^\d{5,10}-\d$/, {
      message: `${fieldName} debe tener el formato 123456789-0`,
    });
}

/* ========================================================================
 * Constants for File Upload Validation
 * ======================================================================== */

/** List of accepted MIME types for uploaded files. */
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/vnd.ms-excel",
  "application/msword",
];

/** Maximum allowed file size per upload, in megabytes. */
const MAX_FILE_SIZE_MB = 5;

/** Maximum number of files allowed in a single upload. */
const MAX_FILE_AMOUNT = 5;

/**
 * Zod schema for validating an array of File objects:
 *  - Ensures no more than MAX_FILE_AMOUNT files.
 *  - Validates each file's MIME type against ACCEPTED_FILE_TYPES.
 *  - Validates each file's size does not exceed MAX_FILE_SIZE_MB.
 *  - Marks this field as optional.
 */
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
    (files) =>
      files.every((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
    {
      message: `Cada archivo no debe exceder los ${MAX_FILE_SIZE_MB}MB`,
    }
  )
  .optional();

export const userSchema = z.object({
  fullName: onlyLettersField("El nombre completo"),
  firstSurname: onlyLettersField("El primer apellido"),
  secondSurname: onlyLettersField("El segundo apellido").optional(),
  nationalId: onlyNumbersField("El número de cédula"),
  phoneNumber: onlyNumbersField("Número de contacto"),

  role: z
    .string({ required_error: "El rol es obligatorio" })
    .min(1, "El rol es obligatorio"),
});
export type UserFormValues = z.infer<typeof userSchema>;

/* ========================================================================
 * Visit Schema
 * ======================================================================== */

/** Schema for a single visit entry. */
export const visitSchema = z.object({
  /** Date of the visit (expects a JavaScript Date object) */
  date: z.date({ required_error: "La fecha de la visita es obligatoria" }),

  /** Indicates if credit was used as approved (expects a non-empty string) */
  creditUsedAsApproved: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Detailed description of how credit was used (expects a string) */
  creditUsageDescription: z.string({
    required_error: "Este campo es obligatorio",
  }),

  /** List of selected improvements (expects an array of strings, at least one) */
  improvements: z
    .array(z.string(), {
      required_error: "Debes seleccionar al menos una mejora",
    })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Additional improvement text if 'Other' was selected (expects a string, optional) */
  otherImprovement: z.string().optional(),

  /** Time taken to see results (expects a non-empty string) */
  timeToResults: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Indicates if results were as expected (expects a non-empty string) */
  resultsAsExpected: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Explanation if results did not meet expectations (expects a string, optional) */
  resultsExplanation: z.string().optional(),

  /** Status of financial records (expects a non-empty string) */
  financialRecords: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Uploaded evidence files for the credit evaluation (expects an array of File objects, optional) */
  creditEvidenceFiles: evidenceFileField,

  /** Name of the resource manager (expects a non-empty string) */
  resourceManager: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Additional resource manager name if 'Other' was selected (expects a string, optional) */
  otherResourceManager: z.string().optional(),

  /** Indicates if payments were made on schedule (expects a non-empty string) */
  paymentsOnSchedule: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Explanation for payment status (expects a string, optional) */
  paymentExplanation: z.string().optional(),

  /** Satisfaction level (expects a non-empty string) */
  satisfaction: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Indicates if another credit is needed (expects a non-empty string) */
  needAnotherCredit: z
    .string({ required_error: "Este campo es obligatorio" })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Intended use for another credit (expects a string, optional) */
  creditIntendedUse: z.string().optional(),

  // ======================================================================
  // Financial Diagnosis Fields
  // ======================================================================

  /** Monthly income of the individual (expects a string containing only digits) */
  monthlyIncome: onlyNumbersField("Ingresos mensuales"),

  /** Fixed monthly costs (expects a string containing only digits) */
  fixedCosts: onlyNumbersField("Costos fijos mensuales"),

  /** Variable monthly costs (expects a string containing only digits) */
  variableCosts: onlyNumbersField("Costos variables mensuales"),

  /** Current debt level as a percentage (expects either a string or number) */
  debtLevel: onlyNumbersField("El nivel de endeudamiento (%) es necesario"),

  /** Percentage of credit already used (expects either a string or number) */
  creditUsedPercentage: onlyNumbersField(
    "El monto del crédito (%) es necesario"
  ),

  /** Monthly payment amount for credit (expects a string containing only digits) */
  monthlyPayment: onlyNumbersField("Pago mensual del crédito"),

  /** Emergency reserve amount (expects a string containing only digits) */
  emergencyReserve: onlyNumbersField("Cantidad reservada para imprevistos"),

  // ======================================================================
  // Commercial Diagnosis Fields
  // ======================================================================

  /** Number of clients served this month (expects either a string or number) */
  monthlyClients: onlyNumbersField("El número de clientes mensuales"),

  /** Number of sales made this month (expects either a string or number) */
  monthlySales: onlyNumbersField("El número de ventas mensuales"),

  /** Total sales value for the month (expects a string containing only digits) */
  totalSalesValue: onlyNumbersField("Valor de las ventas actuales por mes"),

  /** Current number of employees (expects a non-empty string) */
  currentEmployees: z.string().min(1),

  /** List of sales channels used (expects an array of strings, at least one) */
  salesChannels: z
    .array(z.string(), {
      required_error: "Debes seleccionar al menos un canal de ventas",
    })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Additional sales channel if 'Other' was selected (expects a string, optional) */
  otherSalesChannel: z.string().optional(),

  // ======================================================================
  // Evidence of Visit
  // ======================================================================

  /** Uploaded evidence files for the visit (expects an array of File objects, optional) */
  evidenceVisitFile: evidenceFileField,
});

/* ========================================================================
 * Main Form Schema
 * ======================================================================== */

/**
 * Schema for the main evaluation form, which contains:
 *  - Personal Information
 *  - Company Information
 *  - Credit Information
 *  - Evaluator's Observations
 *  - Visits (array of visitSchema)
 */
export const formSchema = z.object({
  //#region Personal Information

  /** Full name of the individual (expects a string with only letters and spaces) */
  fullName: onlyLettersField("El nombre completo"),

  /** First surname of the individual (expects a string with only letters and spaces) */
  firstSurname: onlyLettersField("El primer apellido"),

  /** Second surname of the individual (expects a string with only letters and spaces, optional) */
  secondSurname: onlyLettersField("El segundo apellido").optional(),

  /** Gender of the individual (expects a string) */
  gender: z
    .string({ required_error: "El género es obligatorio" })
    .min(1, "El género es obligatorio"),

  /** Date of birth of the individual (expects a JavaScript Date object) */
  dateOfBirth: z.date({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  /** Educational profile of the individual (expects a string) */
  educationalProfile: z
    .string({
      required_error: "El perfil educativo es obligatorio",
    })
    .min(1, "El perfil educativo es obligatorio"),

  /** Ethnicity of the individual (expects a string) */
  ethnicity: z
    .string({ required_error: "La étnia es obligatoria" })
    .min(1, "La étnia es obligatoria"),

  /** National ID number (expects a string containing only digits) */
  nationalId: onlyNumbersField("El Número de cédula"),

  /** Contact phone number (expects a string containing only digits) */
  phoneNumber: onlyNumbersField("Número de contacto"),
  //#endregion

  //#region Company Information

  /** Name of the company (expects a string with minimum length of 2) */
  companyName: z
    .string({ required_error: "El nombre de la empresa es obligatorio" })
    .min(2, "El nombre de la empresa es obligatorio"),

  /** NIT with verification digit (expects a string in '123456789-0' format) */
  nit: rutWithDvField("El Número de RUT"),

  /** Economic sector of the company (expects a string) */
  economicSector: z
    .string({
      required_error: "El sector económico es obligatorio",
    })
    .min(1, "El sector económico es obligatorio"),

  /** Main sector category of the company (expects a string) */
  mainSector: z
    .string({
      required_error: "La actividad económica es obligatoria",
    })
    .min(1, { message: "La actividad económica es obligatoria" }),

  /** City where the company is located (expects a string with only letters and spaces) */
  city: onlyLettersField("La ciudad"),

  /** Address of the company (expects a string with minimum length of 2) */
  address: z
    .string({ required_error: "La dirección es obligatoria" })
    .min(2, "La dirección es obligatoria"),
  //#endregion

  //#region Credit Information

  /** Approved value of the credit (expects a string containing only digits) */
  approvedCreditValue: onlyNumbersField("El valor del crédito"),

  /** Date when the credit was disbursed (expects a JavaScript Date object) */
  disbursementDate: z.date({
    required_error: "La fecha de desembolso es obligatoria",
  }),

  /** List of credit destination options selected (expects an array of strings, at least one) */
  creditDestination: z
    .array(z.string(), {
      required_error: "Debes seleccionar al menos una opción de destino",
    })
    .min(1, { message: "Este campo es obligatorio" }),

  /** Additional credit destination if 'Other' was selected (expects a string, optional) */
  otherCreditDestination: z.string().optional(),
  //#endregion

  //#region Evaluator's Observations

  /** Observations recorded by the evaluator (expects a string) */
  evaluatorObservations: z
    .string({
      required_error: "Las observaciones del evaluador son obligatorias",
    })
    .min(1, {
      message: "Las observaciones del evaluador son obligatorias",
    }),
  //#endregion

  /** Array of visits made (expects at least one visitSchema entry) */
  visits: z.array(visitSchema),
});

/* ========================================================================
 * Type Definitions
 * ======================================================================== */

/** Type for the main form values, including an optional 'id' field for identification. */
export type FormValues = z.infer<typeof formSchema> & { id?: string };

/** Type for a single visit entry as defined by visitSchema. */
export type VisitValues = z.infer<typeof visitSchema>;
