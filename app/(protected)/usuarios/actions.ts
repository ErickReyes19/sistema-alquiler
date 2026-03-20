"use server";

import { randomUUID } from "crypto";

import bcrypt from "bcryptjs";

import { Prisma, TipoUsuario } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { generateTemporaryPassword } from "@/lib/default-user-password";
import {
  logServerActionError,
  normalizeOptionalText,
  requireEntityId,
  resolveActivo,
} from "@/lib/server-action-utils";
import { requireTenantSession } from "@/lib/tenant-session";

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
    const session = await requireTenantSession();
    const usuarios = await prisma.usuario.findMany({
      where: {
        tenantId: session.tenantId,
        ...(session.tipoUsuario === TipoUsuario.ROOT
          ? {}
          : { tipoUsuario: TipoUsuario.TENANT_ADMIN }),
      },
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

export async function postUsuario({ usuario }: { usuario: UsuarioCreate }): Promise<{ usuario: Usuario; passwordTemporal: string }> {
  try {
    const session = await requireTenantSession();
    const passwordTemporal = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(passwordTemporal, 10);

    const createdUsuario = await prisma.usuario.create({
      data: {
        id: randomUUID(),
        tenantId: session.tenantId,
        ...buildUsuarioData(usuario),
        activo: true,
        password: hashedPassword,
        DebeCambiar: true,
        tipoUsuario: TipoUsuario.TENANT_ADMIN,
      },
      include: usuarioInclude,
    });

    return {
      usuario: mapUsuarioToDto(createdUsuario),
      passwordTemporal,
    };
  } catch (error) {
    logServerActionError("postUsuario", error);
    throw new Error("Error al crear el usuario");
  }
}

export async function putUsuario({ usuario }: { usuario: UsuarioUpdate }): Promise<Usuario> {
  try {
    const session = await requireTenantSession();
    const usuarioId = requireEntityId(usuario.id, "usuario");
    const existing = await prisma.usuario.findFirst({
      where: { id: usuarioId, tenantId: session.tenantId },
    });

    if (!existing) {
      throw new Error("Usuario no encontrado para el tenant actual");
    }

    if (
      session.tipoUsuario !== TipoUsuario.ROOT &&
      existing.tipoUsuario === TipoUsuario.ROOT
    ) {
      throw new Error("No puedes editar usuarios root");
    }

    const updatedUsuario = await prisma.usuario.update({
      where: { id: usuarioId },
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
    const session = await requireTenantSession();
    const usuario = await prisma.usuario.findFirst({
      where: {
        id,
        tenantId: session.tenantId,
        ...(session.tipoUsuario === TipoUsuario.ROOT
          ? {}
          : { tipoUsuario: TipoUsuario.TENANT_ADMIN }),
      },
      include: usuarioInclude,
    });

    return usuario ? mapUsuarioToDto(usuario) : null;
  } catch (error) {
    logServerActionError("getUsuarioById", error);
    return null;
  }
}
