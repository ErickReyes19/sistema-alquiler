import { EstadoRecibo } from "@/lib/generated/prisma";

export type EstadoReciboValue = keyof typeof EstadoRecibo;

export function calcularEstadoRecibo({
  total,
  cargoMora,
  montoPagado,
  fechaVencimiento,
  hoy = new Date(),
}: {
  total: number;
  cargoMora: number;
  montoPagado: number;
  fechaVencimiento: Date;
  hoy?: Date;
}) {
  const montoExigible = Math.max(total + cargoMora, 0);
  const saldoPendiente = Math.max(montoExigible - montoPagado, 0);

  let estado: EstadoRecibo = EstadoRecibo.PENDIENTE;

  if (saldoPendiente <= 0.00001) {
    estado = EstadoRecibo.PAGADO;
  } else if (montoPagado > 0) {
    estado = EstadoRecibo.PARCIALMENTE_PAGADO;
  } else if (fechaVencimiento.getTime() < hoy.getTime()) {
    estado = EstadoRecibo.VENCIDO;
  }

  return {
    estado,
    saldoPendiente: Number(saldoPendiente.toFixed(2)),
    montoExigible: Number(montoExigible.toFixed(2)),
  };
}

export function normalizarTelefonoWhatsapp(telefono: string) {
  return telefono.replace(/\D/g, "");
}

export function crearMensajeCobranza(input: {
  inquilino: string;
  apartamento: string;
  saldoPendiente: number;
  fechaVencimiento: Date;
}) {
  const saldo = input.saldoPendiente.toLocaleString("es-HN", {
    style: "currency",
    currency: "HNL",
  });

  return `Hola ${input.inquilino}, te recordamos que el recibo del apartamento ${input.apartamento} tiene un saldo pendiente de ${saldo} con vencimiento ${input.fechaVencimiento.toLocaleDateString("es-HN")}. Por favor coordina tu pago.`;
}
