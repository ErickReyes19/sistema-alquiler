import { z } from "zod";

export const ContratoSchema = z.object({
  id: z.string().uuid().optional(),
  inquilinoId: z.string().uuid({ message: "El inquilino es requerido" }),
  apartamentoId: z.string().uuid({ message: "El apartamento es requerido" }),
  fechaInicio: z.coerce.date({ required_error: "La fecha de inicio es requerida" }),
  fechaFin: z.coerce.date().optional(),
  montoMensual: z.coerce.number().min(0, "El monto mensual no puede ser negativo"),
  preavisoDias: z.coerce.number().int().min(0, "El preaviso no puede ser negativo").default(30),
  activo: z.boolean().optional(),
});
