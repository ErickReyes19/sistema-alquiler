"use server";

import { prisma } from "@/lib/prisma";
import {
  calcularEstadoRecibo,
  crearMensajeCobranza,
  normalizarTelefonoWhatsapp,
} from "@/lib/cobranza";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import {
  marcarPromesaPagoCumplida,
  registrarPagoParcialRecibo,
  registrarPromesaPagoRecibo,
  registrarRecordatorioRecibo,
} from "../contratos/[id]/recibos/actions";

const toNumber = (value: { toString(): string } | number | null | undefined) => Number(value ?? 0);

export type CobranzaResumen = {
  recibosPendientes: number;
  recibosVencidos: number;
  recibosParciales: number;
  saldoPendienteTotal: number;
  contratosConSaldo: number;
  promesasPendientes: number;
};

export type CobranzaReciboItem = {
  id: string;
  contratoId: string;
  apartamento: string;
  inquilino: string;
  telefono: string;
  correo: string;
  fechaEmision: string;
  fechaVencimiento: string;
  total: number;
  cargoMora: number;
  montoPagado: number;
  saldoPendiente: number;
  estado: "PENDIENTE" | "PAGADO" | "VENCIDO" | "PARCIALMENTE_PAGADO";
  ultimaPromesa?: string | null;
  promesasPendientes: number;
  recordatoriosEnviados: number;
  observacionesCobranza?: string | null;
  mensajeCobranza: string;
  whatsappUrl?: string;
  emailUrl?: string;
};

export type ContratoSaldoItem = {
  contratoId: string;
  apartamento: string;
  inquilino: string;
  saldoPendiente: number;
  recibosAbiertos: number;
  montoVencido: number;
};

export type CobranzaData = {
  resumen: CobranzaResumen;
  reporteMorosos: CobranzaReciboItem[];
  recibosAbiertos: CobranzaReciboItem[];
  saldosPorContrato: ContratoSaldoItem[];
};

export async function getCobranzaData(): Promise<CobranzaData> {
  const tenantId = await getTenantIdFromSession();
  const recibos = await prisma.recibos.findMany({
    where: await buildTenantWhere({
      contrato: {
        activo: true,
      },
    }),
    include: {
      pagosParciales: true,
      promesasPago: true,
      recordatorios: true,
      contrato: {
        include: {
          inquilino: true,
          apartamento: true,
        },
      },
    },
    orderBy: [{ fechaVencimiento: "asc" }, { createAt: "desc" }],
  });

  const mapped: CobranzaReciboItem[] = [];

  for (const recibo of recibos) {
    const montoPagado = recibo.pagosParciales.reduce((sum, pago) => sum + toNumber(pago.monto), 0);
    const financials = calcularEstadoRecibo({
      total: toNumber(recibo.total),
      cargoMora: toNumber(recibo.cargoMora),
      montoPagado,
      fechaVencimiento: recibo.fechaVencimiento,
    });

    if (
      recibo.estado !== financials.estado ||
      toNumber(recibo.saldoPendiente) !== financials.saldoPendiente
    ) {
      await prisma.recibos.update({
        where: { id: recibo.id, tenantId },
        data: {
          estado: financials.estado,
          saldoPendiente: financials.saldoPendiente,
        },
      });
    }

    const mensajeCobranza = crearMensajeCobranza({
      inquilino: recibo.contrato.inquilino.nombreCompleto,
      apartamento: recibo.contrato.apartamento.numero,
      saldoPendiente: financials.saldoPendiente,
      fechaVencimiento: recibo.fechaVencimiento,
    });
    const telefono = normalizarTelefonoWhatsapp(recibo.contrato.inquilino.numero || "");
    const correo = recibo.contrato.inquilino.correo || "";
    const ultimaPromesa = recibo.promesasPago.find((promesa) => !promesa.cumplida)?.fechaPrometida ?? null;

    mapped.push({
      id: recibo.id,
      contratoId: recibo.contratoId,
      apartamento: recibo.contrato.apartamento.numero,
      inquilino: recibo.contrato.inquilino.nombreCompleto,
      telefono,
      correo,
      fechaEmision: recibo.fechaPago.toISOString(),
      fechaVencimiento: recibo.fechaVencimiento.toISOString(),
      total: toNumber(recibo.total),
      cargoMora: toNumber(recibo.cargoMora),
      montoPagado,
      saldoPendiente: financials.saldoPendiente,
      estado: financials.estado,
      ultimaPromesa: ultimaPromesa ? ultimaPromesa.toISOString() : null,
      promesasPendientes: recibo.promesasPago.filter((promesa) => !promesa.cumplida).length,
      recordatoriosEnviados: recibo.recordatorios.length,
      observacionesCobranza: recibo.observacionesCobranza,
      mensajeCobranza,
      whatsappUrl: telefono ? `https://wa.me/${telefono}?text=${encodeURIComponent(mensajeCobranza)}` : undefined,
      emailUrl: correo
        ? `mailto:${correo}?subject=${encodeURIComponent("Recordatorio de pago de alquiler")}&body=${encodeURIComponent(mensajeCobranza)}`
        : undefined,
    });
  }

  const recibosAbiertos = mapped
    .filter((recibo) => recibo.saldoPendiente > 0)
    .sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime());

  const reporteMorosos = recibosAbiertos.filter((recibo) => recibo.estado === "VENCIDO");

  const saldosPorContrato = Array.from(
    recibosAbiertos.reduce((acc, recibo) => {
      const current = acc.get(recibo.contratoId) ?? {
        contratoId: recibo.contratoId,
        apartamento: recibo.apartamento,
        inquilino: recibo.inquilino,
        saldoPendiente: 0,
        recibosAbiertos: 0,
        montoVencido: 0,
      };

      current.saldoPendiente += recibo.saldoPendiente;
      current.recibosAbiertos += 1;
      if (recibo.estado === "VENCIDO") {
        current.montoVencido += recibo.saldoPendiente;
      }
      acc.set(recibo.contratoId, current);
      return acc;
    }, new Map<string, ContratoSaldoItem>()).values()
  ).sort((a, b) => b.saldoPendiente - a.saldoPendiente);

  const resumen: CobranzaResumen = {
    recibosPendientes: recibosAbiertos.filter((recibo) => recibo.estado === "PENDIENTE").length,
    recibosVencidos: reporteMorosos.length,
    recibosParciales: recibosAbiertos.filter((recibo) => recibo.estado === "PARCIALMENTE_PAGADO").length,
    saldoPendienteTotal: recibosAbiertos.reduce((sum, recibo) => sum + recibo.saldoPendiente, 0),
    contratosConSaldo: saldosPorContrato.length,
    promesasPendientes: recibosAbiertos.reduce((sum, recibo) => sum + recibo.promesasPendientes, 0),
  };

  return {
    resumen,
    reporteMorosos,
    recibosAbiertos,
    saldosPorContrato,
  };
}

export async function registrarPagoParcial(input: {
  reciboId: string;
  monto: number;
  fechaPago: string;
  referencia?: string;
  nota?: string;
}) {
  return registrarPagoParcialRecibo(input);
}

export async function registrarPromesaPago(input: {
  reciboId: string;
  fechaPrometida: string;
  montoPrometido: number;
  nota?: string;
}) {
  return registrarPromesaPagoRecibo(input);
}

export async function registrarRecordatorio(input: {
  reciboId: string;
  canal: "WHATSAPP" | "EMAIL";
  destinatario: string;
  mensaje: string;
}) {
  return registrarRecordatorioRecibo(input);
}

export async function completarPromesaPago(promesaId: string) {
  return marcarPromesaPagoCumplida(promesaId);
}
