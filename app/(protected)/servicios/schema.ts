import * as z from 'zod';

export const ServiciosSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre del tipo de servicio es requerido"),
  activo: z.boolean().optional(),  
});

export type servicio = z.infer<typeof ServiciosSchema>;
