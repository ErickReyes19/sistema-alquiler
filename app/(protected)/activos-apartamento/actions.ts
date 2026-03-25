"use server";

import { prisma } from "@/lib/prisma";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import { logServerActionError, requireEntityId, resolveActivo } from "@/lib/server-action-utils";

import type {
  ApartamentoActivoItem,
  ApartamentoOption,
  TipoActivoOption,
  TipoHabitacionOption,
} from "./type";

type ApartamentoActivoMutationInput = {
  id?: string;
  apartamentoId: string;
  tipoActivoId: string;
  tipoHabitacionId?: string | null;
  identificador: string;
  descripcion?: string;
  activo?: boolean;
};

const mapActivo = (activo: {
  id: string;
  apartamentoId: string;
  apartamento: { numero: string };
  tipoActivoId: string;
  tipoActivo: { nombre: string };
  tipoHabitacionId: string | null;
  tipoHabitacion: { nombre: string } | null;
  identificador: string;
  descripcion: string | null;
  activo: boolean;
}): ApartamentoActivoItem => ({
  id: activo.id,
  apartamentoId: activo.apartamentoId,
  apartamentoNumero: activo.apartamento.numero,
  tipoActivoId: activo.tipoActivoId,
  tipoActivoNombre: activo.tipoActivo.nombre,
  tipoHabitacionId: activo.tipoHabitacionId,
  tipoHabitacionNombre: activo.tipoHabitacion?.nombre,
  identificador: activo.identificador,
  descripcion: activo.descripcion,
  activo: activo.activo,
});

export async function getApartamentoActivos(): Promise<ApartamentoActivoItem[]> {
  try {
    const activos = await prisma.apartamentoActivo.findMany({
      where: await buildTenantWhere({}),
      include: {
        apartamento: { select: { numero: true } },
        tipoActivo: { select: { nombre: true } },
        tipoHabitacion: { select: { nombre: true } },
      },
      orderBy: [{ apartamento: { numero: "asc" } }, { identificador: "asc" }],
    });

    return activos.map(mapActivo);
  } catch (error) {
    logServerActionError("getApartamentoActivos", error);
    return [];
  }
}

export async function getApartamentoActivoById(id: string): Promise<ApartamentoActivoItem | null> {
  try {
    const activo = await prisma.apartamentoActivo.findFirst({
      where: await buildTenantWhere({ id }),
      include: {
        apartamento: { select: { numero: true } },
        tipoActivo: { select: { nombre: true } },
        tipoHabitacion: { select: { nombre: true } },
      },
    });

    return activo ? mapActivo(activo) : null;
  } catch (error) {
    logServerActionError("getApartamentoActivoById", error);
    return null;
  }
}

export async function getActivosFormOptions(): Promise<{
  apartamentos: ApartamentoOption[];
  tiposActivos: TipoActivoOption[];
  tiposHabitacion: TipoHabitacionOption[];
}> {
  const [apartamentos, tiposActivos, tiposHabitacion] = await Promise.all([
    prisma.apartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      select: { id: true, numero: true },
      orderBy: { numero: "asc" },
    }),
    prisma.tipoActivoApartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      select: { id: true, nombre: true },
      orderBy: { nombre: "asc" },
    }),
    prisma.tiposHabitacion.findMany({
      where: await buildTenantWhere({ activo: true }),
      select: { id: true, nombre: true },
      orderBy: { nombre: "asc" },
    }),
  ]);

  return { apartamentos, tiposActivos, tiposHabitacion };
}

export async function postTipoActivoApartamento(nombre: string): Promise<{ ok: boolean; id?: string; message?: string }> {
  try {
    const tenantId = await getTenantIdFromSession();
    const nombreNormalizado = nombre.trim();

    if (!nombreNormalizado) {
      return { ok: false, message: "El nombre del tipo de activo es obligatorio." };
    }

    const tipo = await prisma.tipoActivoApartamento.upsert({
      where: {
        tenantId_nombre: {
          tenantId,
          nombre: nombreNormalizado,
        },
      },
      update: { activo: true },
      create: {
        tenantId,
        nombre: nombreNormalizado,
        activo: true,
      },
    });

    return { ok: true, id: tipo.id };
  } catch (error) {
    logServerActionError("postTipoActivoApartamento", error);
    return { ok: false, message: "No se pudo guardar el tipo de activo." };
  }
}

export async function postApartamentoActivo({ activo }: { activo: ApartamentoActivoMutationInput }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession();
    await prisma.apartamentoActivo.create({
      data: {
        tenantId,
        apartamentoId: activo.apartamentoId,
        tipoActivoId: activo.tipoActivoId,
        tipoHabitacionId: activo.tipoHabitacionId || null,
        identificador: activo.identificador.trim(),
        descripcion: activo.descripcion?.trim() || null,
        activo: resolveActivo(activo.activo),
      },
    });

    return true;
  } catch (error) {
    logServerActionError("postApartamentoActivo", error);
    return false;
  }
}

export async function putApartamentoActivo({ activo }: { activo: ApartamentoActivoMutationInput }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession();
    const activoId = requireEntityId(activo.id, "activo");

    const updated = await prisma.apartamentoActivo.updateMany({
      where: { id: activoId, tenantId },
      data: {
        apartamentoId: activo.apartamentoId,
        tipoActivoId: activo.tipoActivoId,
        tipoHabitacionId: activo.tipoHabitacionId || null,
        identificador: activo.identificador.trim(),
        descripcion: activo.descripcion?.trim() || null,
        activo: resolveActivo(activo.activo),
      },
    });

    if (updated.count === 0) {
      throw new Error("Activo no encontrado para el tenant actual.");
    }

    return true;
  } catch (error) {
    logServerActionError("putApartamentoActivo", error);
    return false;
  }
}
