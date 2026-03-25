import * as z from "zod";

export const TipoActivoApartamentoSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre del tipo de activo es requerido"),
  activo: z.boolean().optional(),
});

export type TipoActivoApartamentoInput = z.infer<typeof TipoActivoApartamentoSchema>;
