import { z } from "zod";

export const ContratoSchema = z.object({
  id: z.string().uuid().optional(),
  inquilinoId: z.string().uuid({ message: "El inquilino es requerido" }),
  apartamentoId: z.string().uuid({ message: "El apartamento es requerido" }),
  fechaInicio: z.coerce.date({ required_error: "La fecha de inicio es requerida" }),
  fechaFin: z.coerce.date().optional(),
  montoMensual: z.coerce.number().min(0, "El monto mensual no puede ser negativo"),
  activo: z.boolean().optional(),
});
