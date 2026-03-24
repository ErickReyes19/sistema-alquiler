"use server";

import { prisma } from "@/lib/prisma";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import { logServerActionError, requireEntityId, resolveActivo } from "@/lib/server-action-utils";
import { Regla } from "./type";

const mapReglaToDto = (regla: { id: string; nombre: string; descripcion: string | null; activo: boolean }): Regla => ({
  id: regla.id,
  nombre: regla.nombre,
  descripcion: regla.descripcion,
  activo: regla.activo,
});

const buildReglaData = (regla: Regla) => ({
  nombre: regla.nombre,
  descripcion: regla.descripcion?.trim() || null,
  activo: resolveActivo(regla.activo),
});

export async function getReglas(): Promise<Regla[]> {
  try {
    const reglas = await prisma.regla.findMany({
      where: await buildTenantWhere(),
      orderBy: { nombre: "asc" },
    });

    return reglas.map(mapReglaToDto);
  } catch (error) {
    logServerActionError("getReglas", error);
    return [];
  }
}

export async function getReglasActivas(): Promise<Regla[]> {
  try {
    const reglas = await prisma.regla.findMany({
      where: await buildTenantWhere({ activo: true }),
      orderBy: { nombre: "asc" },
    });

    return reglas.map(mapReglaToDto);
  } catch (error) {
    logServerActionError("getReglasActivas", error);
    return [];
  }
}

export async function getReglaById(id: string): Promise<Regla | null> {
  try {
    const regla = await prisma.regla.findFirst({
      where: await buildTenantWhere({ id }),
    });

    return regla ? mapReglaToDto(regla) : null;
  } catch (error) {
    logServerActionError("getReglaById", error);
    return null;
  }
}

export async function postRegla({ regla }: { regla: Regla }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession();

    await prisma.regla.create({
      data: {
        ...buildReglaData(regla),
        tenantId,
      },
    });

    return true;
  } catch (error) {
    logServerActionError("postRegla", error);
    return false;
  }
}

export async function putRegla({ regla }: { regla: Regla }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession();
    const reglaId = requireEntityId(regla.id, "regla");

    const updated = await prisma.regla.updateMany({
      where: { id: reglaId, tenantId },
      data: buildReglaData(regla),
    });

    if (updated.count === 0) {
      throw new Error("Regla no encontrada para el tenant actual");
    }

    return true;
  } catch (error) {
    logServerActionError("putRegla", error);
    return false;
  }
}
