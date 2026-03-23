"use server";

import { addDays, differenceInCalendarDays, endOfMonth, startOfMonth } from "date-fns";

import { EstadoMantenimiento } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { resolveEstadoOperativoUnidad, type EstadoOperativoUnidad } from "@/lib/property-status";
import { buildTenantWhere } from "@/lib/tenant-session";

const toNumber = (value: { toString(): string } | number | null | undefined) => Number(value ?? 0);

export type DashboardMetricCard = {
  title: string;
  value: number;
  subtitle: string;
};

export type DashboardRentabilidadItem = {
  apartamentoId: string;
  apartamento: string;
  inquilino: string;
  ingresoMensual: number;
  gastoEstimado: number;
  rentabilidad: number;
  margen: number;
  estadoOperativo: EstadoOperativoUnidad;
};

export type DashboardAlertItem = {
  id: string;
  apartamento?: string;
  inquilino?: string;
  detalle: string;
  dias?: number;
  monto?: number;
};

export type DashboardData = {
  resumen: {
    apartamentosOcupados: DashboardMetricCard;
    apartamentosVacios: DashboardMetricCard;
    contratosPorVencer: DashboardMetricCard;
    inquilinosConAtraso: DashboardMetricCard;
    montoCobradoMes: DashboardMetricCard;
    montoPendienteMes: DashboardMetricCard;
    gastosMes: DashboardMetricCard;
    fueraServicio: DashboardMetricCard;
  };
  ocupacion: {
    total: number;
    ocupados: number;
    vacios: number;
    porcentaje: number;
  };
  rentabilidadPorApartamento: DashboardRentabilidadItem[];
  alertas: {
    contratosPorVencer: DashboardAlertItem[];
    inquilinosConAtraso: DashboardAlertItem[];
    apartamentosFueraServicio: DashboardAlertItem[];
  };
  metadata: {
    fechaCorte: string;
    mesActual: string;
    gastosEstimados: boolean;
  };
};

