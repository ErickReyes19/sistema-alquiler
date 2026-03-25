/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { TSchemaResetPassword, schemaResetPassword } from "./app/(public)/reset-password/schema";
import { TSchemaSignIn, schemaSignIn } from "./lib/shemas";
import { Prisma, TipoUsuario } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";

function getAuthKey(): Uint8Array | null {
    const authSecret = process.env.AUTH_SECRET?.trim();
    if (!authSecret) {
        return null;
    }

    return new TextEncoder().encode(authSecret);
}

export interface UsuarioSesion extends JWTPayload {
    IdUser: string;
    User: string;
    Rol: string;
    IdRol: string;
    Permiso: string[];
    DebeCambiar: boolean;
    tenantId: string;
    tenantSlug: string;
    tipoUsuario: TipoUsuario;
}

export async function encrypt(payload: UsuarioSesion) {
    const key = getAuthKey();
    if (!key) {
        throw new Error("AUTH_SECRET no está configurado");
    }

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("4 h from now")
        .sign(key);
}

export const decrypt = async (token: string): Promise<UsuarioSesion> => {
    const key = getAuthKey();
    if (!key) {
        throw new Error("AUTH_SECRET no está configurado");
    }

    const { payload } = await jwtVerify<JWTPayload>(token, key, {
        algorithms: ["HS256"],
    });

    return {
        IdUser: payload.IdUser as string,
        User: payload.User as string,
        Rol: payload.Rol as string,
        IdRol: payload.IdRol as string,
        Permiso: (payload.Permiso as string[]) || [],
        DebeCambiar: payload.DebeCambiar === true || payload.DebeCambiar === "True",
        tenantId: payload.tenantId as string,
        tenantSlug: payload.tenantSlug as string,
        tipoUsuario: payload.tipoUsuario as TipoUsuario,
        exp: payload.exp as number,
        iss: payload.iss as string,
        aud: payload.aud as string,
    };
};

export interface LoginResult {
    success?: string;
    error?: string;
    redirect?: string;
}

export interface UserChangePassword {
    username: string;
    newPassword: string;
}

export const login = async (
    credentials: TSchemaSignIn,
    redirect: string
): Promise<LoginResult> => {
    if (!getAuthKey()) {
        return { error: "Falta configurar AUTH_SECRET en el servidor" };
    }

    const parsed = schemaSignIn.safeParse(credentials);
    if (!parsed.success) {
        return { error: "Slug, usuario o contraseña inválidos" };
    }

    const { slug, usuario, contrasena } = parsed.data;
    const tokenAD = await getADAuthentication(slug, usuario, contrasena);
    if (!tokenAD) {
        return { error: "Slug, usuario o contraseña inválidos" };
    }

    const sessionToken = tokenAD;
    const sessionData = await decrypt(sessionToken);
    const expires = new Date(sessionData.exp! * 1000);

    cookies().set("session", sessionToken, { expires, httpOnly: true });

    return { success: "Login OK", redirect };
};

export const resetPassword = async (
    credentials: TSchemaResetPassword,
    username: string
): Promise<LoginResult> => {
    const parsed = schemaResetPassword.safeParse(credentials);
    if (!parsed.success) {
        return { error: "Error al cambiar la contraseña" };
    }

    const session = await getSession();
    if (!session) {
        return { error: "Sesión inválida" };
    }

    const { confirmar } = parsed.data;
    const tokenAD = await changePassword(session.tenantId, username, confirmar);
    if (!tokenAD) {
        return { error: "Error al cambiar la contraseña" };
    }

    const sessionData = await decrypt(tokenAD);
    const expires = new Date(sessionData.exp! * 1000);

    cookies().set("session", tokenAD, { expires, httpOnly: true });

    return { success: "Contraseña cambiada con éxito" };
};

export const getSession = async (): Promise<UsuarioSesion | null> => {
    const token = cookies().get("session")?.value;
    if (!token) return null;

    try {
        return await decrypt(token);
    } catch {
        return null;
    }
};

export const getSessionPermisos = async (): Promise<string[] | null> => {
    const sess = await getSession();
    return sess ? sess.Permiso : null;
};

export const signOut = async () => {
    cookies().delete("session");
};

const usuarioWithRolArgs = Prisma.validator<Prisma.UsuarioDefaultArgs>()({
    include: {
        tenant: true,
        rol: {
            include: {
                permisos: {
                    include: { permiso: true },
                },
            },
        },
    },
});

type UsuarioConRol = Prisma.UsuarioGetPayload<typeof usuarioWithRolArgs>;

function buildSessionPayload(user: UsuarioConRol): UsuarioSesion {
    const permisos = user.rol.permisos
      .filter((rp) => user.tipoUsuario === TipoUsuario.ROOT || !rp.permiso.esPermisoSistema)
      .map((rp) => rp.permiso.nombre);

    return {
        IdUser: user.id,
        User: user.nombre,
        Rol: user.rol.nombre,
        IdRol: user.rolId,
        Permiso: permisos,
        DebeCambiar: user.DebeCambiar,
        tenantId: user.tenantId,
        tenantSlug: user.tenant.slug,
        tipoUsuario: user.tipoUsuario,
        exp: Math.floor(Date.now() / 1000) + 4 * 60 * 60,
        iss: "your-issuer",
        aud: "your-audience",
    };
}

export async function getADAuthentication(
    slug: string,
    username: string,
    password: string
): Promise<string | null> {
    const user: UsuarioConRol | null = await prisma.usuario.findFirst({
        where: {
            nombre: username,
            tenant: {
                slug,
                activo: true,
            },
            activo: true,
        },
        include: usuarioWithRolArgs.include,
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }

    return encrypt(buildSessionPayload(user));
}

export async function changePassword(
    tenantId: string,
    username: string,
    newPassword: string
): Promise<string | null> {
    const existing = await prisma.usuario.findFirst({
        where: { nombre: username, tenantId }
    });
    if (!existing) {
        return null;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
    const updated = await prisma.usuario.update({
        where: { id: existing.id },
        data: {
            password: hashedPassword,
            DebeCambiar: false,
        },
        include: usuarioWithRolArgs.include,
    });

    return encrypt(buildSessionPayload(updated));
}

export const getSessionUsuario = async (): Promise<UsuarioSesion | null> => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }

    try {
        const usuario = await decrypt(session);
        return usuario;
    } catch {
        return null;
    }
};
