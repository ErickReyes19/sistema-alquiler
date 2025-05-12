// schema.ts
import * as z from 'zod';

//
// 1) Habitaciones
//
export const HabitacionSchema = z.object({
  id: z.string().uuid().optional(),
  apartamentoId: z.string().uuid().optional(),
  tipoHabitacionId: z
    .string()
    .uuid({ message: "Debes seleccionar un tipo de habitación" }),
  cantidad: z
    .number({ invalid_type_error: "La cantidad debe ser un número" })
    .int({ message: "La cantidad debe ser un entero" })
    .min(1, { message: "La cantidad mínima es 1" }),
  activo: z.boolean().optional(),
});
export type Habitacion = z.infer<typeof HabitacionSchema>;

//
// 2) ApartamentoServicio (tabla intermedia)
//
export const ApartamentoServicioSchema = z.object({
  id: z.string().uuid().optional(),
  apartamentoId: z.string().optional(), // ← DEFAULT
  servicioId: z.string().uuid({ message: "El ID de servicio es requerido" }),
  incluido: z.boolean().optional(),    // ← DEFAULT
  costoAdicional: z
    .number({ invalid_type_error: "El costo adicional debe ser un número" })
    .min(0, { message: "El costo adicional no puede ser negativo" })
    .optional(),                          // ← DEFAULT
});
export type ApartamentoServicio = z.infer<typeof ApartamentoServicioSchema>;

//
// 3) Apartamento (todo junto)
//
export const ApartamentoSchema = z.object({
  id: z.string().uuid().optional(),
  numero: z.string().min(1, { message: "El número de apartamento es requerido" }),
  direccion: z.string().optional(),
  disponible: z.boolean().optional(),
  activo: z.boolean().optional(),     
  habitaciones: z
    .array(HabitacionSchema)
    .min(1, { message: "Debes agregar al menos una habitación" }),
  servicios: z
    .array(ApartamentoServicioSchema)
    .optional(),                         // ← DEFAULT, **sin optional()**
});
export type Apartamento = z.infer<typeof ApartamentoSchema>;
