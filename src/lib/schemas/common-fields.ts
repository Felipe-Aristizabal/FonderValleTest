import { z } from "zod";

export function onlyLettersField(fieldName = "Este campo") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .min(2, `${fieldName} debe tener al menos 2 caracteres`)
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
      message: `${fieldName} solo puede contener letras y espacios`,
    });
}

export function onlyNumbersField(fieldName = "Este campo") {
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
export function rutWithDvField(fieldName = "NIT with verification digit") {
  return z
    .string({ required_error: `${fieldName} es obligatorio` })
    .regex(/^\d{5,10}-\d$/, {
      message: `${fieldName} debe tener el formato 123456789-0`,
    });
}

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
export const evidenceFileField = z
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
