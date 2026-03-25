"use server";

import { prisma } from "@/lib/prisma";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import { logServerActionError, requireEntityId, resolveActivo } from "@/lib/server-action-utils";

import type { TipoActivoApartamento } from "./type";

const mapTipoActivo = (tipo: { id: string; nombre: string; activo: boolean }): TipoActivoApartamento => ({
  id: tipo.id,
  nombre: tipo.nombre,
  activo: tipo.activo,
});

export async function getTiposActivosApartamento(): Promise<TipoActivoApartamento[]> {
  try {
    const tipos = await prisma.tipoActivoApartamento.findMany({
      where: await buildTenantWhere({}),
      orderBy: { nombre: "asc" },
    });

    return tipos.map(mapTipoActivo);
  } catch (error) {
    logServerActionError("getTiposActivosApartamento", error);
    return [];
  }
}

export async function getTipoActivoApartamentoById(id: string): Promise<TipoActivoApartamento | null> {
  try {
    const tipo = await prisma.tipoActivoApartamento.findFirst({
      where: await buildTenantWhere({ id }),
    });

    return tipo ? mapTipoActivo(tipo) : null;
  } catch (error) {
    logServerActionError("getTipoActivoApartamentoById", error);
    return null;
  }
}

export async function postTipoActivoApartamento({ tipoActivo }: { tipoActivo: TipoActivoApartamento }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession();
    await prisma.tipoActivoApartamento.create({
      data: {
        tenantId,
        nombre: tipoActivo.nombre.trim(),
        activo: resolveActivo(tipoActivo.activo),
      },
    });

    return true;
  } catch (error) {
    logServerActionError("postTipoActivoApartamento", error);
    return false;
  }
}

export async function putTipoActivoApartamento({ tipoActivo }: { tipoActivo: TipoActivoApartamento }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession();
    const tipoActivoId = requireEntityId(tipoActivo.id, "tipo de activo");

    const updated = await prisma.tipoActivoApartamento.updateMany({
      where: { id: tipoActivoId, tenantId },
      data: {
        nombre: tipoActivo.nombre.trim(),
        activo: resolveActivo(tipoActivo.activo),
      },
    });

    if (updated.count === 0) {
      throw new Error("Tipo de activo no encontrado para el tenant actual.");
    }

    return true;
  } catch (error) {
    logServerActionError("putTipoActivoApartamento", error);
    return false;
  }
}
