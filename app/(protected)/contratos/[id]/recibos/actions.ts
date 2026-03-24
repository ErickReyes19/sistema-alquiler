"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { calcularEstadoRecibo } from "@/lib/cobranza";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import { normalizeUploadedAssets } from "@/lib/uploaded-asset";
import {
  DetallesParaNuevoRecibo,
  Recibo,
  ReciboCompleto,
  ReciboCreate,
  ReciboDetalleCreate,
  ReciboDetalleUpdate,
  ReciboUpdate,
  ReciboView,
} from "./type";

const toNumber = (value: { toString(): string } | number | null | undefined) => Number(value ?? 0);

function buildDueDateFromContractDay(referenceDate: Date, diaPagoMensual: number): Date {
  const safeDay = Math.min(Math.max(diaPagoMensual, 1), 31);
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const thisMonthLastDay = new Date(year, month + 1, 0).getDate();
  const thisMonthDueDate = new Date(year, month, Math.min(safeDay, thisMonthLastDay));

  if (referenceDate <= thisMonthDueDate) {
    return thisMonthDueDate;
  }

  const nextMonthLastDay = new Date(year, month + 2, 0).getDate();
  return new Date(year, month + 1, Math.min(safeDay, nextMonthLastDay));
}

async function resolveReciboDates(tenantId: string, contratoId: string, explicitFechaPago?: string, explicitFechaVencimiento?: string) {
  const fechaPago = explicitFechaPago ? new Date(explicitFechaPago) : new Date();

  if (explicitFechaVencimiento) {
    return { fechaPago, fechaVencimiento: new Date(explicitFechaVencimiento) };
  }

  const contrato = await prisma.contratos.findFirst({
    where: { id: contratoId, tenantId },
    select: { diaPagoMensual: true },
  });

  const diaPagoMensual = contrato?.diaPagoMensual ?? 1;
  return {
    fechaPago,
    fechaVencimiento: buildDueDateFromContractDay(fechaPago, diaPagoMensual),
  };
}

function mapRecibo(data: any): Recibo {
  const montoPagado = data.pagosParciales?.reduce((sum: number, pago: any) => sum + toNumber(pago.monto), 0) ?? 0;
  const financials = calcularEstadoRecibo({
    total: toNumber(data.total),
    cargoMora: toNumber(data.cargoMora),
    montoPagado,
    fechaVencimiento: new Date(data.fechaVencimiento),
  });

  return {
    id: data.id,
    contratoId: data.contratoId,
    fechaPago: data.fechaPago.toISOString(),
    fechaVencimiento: data.fechaVencimiento.toISOString(),
    total: toNumber(data.total),
    cargoMora: toNumber(data.cargoMora),
    saldoPendiente: financials.saldoPendiente,
    estado: financials.estado,
    observacionesCobranza: data.observacionesCobranza,
    evidencias: normalizeUploadedAssets(data.evidencias),
  };
}

function mapReciboView(data: any): ReciboView {
  const montoPagado = data.pagosParciales?.reduce((sum: number, pago: any) => sum + toNumber(pago.monto), 0) ?? 0;
  const financials = calcularEstadoRecibo({
    total: toNumber(data.total),
    cargoMora: toNumber(data.cargoMora),
    montoPagado,
    fechaVencimiento: new Date(data.fechaVencimiento),
  });

  return {
    id: data.id,
    contratoId: data.contratoId,
    fechaPago: data.fechaPago.toISOString(),
    fechaVencimiento: data.fechaVencimiento.toISOString(),
    total: toNumber(data.total),
    cargoMora: toNumber(data.cargoMora),
    saldoPendiente: financials.saldoPendiente,
    estado: financials.estado,
    observacionesCobranza: data.observacionesCobranza,
    evidencias: normalizeUploadedAssets(data.evidencias),
    montoPagado,
    detalles: (data.detalles ?? []).map((d: any) => ({
      id: d.id,
      reciboId: d.reciboId,
      descripcion: d.descripcion,
      monto: toNumber(d.monto),
    })),
    pagosParciales: (data.pagosParciales ?? []).map((pago: any) => ({
      id: pago.id,
      fechaPago: pago.fechaPago.toISOString(),
      monto: toNumber(pago.monto),
      referencia: pago.referencia,
      nota: pago.nota,
    })),
    promesasPago: (data.promesasPago ?? []).map((promesa: any) => ({
      id: promesa.id,
      fechaPrometida: promesa.fechaPrometida.toISOString(),
      montoPrometido: toNumber(promesa.montoPrometido),
      nota: promesa.nota,
      cumplida: promesa.cumplida,
      fechaCumplimiento: promesa.fechaCumplimiento?.toISOString() ?? null,
    })),
    recordatorios: (data.recordatorios ?? []).map((recordatorio: any) => ({
      id: recordatorio.id,
      canal: recordatorio.canal,
      destinatario: recordatorio.destinatario,
      mensaje: recordatorio.mensaje,
      enviadoAt: recordatorio.enviadoAt.toISOString(),
    })),
  };
}

