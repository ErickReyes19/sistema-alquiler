import * as z from 'zod';

export const TipoHabitacionSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre del tipo de habitación es requerido"),
  activo: z.boolean().optional(),  
});

export type TipoHabitacion = z.infer<typeof TipoHabitacionSchema>;
