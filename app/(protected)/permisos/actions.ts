"use server";

import { Prisma, TipoUsuario } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireTenantSession } from "@/lib/tenant-session";

import { PermisosRol } from "../roles/type";
import { Permiso as PermisoDTO } from "./type";

const mapPermisoToDto = (permiso: {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}): PermisoDTO => ({
  id: permiso.id,
  nombre: permiso.nombre,
  descripcion: permiso.descripcion,
  activo: permiso.activo,
});

async function findActivePermisos(): Promise<PermisoDTO[]> {
  const session = await requireTenantSession();
  const where: Prisma.PermisoWhereInput = {
    tenantId: session.tenantId,
    activo: true,
  };

  if (session.tipoUsuario !== TipoUsuario.ROOT) {
    where.esPermisoSistema = false;
  }

  const permisos = await prisma.permiso.findMany({
    where,
    orderBy: { nombre: "asc" },
  });

  return permisos.map(mapPermisoToDto);
}

export async function getPermisos(): Promise<PermisoDTO[]> {
  try {
    return await findActivePermisos();
  } catch (error) {
    console.error("Error al obtener los permisos:", error);
    return [];
  }
}

export async function getPermisosForRoles(): Promise<PermisosRol[]> {
  try {
    const permisos = await findActivePermisos();

    return permisos.map(({ id, nombre }) => ({
      id: id!,
      nombre,
    }));
  } catch (error) {
    console.error("Error al obtener los permisos para roles:", error);
    return [];
  }
}