async function syncReciboState(reciboId: string, tenantId: string) {
  const recibo = await prisma.recibos.findFirst({
    where: { id: reciboId, tenantId },
    include: { pagosParciales: true },
  });

  if (!recibo) {
    return null;
  }

  const montoPagado = recibo.pagosParciales.reduce((sum, pago) => sum + toNumber(pago.monto), 0);
  const financials = calcularEstadoRecibo({
    total: toNumber(recibo.total),
    cargoMora: toNumber(recibo.cargoMora),
    montoPagado,
    fechaVencimiento: recibo.fechaVencimiento,
  });

  if (
    recibo.estado !== financials.estado ||
    Number(recibo.saldoPendiente) !== financials.saldoPendiente
  ) {
    await prisma.recibos.update({
      where: { id: reciboId },
      data: {
        estado: financials.estado,
        saldoPendiente: financials.saldoPendiente,
      },
    });
  }

  return financials;
}

function revalidateReciboPaths(contratoId: string, reciboId?: string) {
  revalidatePath(`/contratos/${contratoId}/recibos`);
  if (reciboId) {
    revalidatePath(`/contratos/${contratoId}/recibos/${reciboId}/view`);
    revalidatePath(`/contratos/${contratoId}/recibos/${reciboId}/edit`);
    revalidatePath(`/recibo/${reciboId}/imprimir`);
  }
  revalidatePath("/cobranza");
  revalidatePath("/dashboard");
}

