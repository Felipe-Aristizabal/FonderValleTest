import { z } from "zod";
import {
  onlyLettersField,
  onlyNumbersField,
  rutWithDvField,
} from "./common-fields";

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
});

/* ========================================================================
 * Type Definitions
 * ======================================================================== */

/** Type for the main form values, including an optional 'id' field for identification. */
export type FormValues = z.infer<typeof formSchema> & { id?: string };
