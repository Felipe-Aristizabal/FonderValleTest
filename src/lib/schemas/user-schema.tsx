import { z } from "zod";
import { onlyLettersField, onlyNumbersField } from "./common-fields";

export const userSchema = z.object({
  nombres: onlyLettersField("Nombres"),
  apellidos: onlyLettersField("Apellidos"),

  username: z
    .string({ required_error: "El nombre de usuario es obligatorio" })
    .email("Debe ser un correo válido"),

  email: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .email("Debe ser un correo válido"),

  documento: onlyNumbersField("Número de documento"),

  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),

  celular: onlyNumbersField("Número de celular"),
  rol: z
    .string({ required_error: "El rol es obligatorio" })
    .min(1, "El rol es obligatorio"),

  estado: z
    .string({ required_error: "El estado es obligatorio" })
    .min(1, "El estado es obligatorio"),

  // Campos opcionales que se enviarán como null
  direccion: z.string().nullable().optional(),
  ciudad: z.string().nullable().optional(),
  departamento: z.string().nullable().optional(),
  profesion: z.string().nullable().optional(),
  niveleducativo: z.string().nullable().optional(),
  fechanacimiento: z.string().nullable().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;