export async function getRecibosByContrato(contratoId: string): Promise<ReciboView[]> {
  try {
    const tenantId = await getTenantIdFromSession();
    const recibos = await prisma.recibos.findMany({
      where: await buildTenantWhere({ contratoId }),
      include: {
        detalles: true,
        pagosParciales: { orderBy: { fechaPago: "desc" } },
        promesasPago: { orderBy: { fechaPrometida: "desc" } },
        recordatorios: { orderBy: { enviadoAt: "desc" } },
      },
      orderBy: [{ fechaVencimiento: "desc" }, { fechaPago: "desc" }],
    });

    await Promise.all(recibos.map((recibo) => syncReciboState(recibo.id, tenantId)));
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
    const tenantId = await getTenantIdFromSession();
    const { fechaPago, fechaVencimiento } = await resolveReciboDates(
      tenantId,
      recibo.contratoId,
      recibo.fechaPago,
      recibo.fechaVencimiento
    );
    const total = detalles.reduce((sum, d) => sum + d.monto, 0);
    const financials = calcularEstadoRecibo({
      total,
      cargoMora: recibo.cargoMora,
      montoPagado: 0,
      fechaVencimiento,
    });

    const created = await prisma.recibos.create({
      data: {
        tenantId,
        contratoId: recibo.contratoId,
        fechaPago,
        fechaVencimiento,
        total,
        cargoMora: recibo.cargoMora,
        saldoPendiente: financials.saldoPendiente,
        estado: financials.estado,
        observacionesCobranza: recibo.observacionesCobranza?.trim() || null,
        evidencias: recibo.evidencias?.length ? recibo.evidencias : undefined,
        detalles: {
          create: detalles.map((d) => ({
            tenantId,
            descripcion: d.descripcion,
            monto: d.monto,
          })),
        },
      },
      include: {
        detalles: true,
        pagosParciales: true,
        promesasPago: true,
        recordatorios: true,
      },
    });

    revalidateReciboPaths(recibo.contratoId, created.id);
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
    const tenantId = await getTenantIdFromSession();
    const { fechaPago, fechaVencimiento } = await resolveReciboDates(
      tenantId,
      recibo.contratoId,
      recibo.fechaPago,
      recibo.fechaVencimiento
    );
    const total = detalles.reduce((sum, d) => sum + d.monto, 0);
    const idsEntrantes = detalles.filter((d) => !!d.id).map((d) => d.id!) as string[];

    const pagosActuales = await prisma.pagoRecibo.findMany({
      where: { tenantId, reciboId: recibo.id! },
    });
    const montoPagado = pagosActuales.reduce((sum, pago) => sum + toNumber(pago.monto), 0);
    const financials = calcularEstadoRecibo({
      total,
      cargoMora: recibo.cargoMora,
      montoPagado,
      fechaVencimiento,
    });

    await prisma.$transaction([
      prisma.recibos.updateMany({
        where: { id: recibo.id, tenantId },
        data: {
          fechaPago,
          fechaVencimiento,
          total,
          cargoMora: recibo.cargoMora,
          saldoPendiente: financials.saldoPendiente,
          estado: financials.estado,
          observacionesCobranza: recibo.observacionesCobranza?.trim() || null,
          evidencias: recibo.evidencias?.length ? recibo.evidencias : undefined,
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
      include: {
        detalles: true,
        pagosParciales: { orderBy: { fechaPago: "desc" } },
        promesasPago: { orderBy: { fechaPrometida: "desc" } },
        recordatorios: { orderBy: { enviadoAt: "desc" } },
      },
    });

    revalidateReciboPaths(recibo.contratoId, recibo.id);
    return updated ? mapReciboView(updated) : null;
  } catch (error) {
    console.error("Error al actualizar recibo:", error);
    return null;
  }
}

export async function getReciboById(id: string): Promise<ReciboView | null> {
  try {
    const tenantId = await getTenantIdFromSession();
    const recibo = await prisma.recibos.findFirst({
      where: await buildTenantWhere({ id }),
      include: {
        detalles: true,
        pagosParciales: { orderBy: { fechaPago: "desc" } },
        promesasPago: { orderBy: { fechaPrometida: "desc" } },
        recordatorios: { orderBy: { enviadoAt: "desc" } },
      },
    });
    if (!recibo) return null;

    await syncReciboState(id, tenantId);
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
  });

  if (!contrato || !contrato.apartamento) return null;

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
  };
}

export async function getReciboCompletoById(reciboId: string): Promise<ReciboCompleto | null> {
  try {
    const tenantId = await getTenantIdFromSession();
    const recibo = await prisma.recibos.findFirst({
      where: await buildTenantWhere({ id: reciboId }),
      include: {
        detalles: true,
        pagosParciales: { orderBy: { fechaPago: "desc" } },
        promesasPago: { orderBy: { fechaPrometida: "desc" } },
        recordatorios: { orderBy: { enviadoAt: "desc" } },
        contrato: {
          include: {
            inquilino: true,
            apartamento: true,
          },
        },
      },
    });

    if (!recibo) return null;

    const synced = await syncReciboState(reciboId, tenantId);
    const montoPagado = recibo.pagosParciales.reduce((sum, pago) => sum + toNumber(pago.monto), 0);

    return {
      id: recibo.id,
      fechaPago: recibo.fechaPago,
      fechaVencimiento: recibo.fechaVencimiento,
      total: Number(recibo.total),
      cargoMora: Number(recibo.cargoMora),
      saldoPendiente: synced?.saldoPendiente ?? Number(recibo.saldoPendiente),
      estado: synced?.estado ?? recibo.estado,
      observacionesCobranza: recibo.observacionesCobranza,
      montoPagado,
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
          correo: recibo.contrato.inquilino.correo,
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
      pagosParciales: recibo.pagosParciales.map((pago) => ({
        id: pago.id,
        fechaPago: pago.fechaPago.toISOString(),
        monto: Number(pago.monto),
        referencia: pago.referencia,
        nota: pago.nota,
      })),
      promesasPago: recibo.promesasPago.map((promesa) => ({
        id: promesa.id,
        fechaPrometida: promesa.fechaPrometida.toISOString(),
        montoPrometido: Number(promesa.montoPrometido),
        nota: promesa.nota,
        cumplida: promesa.cumplida,
        fechaCumplimiento: promesa.fechaCumplimiento?.toISOString() ?? null,
      })),
      recordatorios: recibo.recordatorios.map((recordatorio) => ({
        id: recordatorio.id,
        canal: recordatorio.canal,
        destinatario: recordatorio.destinatario,
        mensaje: recordatorio.mensaje,
        enviadoAt: recordatorio.enviadoAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error al obtener el recibo completo:", error);
    return null;
  }
}


export async function registrarPagoTotalRecibo(reciboId: string) {
  const tenantId = await getTenantIdFromSession();
  const recibo = await prisma.recibos.findFirst({
    where: { id: reciboId, tenantId },
    include: { pagosParciales: true },
  });

  if (!recibo) {
    throw new Error("Recibo no encontrado.");
  }

  const montoPagado = recibo.pagosParciales.reduce((sum, pago) => sum + toNumber(pago.monto), 0);
  const financials = calcularEstadoRecibo({
    total: toNumber(recibo.total),
    cargoMora: toNumber(recibo.cargoMora),
    montoPagado,
    fechaVencimiento: recibo.fechaVencimiento,
  });

  if (financials.saldoPendiente <= 0) {
    throw new Error("Este recibo ya está totalmente pagado.");
  }

  await prisma.pagoRecibo.create({
    data: {
      tenantId,
      reciboId,
      monto: financials.saldoPendiente,
      fechaPago: new Date(),
      referencia: "PAGO_TOTAL",
      nota: "Pago total registrado desde el sistema.",
    },
  });

  await syncReciboState(reciboId, tenantId);
  revalidateReciboPaths(recibo.contratoId, recibo.id);
}

export async function registrarPagoParcialRecibo(input: {
  reciboId: string;
  monto: number;
  fechaPago: string;
  referencia?: string;
  nota?: string;
}) {
  const tenantId = await getTenantIdFromSession();
  const recibo = await prisma.recibos.findFirst({
    where: { id: input.reciboId, tenantId },
  });

  if (!recibo) {
    throw new Error("Recibo no encontrado.");
  }

  if (input.monto <= 0) {
    throw new Error("El monto del pago parcial debe ser mayor a cero.");
  }

  await prisma.pagoRecibo.create({
    data: {
      tenantId,
      reciboId: input.reciboId,
      monto: input.monto,
      fechaPago: new Date(input.fechaPago),
      referencia: input.referencia?.trim() || null,
      nota: input.nota?.trim() || null,
    },
  });

  await syncReciboState(input.reciboId, tenantId);
  revalidateReciboPaths(recibo.contratoId, recibo.id);
}

export async function registrarPromesaPagoRecibo(input: {
  reciboId: string;
  fechaPrometida: string;
  montoPrometido: number;
  nota?: string;
}) {
  const tenantId = await getTenantIdFromSession();
  const recibo = await prisma.recibos.findFirst({
    where: { id: input.reciboId, tenantId },
  });

  if (!recibo) {
    throw new Error("Recibo no encontrado.");
  }

  await prisma.promesaPago.create({
    data: {
      tenantId,
      reciboId: input.reciboId,
      fechaPrometida: new Date(input.fechaPrometida),
      montoPrometido: input.montoPrometido,
      nota: input.nota?.trim() || null,
    },
  });

  revalidateReciboPaths(recibo.contratoId, recibo.id);
}

export async function registrarRecordatorioRecibo(input: {
  reciboId: string;
  canal: "WHATSAPP" | "EMAIL";
  destinatario: string;
  mensaje: string;
}) {
  const tenantId = await getTenantIdFromSession();
  const recibo = await prisma.recibos.findFirst({
    where: { id: input.reciboId, tenantId },
  });

  if (!recibo) {
    throw new Error("Recibo no encontrado.");
  }

  await prisma.recordatorioCobranza.create({
    data: {
      tenantId,
      reciboId: input.reciboId,
      canal: input.canal,
      destinatario: input.destinatario,
      mensaje: input.mensaje,
    },
  });

  revalidateReciboPaths(recibo.contratoId, recibo.id);
}

export async function marcarPromesaPagoCumplida(promesaId: string) {
  const tenantId = await getTenantIdFromSession();
  const promesa = await prisma.promesaPago.findFirst({
    where: { id: promesaId, tenantId },
    include: { recibo: true },
  });

  if (!promesa) {
    throw new Error("Promesa de pago no encontrada.");
  }

  await prisma.promesaPago.update({
    where: { id: promesaId },
    data: {
      cumplida: true,
      fechaCumplimiento: new Date(),
    },
  });

  revalidateReciboPaths(promesa.recibo.contratoId, promesa.reciboId);
}
