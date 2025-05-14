import { z } from "zod";

// Esquema para un detalle de recibo
export const ReciboDetalleSchema = z.object({
  id: z.string().uuid().optional(),
  reciboId: z.string(),
  descripcion: z.string().min(1, { message: "La descripción es requerida" }),
  monto: z.coerce
    .number({ invalid_type_error: "El monto debe ser un número" })
    .min(0, { message: "El monto no puede ser negativo" }),
});

// Tipo para el detalle
export type ReciboDetalle = z.infer<typeof ReciboDetalleSchema>;


// Esquema para el recibo, que incluye un array de detalles
export const ReciboSchema = z.object({
  id: z.string().uuid().optional(),
  contratoId: z.string().uuid({ message: "El contrato es requerido" }),
  fechaPago: z.coerce.date({ required_error: "La fecha de pago es requerida" }),
  total: z.coerce
    .number({ invalid_type_error: "El total debe ser un número" })
    .min(0, { message: "El total no puede ser negativo" }),
  detalles: z
    .array(ReciboDetalleSchema)
    .min(1, { message: "Debe haber al menos un concepto en el recibo" }),
});

// Tipo para el recibo completo, con detalles
export type Recibo = z.infer<typeof ReciboSchema>;
