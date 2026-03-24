import * as z from "zod";

export const ReglasSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre de la regla es requerido"),
  descripcion: z.string().max(500, "Máximo 500 caracteres").optional().nullable(),
  activo: z.boolean().optional(),
});

export type ReglaInput = z.infer<typeof ReglasSchema>;
