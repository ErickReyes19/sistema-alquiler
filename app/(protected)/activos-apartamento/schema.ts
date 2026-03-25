import * as z from "zod";

export const ApartamentoActivoSchema = z.object({
  id: z.string().optional(),
  apartamentoId: z.string().min(1, "Debe seleccionar un apartamento"),
  tipoActivoId: z.string().min(1, "Debe seleccionar un tipo de activo"),
  tipoHabitacionId: z.string().optional(),
  identificador: z.string().min(1, "El identificador es obligatorio"),
  descripcion: z.string().optional(),
  activo: z.boolean().optional(),
});

export type ApartamentoActivoInput = z.infer<typeof ApartamentoActivoSchema>;
