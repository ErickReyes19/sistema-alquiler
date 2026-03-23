"use server";

import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";

import {
  Contrato,
  ContratoAjusteRenta,
  ContratoCreate,
  ContratoEntrega,
  ContratoInventario,
  ContratoRenovacion,
  ContratoUpdate,
  ContratoView,
  EstadoOperacionContrato,
  EstadoRenovacionContrato,
  HistorialOcupacionApartamento,
  RegistrarAjusteRentaInput,
  RegistrarEntregaInput,
  RegistrarInventarioInput,
  RegistrarRenovacionInput,
  TipoInventarioContrato,
} from "./type";

const contratoInclude = {
  inquilino: true,
  apartamento: true,
  entrega: true,
} as const;

const contratoViewInclude = {
  inquilino: true,
  apartamento: {
    include: {
      apartamento: {
        include: {
          tipoHabitacion: true,
        },
      },
      ApartamentoServicios: {
        include: {
          servicio: true,
        },
      },
    },
  },
  renovaciones: {
    orderBy: {
      fechaGestion: "desc",
    },
  },
  ajustesRenta: {
    orderBy: {
      fechaAplicacion: "desc",
    },
  },
  inventarios: {
    orderBy: {
      fechaRegistro: "desc",
    },
  },
  entrega: true,
} as const;

type ContratoWithRelations = Prisma.ContratosGetPayload<{
  include: typeof contratoInclude;
}>;

type ContratoViewRecord = Prisma.ContratosGetPayload<{
  include: typeof contratoViewInclude;
}>;

const DEFAULT_PREAVISO_DIAS = 30;

function toNumber(value: Prisma.Decimal | number | null | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  return Number(value.toString());
}

