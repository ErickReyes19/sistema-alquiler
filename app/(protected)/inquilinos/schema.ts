import * as z from "zod";

const optionalTrimmedText = z.string().trim().optional().or(z.literal(""));

export const ReferenciaArrendamientoSchema = z.object({
  id: z.string().optional(),
  tipo: z.enum(["PERSONAL", "LABORAL", "ARRENDADOR_ANTERIOR"]),
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio"),
  telefono: z.string().min(8, "El teléfono es obligatorio"),
  correo: z.string().email("Debe ser un correo válido").optional().or(z.literal("")),
  relacion: optionalTrimmedText,
  notas: optionalTrimmedText,
});

export const GaranteArrendamientoSchema = z.object({
  id: z.string().optional(),
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio"),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres"),
  telefono: z.string().min(8, "El teléfono es obligatorio"),
  correo: z.string().email("Debe ser un correo válido").optional().or(z.literal("")),
  empresa: optionalTrimmedText,
  ingresosMensuales: z.coerce.number().min(0, "Los ingresos no pueden ser negativos").optional(),
  notas: optionalTrimmedText,
});

export const ExpedienteArrendamientoSchema = z.object({
  id: z.string().optional(),
  ocupacion: optionalTrimmedText,
  empresa: optionalTrimmedText,
  ingresosMensuales: z.coerce.number().min(0, "Los ingresos no pueden ser negativos").optional(),
  historialAlquiler: optionalTrimmedText,
  motivoSolicitud: optionalTrimmedText,
  estadoDecision: z.enum(["PENDIENTE", "APROBADO", "RECHAZADO"]).default("PENDIENTE"),
  decisionTomadaPor: optionalTrimmedText,
  fechaDecision: z.date().optional().nullable(),
  motivoDecision: optionalTrimmedText,
  referencias: z.array(ReferenciaArrendamientoSchema).default([]),
  garantes: z.array(GaranteArrendamientoSchema).default([]),
});

export const InquilinoSchema = z.object({
  id: z.string().optional(),
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio"),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres"),
  telefono: z.string().regex(/^\d{8}$/, "El teléfono debe tener exactamente 8 dígitos numéricos"),
  correo: z.string().email("Debe ser un correo válido").optional().or(z.literal("")),
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
  acompanantes: z.array(AcompananteSchema).default([]),
  expedienteArrendamiento: ExpedienteArrendamientoSchema,
});

export type Inquilino = z.infer<typeof InquilinoSchema>;
export type Acompanante = z.infer<typeof AcompananteSchema>;
export type ReferenciaArrendamiento = z.infer<typeof ReferenciaArrendamientoSchema>;
export type GaranteArrendamiento = z.infer<typeof GaranteArrendamientoSchema>;
export type ExpedienteArrendamiento = z.infer<typeof ExpedienteArrendamientoSchema>;
export type InquilinoForm = z.infer<typeof InquilinoFormSchema>;
