
import { z } from "zod";

export const schemaSignIn = z.object({
    slug: z
        .string({ message: "El slug del tenant es requerido" })
        .min(1, { message: "El slug del tenant es requerido" }),
    usuario: z
        .string({ message: "El nombre de usuario es requerido" })
        .min(1, { message: "El nombre de usuario es requerido" }),
    contrasena: z
        .string({ message: "La contraseña es requerida" })
        .min(1, { message: "La contraseña es requerida" }),
});
export type TSchemaSignIn = z.infer<typeof schemaSignIn>;