function normalizeOptionalText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeInventoryItems(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

function calculatePercentage(previousAmount: number, nextAmount: number) {
  if (previousAmount <= 0) {
    return 0;
  }

  return Number((((nextAmount - previousAmount) / previousAmount) * 100).toFixed(2));
}

function getLifecycleSnapshot(data: {
  activo: boolean;
  fechaFin: Date | null;
  fechaDesocupacion?: Date | null;
  preavisoDias?: number | null;
}) {
  const today = startOfDay(new Date());
  const fechaFin = data.fechaFin ? startOfDay(data.fechaFin) : null;
  const fechaDesocupacion = data.fechaDesocupacion ? startOfDay(data.fechaDesocupacion) : null;
  const preavisoDias = data.preavisoDias ?? DEFAULT_PREAVISO_DIAS;

  const diasParaVencer = fechaFin ? differenceInCalendarDays(fechaFin, today) : null;
  const alertaVencimiento = diasParaVencer !== null && diasParaVencer >= 0 && diasParaVencer <= preavisoDias;
  const vencido = diasParaVencer !== null && diasParaVencer < 0;
  const desocupado = Boolean(fechaDesocupacion);

  let estadoOperacion: EstadoOperacionContrato = "VIGENTE";

  if (desocupado) {
    estadoOperacion = "DESOCUPADO";
  } else if (!data.activo) {
    estadoOperacion = "INACTIVO";
  } else if (vencido) {
    estadoOperacion = "VENCIDO";
  } else if (alertaVencimiento) {
    estadoOperacion = "POR_VENCER";
  }

  return {
    diasParaVencer,
    alertaVencimiento,
    requiereRenovacion: alertaVencimiento || vencido,
    estadoOperacion,
  };
}

function mapRenovacion(renovacion: ContratoViewRecord["renovaciones"][number]): ContratoRenovacion {
  return {
    id: renovacion.id,
    fechaGestion: renovacion.fechaGestion.toISOString(),
    fechaInicioRenovada: renovacion.fechaInicioRenovada.toISOString(),
    fechaFinRenovada: renovacion.fechaFinRenovada?.toISOString() ?? null,
    montoAnterior: toNumber(renovacion.montoAnterior),
    montoNuevo: toNumber(renovacion.montoNuevo),
    porcentajeAjuste: toNumber(renovacion.porcentajeAjuste),
    estado: renovacion.estado as EstadoRenovacionContrato,
    notas: renovacion.notas ?? undefined,
  };
}

function mapAjusteRenta(ajuste: ContratoViewRecord["ajustesRenta"][number]): ContratoAjusteRenta {
  return {
    id: ajuste.id,
    fechaAplicacion: ajuste.fechaAplicacion.toISOString(),
    montoAnterior: toNumber(ajuste.montoAnterior),
    montoNuevo: toNumber(ajuste.montoNuevo),
    porcentajeAjuste: toNumber(ajuste.porcentajeAjuste),
    motivo: ajuste.motivo ?? undefined,
  };
}

function mapInventario(inventario: ContratoViewRecord["inventarios"][number]): ContratoInventario {
  const rawItems = Array.isArray(inventario.items) ? inventario.items : [];

  return {
    id: inventario.id,
    tipo: inventario.tipo as TipoInventarioContrato,
    fechaRegistro: inventario.fechaRegistro.toISOString(),
    observaciones: inventario.observaciones ?? undefined,
    items: rawItems.filter((item): item is string => typeof item === "string"),
  };
}

function mapEntrega(entrega: ContratoViewRecord["entrega"]): ContratoEntrega | null {
  if (!entrega) {
    return null;
  }

  return {
    id: entrega.id,
    fechaEntrega: entrega.fechaEntrega.toISOString(),
    estadoInmueble: entrega.estadoInmueble,
    cargosDanos: toNumber(entrega.cargosDanos),
    saldoPendiente: toNumber(entrega.saldoPendiente),
    motivoCancelacion: entrega.motivoCancelacion ?? undefined,
    observaciones: entrega.observaciones ?? undefined,
  };
}

function mapContrato(data: ContratoWithRelations): Contrato {
  const lifecycle = getLifecycleSnapshot({
    activo: data.activo,
    fechaFin: data.fechaFin,
    fechaDesocupacion: data.fechaDesocupacion,
    preavisoDias: data.preavisoDias,
  });

  return {
    id: data.id,
    inquilinoId: data.inquilinoId,
    apartamentoId: data.apartamentoId,
    fechaInicio: data.fechaInicio.toISOString(),
    fechaFin: data.fechaFin?.toISOString() ?? null,
    montoMensual: toNumber(data.montoMensual),
    activo: data.activo,
    preavisoDias: data.preavisoDias,
    estadoRenovacion: data.estadoRenovacion as EstadoRenovacionContrato,
    fechaDesocupacion: data.fechaDesocupacion?.toISOString() ?? null,
    motivoCancelacion: data.motivoCancelacion ?? null,
    diasParaVencer: lifecycle.diasParaVencer,
    requiereRenovacion: lifecycle.requiereRenovacion,
    alertaVencimiento: lifecycle.alertaVencimiento,
    estadoOperacion: lifecycle.estadoOperacion,
    inquilino: data.inquilino?.nombreCompleto ?? "",
    apartamento: data.apartamento?.numero ?? "",
  };
}

async function updateApartmentAvailability(
  tx: { apartamento: Pick<typeof prisma.apartamento, "updateMany"> },
  tenantId: string,
  apartamentoId: string,
  disponible: boolean,
) {
  await tx.apartamento.updateMany({
    where: { id: apartamentoId, tenantId },
    data: { disponible },
  });
}

async function getApartmentOccupancyHistory(apartamentoId: string): Promise<HistorialOcupacionApartamento[]> {
  const contratos = await prisma.contratos.findMany({
    where: await buildTenantWhere({ apartamentoId }),
    include: {
      inquilino: true,
      entrega: true,
    },
    orderBy: {
      fechaInicio: "desc",
    },
  });

  return contratos.map((contrato) => {
    const lifecycle = getLifecycleSnapshot({
      activo: contrato.activo,
      fechaFin: contrato.fechaFin,
      fechaDesocupacion: contrato.fechaDesocupacion,
      preavisoDias: contrato.preavisoDias,
    });

    return {
      contratoId: contrato.id,
      inquilino: contrato.inquilino.nombreCompleto,
      fechaInicio: contrato.fechaInicio.toISOString(),
      fechaFin: contrato.fechaFin?.toISOString() ?? null,
      fechaDesocupacion: contrato.fechaDesocupacion?.toISOString() ?? null,
      motivoCancelacion: contrato.motivoCancelacion ?? contrato.entrega?.motivoCancelacion ?? null,
      montoMensual: toNumber(contrato.montoMensual),
      estadoOperacion: lifecycle.estadoOperacion,
    };
  });
}

function revalidateContratoPaths(contratoId: string) {
  revalidatePath("/contratos");
  revalidatePath(`/contratos/${contratoId}/view`);
  revalidatePath(`/contratos/${contratoId}/edit`);
}

export async function getContratos(): Promise<Contrato[]> {
  try {
    const response = await prisma.contratos.findMany({
      where: await buildTenantWhere(),
      include: contratoInclude,
      orderBy: {
        fechaInicio: "desc",
      },
    });

    return response.map(mapContrato);
  } catch (error) {
    console.error("Error al obtener los contratos:", error);
    return [];
  }
}

export async function postContrato({ contrato }: { contrato: ContratoCreate }): Promise<Contrato> {
  try {
    const tenantId = await getTenantIdFromSession();

    const newContrato = await prisma.$transaction(async (tx) => {
      const created = await tx.contratos.create({
        data: {
          tenantId,
          inquilinoId: contrato.inquilinoId,
          apartamentoId: contrato.apartamentoId,
          fechaInicio: new Date(contrato.fechaInicio),
          fechaFin: contrato.fechaFin ? new Date(contrato.fechaFin) : null,
          montoMensual: contrato.montoMensual,
          preavisoDias: contrato.preavisoDias ?? DEFAULT_PREAVISO_DIAS,
          activo: contrato.activo ?? true,
          estadoRenovacion: contrato.fechaFin ? "ALERTA_GENERADA" : "SIN_GESTION",
        },
        include: contratoInclude,
      });

      await updateApartmentAvailability(tx, tenantId, contrato.apartamentoId, false);
      return created;
    });

    revalidatePath("/contratos");
    return mapContrato(newContrato);
  } catch (error) {
    console.error("Error en postContrato:", error);
    throw new Error("Error al crear el contrato");
  }
}

export async function putContrato({ contrato }: { contrato: ContratoUpdate }): Promise<Contrato> {
  try {
    const tenantId = await getTenantIdFromSession();
    const existing = await prisma.contratos.findFirst({
      where: { id: contrato.id, tenantId },
      include: contratoInclude,
    });

    if (!existing) {
      throw new Error("Contrato no encontrado para el tenant actual");
    }

    const updatedContrato = await prisma.$transaction(async (tx) => {
      if (existing.apartamentoId !== contrato.apartamentoId) {
        await updateApartmentAvailability(tx, tenantId, existing.apartamentoId, true);
        await updateApartmentAvailability(tx, tenantId, contrato.apartamentoId, false);
      }

      const updated = await tx.contratos.update({
        where: { id: contrato.id },
        data: {
          inquilinoId: contrato.inquilinoId,
          apartamentoId: contrato.apartamentoId,
          fechaInicio: new Date(contrato.fechaInicio),
          fechaFin: contrato.fechaFin ? new Date(contrato.fechaFin) : null,
          montoMensual: contrato.montoMensual,
          preavisoDias: contrato.preavisoDias ?? DEFAULT_PREAVISO_DIAS,
          activo: contrato.activo,
          estadoRenovacion: contrato.estadoRenovacion ?? existing.estadoRenovacion,
          motivoCancelacion: normalizeOptionalText(contrato.motivoCancelacion),
          fechaDesocupacion: contrato.fechaDesocupacion ? new Date(contrato.fechaDesocupacion) : null,
        },
        include: contratoInclude,
      });

      if (!updated.activo || updated.fechaDesocupacion) {
        await updateApartmentAvailability(tx, tenantId, updated.apartamentoId, true);
      }

      return updated;
    });

    revalidateContratoPaths(contrato.id!);
    return mapContrato(updatedContrato);
  } catch (error) {
    console.error("Error en putContrato:", error);
    throw new Error("Error al actualizar el contrato");
  }
}

export async function getContratoById(id: string): Promise<Contrato | null> {
  try {
    const contrato = await prisma.contratos.findFirst({
      where: await buildTenantWhere({ id }),
      include: contratoInclude,
    });

    return contrato ? mapContrato(contrato) : null;
  } catch (error) {
    console.error("Error al obtener el contrato:", error);
    return null;
  }
}

export async function getContratoByIdView(id: string): Promise<ContratoView | null> {
  try {
    const contrato = await prisma.contratos.findFirst({
      where: await buildTenantWhere({ id }),
      include: contratoViewInclude,
    });

    if (!contrato) {
      return null;
    }

    const lifecycle = getLifecycleSnapshot({
      activo: contrato.activo,
      fechaFin: contrato.fechaFin,
      fechaDesocupacion: contrato.fechaDesocupacion,
      preavisoDias: contrato.preavisoDias,
    });

    const historialOcupacion = await getApartmentOccupancyHistory(contrato.apartamentoId);

    return {
      id: contrato.id,
      inquilinoId: contrato.inquilinoId,
      apartamentoId: contrato.apartamentoId,
      fechaInicio: contrato.fechaInicio.toISOString(),
      fechaFin: contrato.fechaFin?.toISOString() ?? null,
      montoMensual: toNumber(contrato.montoMensual),
      activo: contrato.activo,
      preavisoDias: contrato.preavisoDias,
      estadoRenovacion: contrato.estadoRenovacion as EstadoRenovacionContrato,
      fechaUltimaRenovacion: contrato.fechaUltimaRenovacion?.toISOString() ?? null,
      fechaDesocupacion: contrato.fechaDesocupacion?.toISOString() ?? null,
      motivoCancelacion: contrato.motivoCancelacion ?? null,
      notasCierre: contrato.notasCierre ?? null,
      diasParaVencer: lifecycle.diasParaVencer,
      requiereRenovacion: lifecycle.requiereRenovacion,
      alertaVencimiento: lifecycle.alertaVencimiento,
      estadoOperacion: lifecycle.estadoOperacion,
      inquiliniIdentidad: contrato.inquilino.dni,
      inquilino: contrato.inquilino?.nombreCompleto ?? "",
      apartamento: {
        numero: contrato.apartamento.numero,
        direccion: contrato.apartamento.direccion || undefined,
        habitaciones: contrato.apartamento.apartamento.map((habitacion) => ({
          id: habitacion.id,
          tipoHabitacionId: habitacion.tipoHabitacionId,
          tipoHabitacionNombre: habitacion.tipoHabitacion.nombre,
          cantidad: habitacion.cantidad,
          activo: habitacion.activo,
        })),
        servicios: contrato.apartamento.ApartamentoServicios.map((servicio) => ({
          id: servicio.id,
          servicioId: servicio.servicioId,
          servicioNombre: servicio.servicio.nombre,
          incluido: servicio.incluido,
          costoAdicional: toNumber(servicio.costoAdicional),
        })),
        historialOcupacion,
      },
      renovaciones: contrato.renovaciones.map(mapRenovacion),
      ajustesRenta: contrato.ajustesRenta.map(mapAjusteRenta),
      inventarios: contrato.inventarios.map(mapInventario),
      entrega: mapEntrega(contrato.entrega),
    };
  } catch (error) {
    console.error("Error al obtener el contrato:", error);
    return null;
  }
}

export async function registrarRenovacionContrato(input: RegistrarRenovacionInput): Promise<void> {
  const tenantId = await getTenantIdFromSession();
  const contrato = await prisma.contratos.findFirst({
    where: { id: input.contratoId, tenantId },
  });

  if (!contrato) {
    throw new Error("Contrato no encontrado.");
  }

  const montoAnterior = toNumber(contrato.montoMensual);
  const montoNuevo = Number(input.montoNuevo);
  const porcentajeAjuste = calculatePercentage(montoAnterior, montoNuevo);

  await prisma.$transaction(async (tx) => {
    await tx.renovacionContrato.create({
      data: {
        tenantId,
        contratoId: input.contratoId,
        fechaGestion: new Date(input.fechaGestion),
        fechaInicioRenovada: new Date(input.fechaInicioRenovada),
        fechaFinRenovada: input.fechaFinRenovada ? new Date(input.fechaFinRenovada) : null,
        montoAnterior,
        montoNuevo,
        porcentajeAjuste,
        estado: input.estado,
        notas: normalizeOptionalText(input.notas),
      },
    });

    const updateData: Prisma.ContratosUpdateInput = {
      estadoRenovacion: input.estado,
    };

    if (input.estado === "RENOVADO") {
      updateData.fechaFin = input.fechaFinRenovada ? new Date(input.fechaFinRenovada) : null;
      updateData.fechaUltimaRenovacion = new Date(input.fechaGestion);
      updateData.montoMensual = montoNuevo;
      updateData.activo = true;
      updateData.fechaDesocupacion = null;
      updateData.motivoCancelacion = null;
      updateData.notasCierre = null;
    }

    await tx.contratos.update({
      where: { id: input.contratoId },
      data: updateData,
    });

    if (input.estado === "RENOVADO" && montoNuevo !== montoAnterior) {
      await tx.ajusteRentaContrato.create({
        data: {
          tenantId,
          contratoId: input.contratoId,
          fechaAplicacion: new Date(input.fechaGestion),
          montoAnterior,
          montoNuevo,
          porcentajeAjuste,
          motivo: "Ajuste aplicado durante renovación",
        },
      });
    }
  });

  revalidateContratoPaths(input.contratoId);
}

export async function registrarAjusteRentaContrato(input: RegistrarAjusteRentaInput): Promise<void> {
  const tenantId = await getTenantIdFromSession();
  const contrato = await prisma.contratos.findFirst({
    where: { id: input.contratoId, tenantId },
  });

  if (!contrato) {
    throw new Error("Contrato no encontrado.");
  }

  const montoAnterior = toNumber(contrato.montoMensual);
  const montoNuevo = Number(input.montoNuevo);
  const porcentajeAjuste = calculatePercentage(montoAnterior, montoNuevo);

  await prisma.$transaction(async (tx) => {
    await tx.ajusteRentaContrato.create({
      data: {
        tenantId,
        contratoId: input.contratoId,
        fechaAplicacion: new Date(input.fechaAplicacion),
        montoAnterior,
        montoNuevo,
        porcentajeAjuste,
        motivo: normalizeOptionalText(input.motivo),
      },
    });

    await tx.contratos.update({
      where: { id: input.contratoId },
      data: {
        montoMensual: montoNuevo,
      },
    });
  });

  revalidateContratoPaths(input.contratoId);
}

export async function registrarInventarioContrato(input: RegistrarInventarioInput): Promise<void> {
  const tenantId = await getTenantIdFromSession();
  const contrato = await prisma.contratos.findFirst({
    where: { id: input.contratoId, tenantId },
  });

  if (!contrato) {
    throw new Error("Contrato no encontrado.");
  }

  await prisma.contratoInventario.upsert({
    where: {
      contratoId_tipo: {
        contratoId: input.contratoId,
        tipo: input.tipo,
      },
    },
    update: {
      fechaRegistro: new Date(input.fechaRegistro),
      observaciones: normalizeOptionalText(input.observaciones),
      items: normalizeInventoryItems(input.items),
    },
    create: {
      tenantId,
      contratoId: input.contratoId,
      tipo: input.tipo,
      fechaRegistro: new Date(input.fechaRegistro),
      observaciones: normalizeOptionalText(input.observaciones),
      items: normalizeInventoryItems(input.items),
    },
  });

  revalidateContratoPaths(input.contratoId);
}

export async function registrarEntregaContrato(input: RegistrarEntregaInput): Promise<void> {
  const tenantId = await getTenantIdFromSession();
  const contrato = await prisma.contratos.findFirst({
    where: { id: input.contratoId, tenantId },
  });

  if (!contrato) {
    throw new Error("Contrato no encontrado.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.contratoEntrega.upsert({
      where: {
        contratoId: input.contratoId,
      },
      update: {
        fechaEntrega: new Date(input.fechaEntrega),
        estadoInmueble: input.estadoInmueble,
        cargosDanos: input.cargosDanos,
        saldoPendiente: input.saldoPendiente,
        motivoCancelacion: normalizeOptionalText(input.motivoCancelacion),
        observaciones: normalizeOptionalText(input.observaciones),
      },
      create: {
        tenantId,
        contratoId: input.contratoId,
        fechaEntrega: new Date(input.fechaEntrega),
        estadoInmueble: input.estadoInmueble,
        cargosDanos: input.cargosDanos,
        saldoPendiente: input.saldoPendiente,
        motivoCancelacion: normalizeOptionalText(input.motivoCancelacion),
        observaciones: normalizeOptionalText(input.observaciones),
      },
    });

    await tx.contratos.update({
      where: { id: input.contratoId },
      data: {
        activo: false,
        fechaDesocupacion: new Date(input.fechaEntrega),
        motivoCancelacion: normalizeOptionalText(input.motivoCancelacion),
        notasCierre: normalizeOptionalText(input.observaciones),
        estadoRenovacion: "NO_RENOVADO",
      },
    });

    await updateApartmentAvailability(tx, tenantId, contrato.apartamentoId, true);
  });

  revalidateContratoPaths(input.contratoId);
}
