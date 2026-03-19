"use server";

import { randomUUID } from "crypto";

import bcrypt from "bcryptjs";

import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  logServerActionError,
  normalizeOptionalText,
  requireEntityId,
  resolveActivo,
} from "@/lib/server-action-utils";

import { Usuario, UsuarioCreate, UsuarioUpdate } from "./type";

const usuarioInclude = {
  rol: true,
} as const;

type UsuarioWithRol = Prisma.UsuarioGetPayload<{
  include: typeof usuarioInclude;
}>;

const mapUsuarioToDto = (usuario: UsuarioWithRol): Usuario => ({
  id: usuario.id,
  usuario: usuario.nombre,
  rol_id: usuario.rolId,
  rol: usuario.rol?.nombre ?? "",
  activo: usuario.activo,
  email: usuario.email,
});

const buildUsuarioData = (usuario: Pick<Usuario, "usuario" | "rol_id" | "email">) => ({
  nombre: usuario.usuario,
  rolId: usuario.rol_id,
  email: normalizeOptionalText(usuario.email),
});

export async function getUsuarios(): Promise<Usuario[]> {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: usuarioInclude,
      orderBy: {
        nombre: "asc",
      },
    });

    return usuarios.map(mapUsuarioToDto);
  } catch (error) {
    logServerActionError("getUsuarios", error);
    return [];
  }
}

export async function postUsuario({ usuario }: { usuario: UsuarioCreate }): Promise<Usuario> {
  try {
    const hashedPassword = await bcrypt.hash("password.123", 10);

    const createdUsuario = await prisma.usuario.create({
      data: {
        id: randomUUID(),
        ...buildUsuarioData(usuario),
        activo: true,
        password: hashedPassword,
        DebeCambiar: true,
      },
      include: usuarioInclude,
    });

    return mapUsuarioToDto(createdUsuario);
  } catch (error) {
    logServerActionError("postUsuario", error);
    throw new Error("Error al crear el usuario");
  }
}

export async function putUsuario({ usuario }: { usuario: UsuarioUpdate }): Promise<Usuario> {
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: requireEntityId(usuario.id, "usuario") },
      data: {
        ...buildUsuarioData(usuario),
        activo: resolveActivo(usuario.activo),
      },
      include: usuarioInclude,
    });

    return mapUsuarioToDto(updatedUsuario);
  } catch (error) {
    logServerActionError("putUsuario", error);
    throw new Error("Error al actualizar el usuario");
  }
}

export async function getUsuarioById(id: string): Promise<Usuario | null> {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: usuarioInclude,
    });

    return usuario ? mapUsuarioToDto(usuario) : null;
  } catch (error) {
    logServerActionError("getUsuarioById", error);
    return null;
  }
}