export async function getDashboardData(): Promise<DashboardData> {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const cutoff = addDays(now, 30);

  const [apartamentos, contratosActivos, recibosMes, gastosMes, mantenimientosAbiertos] = await Promise.all([
    prisma.apartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      orderBy: {
        numero: "asc",
      },
    }),
    prisma.contratos.findMany({
      where: await buildTenantWhere({ activo: true }),
      include: {
        inquilino: true,
        apartamento: true,
      },
      orderBy: {
        fechaFin: "asc",
      },
    }),
    prisma.recibos.findMany({
      where: await buildTenantWhere({
        fechaPago: {
          gte: start,
          lte: end,
        },
      }),
      include: {
        contrato: {
          include: {
            apartamento: true,
          },
        },
      },
    }),
    prisma.gastoApartamento.findMany({
      where: await buildTenantWhere({
        fecha: {
          gte: start,
          lte: end,
        },
      }),
      include: {
        apartamento: true,
      },
    }),
    prisma.mantenimientoIncidencia.findMany({
      where: await buildTenantWhere({
        afectaDisponibilidad: true,
        estado: {
          not: EstadoMantenimiento.RESUELTO,
        },
      }),
      include: {
        apartamento: true,
        contrato: {
          include: {
            inquilino: true,
          },
        },
      },
      orderBy: [{ fechaReporte: "desc" }, { createAt: "desc" }],
    }),
  ]);

  const recibosPorContrato = new Map<string, number>();
  const ingresosPorApartamento = new Map<string, number>();
  for (const recibo of recibosMes) {
    const totalRecibo = toNumber(recibo.total);
    recibosPorContrato.set(recibo.contratoId, (recibosPorContrato.get(recibo.contratoId) ?? 0) + totalRecibo);
    ingresosPorApartamento.set(
      recibo.contrato.apartamentoId,
      (ingresosPorApartamento.get(recibo.contrato.apartamentoId) ?? 0) + totalRecibo
    );
  }

  const gastosPorApartamento = new Map<string, number>();
  for (const gasto of gastosMes) {
    gastosPorApartamento.set(
      gasto.apartamentoId,
      (gastosPorApartamento.get(gasto.apartamentoId) ?? 0) + toNumber(gasto.monto)
    );
  }

  const apartamentosOcupadosIds = new Set(contratosActivos.map((contrato) => contrato.apartamentoId));
  const mantenimientoPorApartamento = new Map(
    mantenimientosAbiertos.map((mantenimiento) => [mantenimiento.apartamentoId, mantenimiento])
  );

  const apartamentosOcupados = apartamentos.filter((apartamento) => apartamentosOcupadosIds.has(apartamento.id));
  const apartamentosVacios = apartamentos.filter(
    (apartamento) =>
      !apartamentosOcupadosIds.has(apartamento.id) && !mantenimientoPorApartamento.has(apartamento.id)
  );
  const apartamentosFueraServicio = apartamentos.filter((apartamento) => mantenimientoPorApartamento.has(apartamento.id));

  const contratosPorVencer = contratosActivos
    .filter((contrato) => contrato.fechaFin && contrato.fechaFin >= now && contrato.fechaFin <= cutoff)
    .map((contrato) => ({
      id: contrato.id,
      apartamento: contrato.apartamento.numero,
      inquilino: contrato.inquilino.nombreCompleto,
      dias: differenceInCalendarDays(contrato.fechaFin!, now),
      detalle: `Finaliza el ${contrato.fechaFin!.toLocaleDateString("es-HN")}`,
    }));

  const contratoPorApartamento = new Map(
    contratosActivos.map((contrato) => [contrato.apartamentoId, contrato])
  );

  const rentabilidadPorApartamento = apartamentos
    .map((apartamento) => {
      const contrato = contratoPorApartamento.get(apartamento.id);
      const ingresoMensual = ingresosPorApartamento.get(apartamento.id) ?? 0;
      const gastoEstimado = gastosPorApartamento.get(apartamento.id) ?? 0;
      const rentabilidad = ingresoMensual - gastoEstimado;
      const margen = ingresoMensual > 0 ? (rentabilidad / ingresoMensual) * 100 : gastoEstimado > 0 ? -100 : 0;
      const estadoOperativo = resolveEstadoOperativoUnidad({
        hasActiveContract: Boolean(contrato),
        hasBlockingMaintenance: mantenimientoPorApartamento.has(apartamento.id),
      });

      return {
        apartamentoId: apartamento.id,
        apartamento: apartamento.numero,
        inquilino: contrato?.inquilino.nombreCompleto ?? "Sin contrato activo",
        ingresoMensual,
        gastoEstimado,
        rentabilidad,
        margen,
        estadoOperativo,
      };
    })
    .sort((a, b) => b.rentabilidad - a.rentabilidad);

  const inquilinosConAtraso = contratosActivos
    .map((contrato) => {
      const cobradoContrato = recibosPorContrato.get(contrato.id) ?? 0;
      const esperado = toNumber(contrato.montoMensual);
      const pendiente = Math.max(esperado - cobradoContrato, 0);

      return {
        id: contrato.id,
        apartamento: contrato.apartamento.numero,
        inquilino: contrato.inquilino.nombreCompleto,
        monto: pendiente,
        detalle:
          pendiente > 0
            ? `Cobrado ${cobradoContrato.toLocaleString("es-HN", { style: "currency", currency: "HNL" })} de ${esperado.toLocaleString("es-HN", { style: "currency", currency: "HNL" })}`
            : "Sin saldo pendiente",
      };
    })
    .filter((contrato) => (contrato.monto ?? 0) > 0)
    .sort((a, b) => (b.monto ?? 0) - (a.monto ?? 0));

  const montoCobradoMes = recibosMes.reduce((total, recibo) => total + toNumber(recibo.total), 0);
  const montoPendienteMes = inquilinosConAtraso.reduce((total, contrato) => total + (contrato.monto ?? 0), 0);
  const totalGastosMes = gastosMes.reduce((total, gasto) => total + toNumber(gasto.monto), 0);

  return {
    resumen: {
      apartamentosOcupados: {
        title: "Apartamentos ocupados",
        value: apartamentosOcupados.length,
        subtitle: `${apartamentos.length} unidades activas en cartera`,
      },
      apartamentosVacios: {
        title: "Apartamentos vacíos",
        value: apartamentosVacios.length,
        subtitle: "Disponibles para nueva colocación y sin bloqueo operativo",
      },
      contratosPorVencer: {
        title: "Contratos por vencer",
        value: contratosPorVencer.length,
        subtitle: "Próximos 30 días",
      },
      inquilinosConAtraso: {
        title: "Inquilinos con atraso",
        value: inquilinosConAtraso.length,
        subtitle: "Con saldo pendiente este mes",
      },
      montoCobradoMes: {
        title: "Cobrado del mes",
        value: montoCobradoMes,
        subtitle: "Dinero cobrado en recibos del mes actual",
      },
      montoPendienteMes: {
        title: "Aún por cobrar este mes",
        value: montoPendienteMes,
        subtitle: "Lo que todavía falta cobrar en contratos activos",
      },
      gastosMes: {
        title: "Gastos operativos del mes",
        value: totalGastosMes,
        subtitle: "Egresos reales cargados por propiedad en este mes",
      },
      fueraServicio: {
        title: "Apartamentos fuera de servicio",
        value: apartamentosFueraServicio.length,
        subtitle: "Solo unidades bloqueadas por incidencias o mantenimiento abierto",
      },
    },
    ocupacion: {
      total: apartamentos.length,
      ocupados: apartamentosOcupados.length,
      vacios: apartamentosVacios.length,
      porcentaje: apartamentos.length > 0 ? (apartamentosOcupados.length / apartamentos.length) * 100 : 0,
    },
    rentabilidadPorApartamento,
    alertas: {
      contratosPorVencer,
      inquilinosConAtraso,
      apartamentosFueraServicio: Array.from(mantenimientoPorApartamento.values()).map((mantenimiento) => ({
        id: mantenimiento.id,
        apartamento: mantenimiento.apartamento.numero,
        inquilino: mantenimiento.contrato?.inquilino?.nombreCompleto,
        detalle: `${mantenimiento.titulo}. ${mantenimiento.proveedorAsignado ? `Proveedor: ${mantenimiento.proveedorAsignado}. ` : ""}Estado: ${mantenimiento.estado.toLowerCase().replace("_", " ")}`,
      })),
    },
    metadata: {
      fechaCorte: now.toISOString(),
      mesActual: now.toLocaleDateString("es-HN", { month: "long", year: "numeric" }),
      gastosEstimados: false,
    },
  };
}
