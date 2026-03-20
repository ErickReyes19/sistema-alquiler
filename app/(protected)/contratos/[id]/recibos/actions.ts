"use server";

import { prisma } from "@/lib/prisma";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import {
  Recibo,
  ReciboCreate,
  ReciboUpdate,
  ReciboView,
  ReciboDetalleCreate,
  ReciboDetalleUpdate,
  DetallesParaNuevoRecibo,
  ReciboCompleto,
} from "./type";

function mapRecibo(data: any): Recibo {
  return {
    id: data.id,
    contratoId: data.contratoId,
    fechaPago: data.fechaPago.toISOString(),
    total: parseFloat(data.total.toString()),
  };
}

function mapReciboView(data: any): ReciboView {
  return {
    id: data.id,
    contratoId: data.contratoId,
    fechaPago: data.fechaPago.toISOString(),
    total: parseFloat(data.total.toString()),
    detalles: data.detalles.map((d: any) => ({
      id: d.id,
      descripcion: d.descripcion,
      monto: parseFloat(d.monto.toString()),
    })),
  };
}

export async function getRecibosByContrato(
  contratoId: string
): Promise<ReciboView[]> {
  try {
    const recibos = await prisma.recibos.findMany({
      where: await buildTenantWhere({ contratoId }),
      include: {
        detalles: true,
      },
      orderBy: { fechaPago: "desc" },
    });
    return recibos.map(mapReciboView);
  } catch (error) {
    console.error("Error al obtener recibos:", error);
    return [];
  }
}

export async function postReciboConDetalles({
  recibo,
  detalles,
}: {
  recibo: ReciboCreate;
  detalles: ReciboDetalleCreate[];
}): Promise<ReciboView | null> {
  try {
    const tenantId = await getTenantIdFromSession()
    const total = detalles.reduce((sum, d) => sum + d.monto, 0);

    const created = await prisma.recibos.create({
      data: {
        tenantId,
        contratoId: recibo.contratoId,
        fechaPago: new Date(recibo.fechaPago),
        total,
        detalles: {
          create: detalles.map((d) => ({
            tenantId,
            descripcion: d.descripcion,
            monto: d.monto,
          })),
        },
      },
      include: { detalles: true },
    });

    return mapReciboView(created);
  } catch (error) {
    console.error("Error al crear recibo:", error);
    return null;
  }
}

export async function putReciboConDetalles({
  recibo,
  detalles,
}: {
  recibo: ReciboUpdate;
  detalles: ReciboDetalleUpdate[];
}): Promise<ReciboView | null> {
  try {
    const tenantId = await getTenantIdFromSession()
    const total = detalles.reduce((sum, d) => sum + d.monto, 0);
    const idsEntrantes = detalles.filter((d) => !!d.id).map((d) => d.id!) as string[];

    await prisma.$transaction([
      prisma.recibos.updateMany({
        where: { id: recibo.id, tenantId },
        data: {
          fechaPago: new Date(recibo.fechaPago),
          total,
        },
      }),
      prisma.reciboDetalles.deleteMany({
        where: {
          tenantId,
          reciboId: recibo.id,
          id: { notIn: idsEntrantes },
        },
      }),
      ...detalles
        .filter((d) => d.id)
        .map((d) =>
          prisma.reciboDetalles.updateMany({
            where: { id: d.id!, tenantId },
            data: {
              descripcion: d.descripcion,
              monto: d.monto,
            },
          })
        ),
      ...detalles
        .filter((d) => !d.id)
        .map((d) =>
          prisma.reciboDetalles.create({
            data: {
              tenantId,
              descripcion: d.descripcion,
              monto: d.monto,
              reciboId: recibo.id!,
            },
          })
        ),
    ]);

    const updated = await prisma.recibos.findFirst({
      where: { id: recibo.id, tenantId },
      include: { detalles: true },
    });
    return updated ? mapReciboView(updated) : null;
  } catch (error) {
    console.error("Error al actualizar recibo:", error);
    return null;
  }
}

export async function getReciboById(id: string): Promise<ReciboView | null> {
  try {
    const recibo = await prisma.recibos.findFirst({
      where: await buildTenantWhere({ id }),
      include: { detalles: true },
    });
    if (!recibo) return null;
    return mapReciboView(recibo);
  } catch (error) {
    console.error("Error al obtener recibo por ID:", error);
    return null;
  }
}

export async function getDetallesParaNuevoRecibo(contratoId: string): Promise<DetallesParaNuevoRecibo | null> {
  const contrato = await prisma.contratos.findFirst({
    where: await buildTenantWhere({ id: contratoId }),
    include: {
      apartamento: {
        include: {
          ApartamentoServicios: {
            include: {
              servicio: true,
            },
          },
        },
      },
    },
  })

  if (!contrato || !contrato.apartamento) return null

  return {
    contratoId: contrato.id,
    montoMensual: contrato.montoMensual.toString(),
    apartamento: {
      id: contrato.apartamento.id,
      numero: contrato.apartamento.numero,
    },
    servicios: contrato.apartamento.ApartamentoServicios.map((aps) => ({
      id: aps.id,
      nombre: aps.servicio.nombre,
      costoAdicional: aps.costoAdicional.toString(),
      incluido: aps.incluido,
    })),
  }
}

export async function getReciboCompletoById(reciboId: string): Promise<ReciboCompleto | null> {
  try {
    const recibo = await prisma.recibos.findFirst({
      where: await buildTenantWhere({ id: reciboId }),
      include: {
        detalles: true,
        contrato: {
          include: {
            inquilino: true,
            apartamento: true,
          },
        },
      },
    });

    if (!recibo) return null;

    return {
      id: recibo.id,
      fechaPago: recibo.fechaPago,
      total: Number(recibo.total),
      contrato: {
        id: recibo.contrato.id,
        fechaInicio: recibo.contrato.fechaInicio,
        fechaFin: recibo.contrato.fechaFin,
        montoMensual: Number(recibo.contrato.montoMensual),
        activo: recibo.contrato.activo,
        inquilino: {
          id: recibo.contrato.inquilino.id,
          nombre: recibo.contrato.inquilino.nombreCompleto,
          identidad: recibo.contrato.inquilino.dni,
          numero: recibo.contrato.inquilino.numero,
        },
        apartamento: {
          id: recibo.contrato.apartamento.id,
          numero: recibo.contrato.apartamento.numero,
          direccion: recibo.contrato.apartamento.direccion || "Sin Dirección",
        },
      },
      detalles: recibo.detalles.map((d) => ({
        id: d.id,
        descripcion: d.descripcion,
        monto: Number(d.monto),
      })),
    };
  } catch (error) {
    console.error("Error al obtener el recibo completo:", error);
    return null;
  }
}
