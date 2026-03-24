import { z } from "zod";

export const ContratoSchema = z.object({
  id: z.string().uuid().optional(),
  inquilinoId: z.string().uuid({ message: "El inquilino es requerido" }),
  apartamentoId: z.string().uuid({ message: "El apartamento es requerido" }),
  fechaInicio: z.coerce.date({ required_error: "La fecha de inicio es requerida" }),
  fechaFin: z.coerce.date().optional(),
  montoMensual: z.coerce.number().min(0, "El monto mensual no puede ser negativo"),
  diaPagoMensual: z.coerce.number().int().min(1, "El día de pago mínimo es 1").max(31, "El día de pago máximo es 31").default(1),
  reglaIds: z.array(z.string().uuid()).default([]),
  depositoGarantiaMonto: z.coerce.number().min(0, "El depósito no puede ser negativo").default(0),
  fechaRecepcionDeposito: z.coerce.date().optional(),
  preavisoDias: z.coerce.number().int().min(0, "El preaviso no puede ser negativo").default(30),
  activo: z.boolean().optional(),
});
