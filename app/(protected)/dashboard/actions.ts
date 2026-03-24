"use server";

import { addDays, differenceInCalendarDays, endOfMonth, format, startOfDay, startOfMonth } from "date-fns";

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
    contratosPorIniciar: DashboardMetricCard;
    contratosPorVencer: DashboardMetricCard;
    inquilinosConAtraso: DashboardMetricCard;
    contratosAlDiaMes: DashboardMetricCard;
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
    contratosPorIniciar: DashboardAlertItem[];
    contratosPorVencer: DashboardAlertItem[];
    inquilinosConAtraso: DashboardAlertItem[];
    estadoPagoMesActual: DashboardAlertItem[];
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
  const today = startOfDay(now);
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const cutoff = addDays(today, 30);

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
      orderBy: [{ fechaInicio: "asc" }, { fechaFin: "asc" }],
    }),
    prisma.recibos.findMany({
      where: await buildTenantWhere({
        fechaPago: {
          gte: start,
          lte: end,
        },
      }),
      include: {
        pagosParciales: true,
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

  const contratosVigentes = contratosActivos.filter((contrato) => startOfDay(contrato.fechaInicio) <= today);
  const contratosPorIniciarRaw = contratosActivos.filter((contrato) => startOfDay(contrato.fechaInicio) > today);

  const pagosPorContrato = new Map<string, number>();
  const ingresosPorApartamento = new Map<string, number>();
  for (const recibo of recibosMes) {
    const totalPagadoRecibo = recibo.pagosParciales.reduce((sum, pago) => sum + toNumber(pago.monto), 0);
    pagosPorContrato.set(recibo.contratoId, (pagosPorContrato.get(recibo.contratoId) ?? 0) + totalPagadoRecibo);
    ingresosPorApartamento.set(
      recibo.contrato.apartamentoId,
      (ingresosPorApartamento.get(recibo.contrato.apartamentoId) ?? 0) + totalPagadoRecibo,
    );
  }

  const gastosPorApartamento = new Map<string, number>();
  for (const gasto of gastosMes) {
    gastosPorApartamento.set(
      gasto.apartamentoId,
      (gastosPorApartamento.get(gasto.apartamentoId) ?? 0) + toNumber(gasto.monto),
    );
  }

  const apartamentosOcupadosIds = new Set(contratosVigentes.map((contrato) => contrato.apartamentoId));
  const mantenimientoPorApartamento = new Map(
    mantenimientosAbiertos.map((mantenimiento) => [mantenimiento.apartamentoId, mantenimiento]),
  );

  const apartamentosOcupados = apartamentos.filter((apartamento) => apartamentosOcupadosIds.has(apartamento.id));
  const apartamentosVacios = apartamentos.filter(
    (apartamento) =>
      !apartamentosOcupadosIds.has(apartamento.id) && !mantenimientoPorApartamento.has(apartamento.id),
  );
  const apartamentosFueraServicio = apartamentos.filter((apartamento) => mantenimientoPorApartamento.has(apartamento.id));

  const contratosPorIniciar = contratosPorIniciarRaw
    .map((contrato) => ({
      id: contrato.id,
      apartamento: contrato.apartamento.numero,
      inquilino: contrato.inquilino.nombreCompleto,
      dias: differenceInCalendarDays(startOfDay(contrato.fechaInicio), today),
      detalle: `Inicia el ${contrato.fechaInicio.toLocaleDateString("es-HN")}`,
    }))
    .sort((a, b) => (a.dias ?? 0) - (b.dias ?? 0));

  const contratosPorVencer = contratosVigentes
    .filter((contrato) => contrato.fechaFin && contrato.fechaFin >= now && contrato.fechaFin <= cutoff)
    .map((contrato) => ({
      id: contrato.id,
      apartamento: contrato.apartamento.numero,
      inquilino: contrato.inquilino.nombreCompleto,
      dias: differenceInCalendarDays(contrato.fechaFin!, now),
      detalle: `Finaliza el ${contrato.fechaFin!.toLocaleDateString("es-HN")}`,
    }));

  const contratoPorApartamento = new Map(contratosActivos.map((contrato) => [contrato.apartamentoId, contrato]));

  const rentabilidadPorApartamento = apartamentos
    .map((apartamento) => {
      const contrato = contratoPorApartamento.get(apartamento.id);
      const ingresoMensual = ingresosPorApartamento.get(apartamento.id) ?? 0;
      const gastoEstimado = gastosPorApartamento.get(apartamento.id) ?? 0;
      const rentabilidad = ingresoMensual - gastoEstimado;
      const margen = ingresoMensual > 0 ? (rentabilidad / ingresoMensual) * 100 : gastoEstimado > 0 ? -100 : 0;
      const estadoOperativo = resolveEstadoOperativoUnidad({
        hasActiveContract: apartamentosOcupadosIds.has(apartamento.id),
        hasBlockingMaintenance: mantenimientoPorApartamento.has(apartamento.id),
      });

      return {
        apartamentoId: apartamento.id,
        apartamento: apartamento.numero,
        inquilino:
          contrato && startOfDay(contrato.fechaInicio) > today
            ? `${contrato.inquilino.nombreCompleto} (inicia ${contrato.fechaInicio.toLocaleDateString("es-HN")})`
            : contrato?.inquilino.nombreCompleto ?? "Sin contrato activo",
        ingresoMensual,
        gastoEstimado,
        rentabilidad,
        margen,
        estadoOperativo,
      };
    })
    .sort((a, b) => b.rentabilidad - a.rentabilidad);

  const estadoPagoMesActual = contratosVigentes
    .map((contrato) => {
      const pagado = pagosPorContrato.get(contrato.id) ?? 0;
      const esperado = toNumber(contrato.montoMensual);
      const pendiente = Math.max(esperado - pagado, 0);

      return {
        id: contrato.id,
        apartamento: contrato.apartamento.numero,
        inquilino: contrato.inquilino.nombreCompleto,
        monto: pendiente,
        detalle:
          pendiente > 0
            ? `Pendiente ${pendiente.toLocaleString("es-HN", { style: "currency", currency: "HNL" })} del mes actual`
            : "Pago del mes actual al día",
      };
    })
    .sort((a, b) => (b.monto ?? 0) - (a.monto ?? 0));

  const inquilinosConAtraso = contratosVigentes
    .map((contrato) => {
      const pagado = pagosPorContrato.get(contrato.id) ?? 0;
      const esperado = toNumber(contrato.montoMensual);
      const pendiente = Math.max(esperado - pagado, 0);

      return {
        id: contrato.id,
        apartamento: contrato.apartamento.numero,
        inquilino: contrato.inquilino.nombreCompleto,
        monto: pendiente,
        detalle: `Pagado ${pagado.toLocaleString("es-HN", { style: "currency", currency: "HNL" })} de ${esperado.toLocaleString("es-HN", { style: "currency", currency: "HNL" })}`,
      };
    })
    .filter((contrato) => (contrato.monto ?? 0) > 0)
    .sort((a, b) => (b.monto ?? 0) - (a.monto ?? 0));

  const montoCobradoMes = recibosMes.reduce(
    (total, recibo) => total + recibo.pagosParciales.reduce((sum, pago) => sum + toNumber(pago.monto), 0),
    0,
  );
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
      contratosPorIniciar: {
        title: "Contratos por iniciar",
        value: contratosPorIniciar.length,
        subtitle: "Registrados hoy, con fecha de inicio futura",
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
      contratosAlDiaMes: {
        title: "Contratos al día (mes)",
        value: estadoPagoMesActual.filter((contrato) => (contrato.monto ?? 0) <= 0).length,
        subtitle: "Pagos del mes actual ya cubiertos",
      },
      montoCobradoMes: {
        title: "Cobrado del mes",
        value: montoCobradoMes,
        subtitle: "Pagos realmente registrados en el mes actual",
      },
      montoPendienteMes: {
        title: "Aún por cobrar este mes",
        value: montoPendienteMes,
        subtitle: "Solo considera contratos cuyo inicio ya comenzó",
      },
      gastosMes: {
        title: "Gastos del mes",
        value: totalGastosMes,
        subtitle: "Egresos operativos registrados en el período",
      },
      fueraServicio: {
        title: "Fuera de servicio",
        value: apartamentosFueraServicio.length,
        subtitle: "Unidades bloqueadas por incidencias o mantenimiento",
      },
    },
    ocupacion: {
      total: apartamentos.length,
      ocupados: apartamentosOcupados.length,
      vacios: apartamentosVacios.length,
      porcentaje: apartamentos.length > 0 ? Number(((apartamentosOcupados.length / apartamentos.length) * 100).toFixed(1)) : 0,
    },
    rentabilidadPorApartamento,
    alertas: {
      contratosPorIniciar,
      contratosPorVencer,
      inquilinosConAtraso,
      estadoPagoMesActual,
      apartamentosFueraServicio: apartamentosFueraServicio.map((apartamento) => {
        const mantenimiento = mantenimientoPorApartamento.get(apartamento.id);

        return {
          id: apartamento.id,
          apartamento: apartamento.numero,
          inquilino: mantenimiento?.contrato?.inquilino?.nombreCompleto,
          detalle: mantenimiento
            ? `${mantenimiento.titulo} · ${mantenimiento.estado.replaceAll("_", " ")}`
            : "Bloqueado por mantenimiento activo",
        };
      }),
    },
    metadata: {
      fechaCorte: today.toISOString(),
      mesActual: format(now, "MMMM yyyy"),
      gastosEstimados: false,
    },
  };
}
