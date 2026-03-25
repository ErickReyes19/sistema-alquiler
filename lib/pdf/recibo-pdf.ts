import { format } from "date-fns";
import { es } from "date-fns/locale";

import type { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type";
import { downloadPdf } from "./simple-pdf";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(amount);

const SEP = "--------------------------------------------------------------------------------";

export function downloadReciboPdf(recibo: ReciboCompleto) {
  const totalExigible = recibo.total + recibo.cargoMora;

  const lines: string[] = [
    "RECIBO DE PAGO",
    "Diseno PDF basado en la vista de impresion del recibo",
    SEP,
    `Numero de recibo: #${recibo.id} || Estado: ${recibo.estado.replaceAll("_", " ")}`,
    `Documento generado: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
    "",
    "I. FECHAS DEL RECIBO",
    `Fecha de pago: ${format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    `Fecha de vencimiento: ${format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    "",
    "II. INQUILINO",
    `Nombre: ${recibo.contrato.inquilino.nombre}`,
    `Identidad: ${recibo.contrato.inquilino.identidad}`,
    `Telefono: ${recibo.contrato.inquilino.numero}`,
    `Correo: ${recibo.contrato.inquilino.correo ?? "Sin correo registrado"}`,
    "",
    "III. INMUEBLE",
    `Apartamento: #${recibo.contrato.apartamento.numero}`,
    `Direccion: ${recibo.contrato.apartamento.direccion}`,
    "",
    "IV. DETALLE DE CONCEPTOS",
    "Concepto || Monto",
    ...recibo.detalles
      .sort((a, b) => b.monto - a.monto)
      .map((detalle) => `${detalle.descripcion} || ${formatCurrency(detalle.monto)}`),
    "",
    "V. RESUMEN FINANCIERO",
    `Total facturado: ${formatCurrency(recibo.total)}`,
    `Recargo por mora: ${formatCurrency(recibo.cargoMora)}`,
    `Pagado acumulado: ${formatCurrency(recibo.montoPagado)}`,
    `Total exigible: ${formatCurrency(totalExigible)}`,
    `Saldo pendiente: ${formatCurrency(recibo.saldoPendiente)}`,
    "",
    "VI. DECLARACION",
    "Este recibo certifica el estado de cuenta del arrendamiento correspondiente.",
    SEP,
    `Generado el ${format(new Date(), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `recibo-${recibo.id}.pdf`);
}
