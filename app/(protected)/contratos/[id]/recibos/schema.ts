import { z } from "zod";

export const ReciboDetalleSchema = z.object({
  id: z.string().uuid().optional(),
  reciboId: z.string(),
  descripcion: z.string().min(1, { message: "La descripción es requerida" }),
  monto: z.coerce
    .number({ invalid_type_error: "El monto debe ser un número" })
    .min(0, { message: "El monto no puede ser negativo" }),
});

export type ReciboDetalle = z.infer<typeof ReciboDetalleSchema>;

export const ReciboSchema = z.object({
  id: z.string().uuid().optional(),
  contratoId: z.string().uuid({ message: "El contrato es requerido" }),
  fechaPago: z.coerce.date({ required_error: "La fecha de emisión es requerida" }),
  fechaVencimiento: z.coerce.date({ required_error: "La fecha de vencimiento es requerida" }),
  total: z.coerce
    .number({ invalid_type_error: "El total debe ser un número" })
    .min(0, { message: "El total no puede ser negativo" }),
  cargoMora: z.coerce
    .number({ invalid_type_error: "El recargo mora debe ser un número" })
    .min(0, { message: "El recargo mora no puede ser negativo" }),
  saldoPendiente: z.coerce.number().min(0),
  estado: z.enum(["PENDIENTE", "PAGADO", "VENCIDO", "PARCIALMENTE_PAGADO"]),
  observacionesCobranza: z.string().max(500, { message: "Máximo 500 caracteres" }).optional().nullable(),
  detalles: z
    .array(ReciboDetalleSchema)
    .min(1, { message: "Debe haber al menos un concepto en el recibo" }),
}).refine((data) => data.fechaVencimiento >= data.fechaPago, {
  message: "La fecha de vencimiento no puede ser anterior a la fecha de emisión",
  path: ["fechaVencimiento"],
});

export type Recibo = z.infer<typeof ReciboSchema>;
