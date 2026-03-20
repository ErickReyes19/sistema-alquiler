"use server";

import { randomUUID } from "crypto";

import { Prisma, TipoUsuario } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  logServerActionError,
  requireEntityId,
  resolveActivo,
} from "@/lib/server-action-utils";
import { requireTenantSession } from "@/lib/tenant-session";

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

const buildPermisosCreateData = (tenantId: string, permisos: PermisosRol[]) =>
  permisos.map((permiso) => ({
    tenant: { connect: { id: tenantId } },
    permiso: { connect: { id: permiso.id } },
  }));

const buildRolData = (rol: RolDTO) => ({
  nombre: rol.nombre,
  descripcion: rol.descripcion,
  activo: resolveActivo(rol.activo),
});

async function findRoles(where?: Prisma.RolWhereInput): Promise<RolDTO[]> {
  const session = await requireTenantSession();
  const roles = await prisma.rol.findMany({
    where: {
      tenantId: session.tenantId,
      ...where,
    },
    include: rolWithPermisosInclude,
  });

  return roles
    .filter((rol) =>
      session.tipoUsuario === TipoUsuario.ROOT
        ? true
        : rol.permisos.every((permiso) => !permiso.permiso.esPermisoSistema),
    )
    .map(mapRolToDto);
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
    const session = await requireTenantSession();
    const rolId = requireEntityId(rol.id, "rol");

    const existingRol = await prisma.rol.findFirst({
      where: { id: rolId, tenantId: session.tenantId },
      include: rolWithPermisosInclude,
    });

    if (!existingRol) {
      throw new Error("Rol no encontrado para el tenant actual.");
    }

    if (
      session.tipoUsuario !== TipoUsuario.ROOT &&
      existingRol.permisos.some((rolPermiso) => rolPermiso.permiso.esPermisoSistema)
    ) {
      throw new Error("No puedes editar roles del sistema.");
    }

    const updated = await prisma.rol.update({
      where: { id: rolId },
      data: {
        ...buildRolData(rol),
        permisos: {
          deleteMany: { tenantId: session.tenantId },
          create: buildPermisosCreateData(session.tenantId, rol.permisos),
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
    const session = await requireTenantSession();
    const rol = await prisma.rol.findFirst({
      where: { id, tenantId: session.tenantId },
      include: rolWithPermisosInclude,
    });

    if (!rol) {
      return null;
    }

    if (
      session.tipoUsuario !== TipoUsuario.ROOT &&
      rol.permisos.some((rolPermiso) => rolPermiso.permiso.esPermisoSistema)
    ) {
      return null;
    }

    return mapRolToDto(rol);
  } catch (error) {
    logServerActionError("getRolPermisoById", error);
    return null;
  }
}

export async function postRol({ rol }: { rol: RolDTO }): Promise<RolDTO | null> {
  try {
    const session = await requireTenantSession();
    const created = await prisma.rol.create({
      data: {
        id: randomUUID(),
        tenantId: session.tenantId,
        ...buildRolData(rol),
        permisos: {
          create: buildPermisosCreateData(session.tenantId, rol.permisos),
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
