import { z } from "zod";

// Esquema para validación de usuario
export const UsuarioSchema = z.object({
  id: z.string().optional(),
  usuario: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un correo electrónico válido"),
  rol_id: z.string().uuid("Role ID debe ser un UUID válido"),
  activo: z.boolean().optional(),
});
