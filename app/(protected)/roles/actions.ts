"use server";

import { randomUUID } from "crypto";

import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  logServerActionError,
  requireEntityId,
  resolveActivo,
} from "@/lib/server-action-utils";

import { PermisosRol, Rol as RolDTO } from "./type";

const rolWithPermisosInclude = {
  permisos: {
    include: {
      permiso: true,
    },
  },
} as const;

type RolWithPermisos = Prisma.RolGetPayload<{
  include: typeof rolWithPermisosInclude;
}>;

const mapRolToDto = (rol: RolWithPermisos): RolDTO => ({
  id: rol.id,
  nombre: rol.nombre,
  descripcion: rol.descripcion,
  activo: rol.activo,
  permisos: rol.permisos.map(
    (rolPermiso): PermisosRol => ({
      id: rolPermiso.permiso.id,
      nombre: rolPermiso.permiso.nombre,
    }),
  ),
});

const buildPermisosCreateData = (permisos: PermisosRol[]) =>
  permisos.map((permiso) => ({
    permiso: { connect: { id: permiso.id } },
  }));

const buildRolData = (rol: RolDTO) => ({
  nombre: rol.nombre,
  descripcion: rol.descripcion,
  activo: resolveActivo(rol.activo),
});

async function findRoles(where?: { activo?: boolean }): Promise<RolDTO[]> {
  const roles = await prisma.rol.findMany({
    where,
    include: rolWithPermisosInclude,
  });

  return roles.map(mapRolToDto);
}

export async function getRolesPermisos(): Promise<RolDTO[]> {
  try {
    return await findRoles();
  } catch (error) {
    logServerActionError("getRolesPermisos", error);
    return [];
  }
}

export async function getRolesPermisosActivos(): Promise<RolDTO[]> {
  try {
    return await findRoles({ activo: true });
  } catch (error) {
    logServerActionError("getRolesPermisosActivos", error);
    return [];
  }
}

export async function putRol({ rol }: { rol: RolDTO }): Promise<RolDTO | null> {
  try {
    const updated = await prisma.rol.update({
      where: { id: requireEntityId(rol.id, "rol") },
      data: {
        ...buildRolData(rol),
        permisos: {
          deleteMany: {},
          create: buildPermisosCreateData(rol.permisos),
        },
      },
      include: rolWithPermisosInclude,
    });

    return mapRolToDto(updated);
  } catch (error) {
    logServerActionError("putRol", error);
    return null;
  }
}

export async function getRolPermisoById(id: string): Promise<RolDTO | null> {
  try {
    const rol = await prisma.rol.findUnique({
      where: { id },
      include: rolWithPermisosInclude,
    });

    return rol ? mapRolToDto(rol) : null;
  } catch (error) {
    logServerActionError("getRolPermisoById", error);
    return null;
  }
}

export async function postRol({ rol }: { rol: RolDTO }): Promise<RolDTO | null> {
  try {
    const created = await prisma.rol.create({
      data: {
        id: randomUUID(),
        ...buildRolData(rol),
        permisos: {
          create: buildPermisosCreateData(rol.permisos),
        },
      },
      include: rolWithPermisosInclude,
    });

    return mapRolToDto(created);
  } catch (error) {
    logServerActionError("postRol", error);
    return null;
  }
}
