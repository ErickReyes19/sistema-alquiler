import * as z from 'zod';

export const HabitacionSchema = z.object({
  id: z.string().optional(),
  apartamentoId: z.string().uuid().optional(),  
  tipoHabitacionId: z.string().uuid({ message: "Debes seleccionar un tipo de habitación" }),
  cantidad: z.number()
    .int({ message: "La cantidad debe ser un entero" })
    .min(1, { message: "La cantidad mínima es 1" }),
  activo: z.boolean().optional(),
});

export type Habitacion = z.infer<typeof HabitacionSchema>;

export const ApartamentoSchema = z.object({
  id: z.string().optional(),
  numero: z.string().min(1, { message: "El número de apartamento es requerido" }),
  direccion: z.string().optional(),
  disponible: z.boolean().optional(),
  activo: z.boolean().optional(),
  habitaciones: z.array(HabitacionSchema)
    .min(1, { message: "Debes agregar al menos una habitación" }),
});

export type Apartamento = z.infer<typeof ApartamentoSchema>;
