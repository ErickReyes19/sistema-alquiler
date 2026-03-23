import * as z from "zod";

export const InquilinoSchema = z.object({
  id: z.string().optional(),
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio"),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres"),
  telefono: z.string().regex(/^\d{8}$/, "El teléfono debe tener exactamente 8 dígitos numéricos"),
  correo: z.string().email("Debe ser un correo válido").optional(),
  fechaNacimiento: z
    .date({
      required_error: "La fecha de nacimiento es requerida",
      invalid_type_error: "La fecha de nacimiento debe ser una fecha válida",
    })
    .refine((d) => d <= new Date(), "La fecha de nacimiento no puede ser futura"),

  activo: z.boolean().optional(),
});


export const AcompananteSchema = z.object({
  id: z.string().optional(),
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio"),
  parentesco: z.string().min(1, "El parentesco es obligatorio"),
  activo: z.boolean().optional(),
});

export const InquilinoFormSchema = InquilinoSchema.extend({
  acompanantes: z.array(AcompananteSchema).optional(), // Hacer que acompanantes sea opcional
});

export type Inquilino = z.infer<typeof InquilinoSchema>;
export type Acompanante = z.infer<typeof AcompananteSchema>;
export type InquilinoForm = z.infer<typeof InquilinoFormSchema>;
