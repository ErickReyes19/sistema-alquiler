import { format } from "date-fns";
import { es } from "date-fns/locale";

import type { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type";
import { downloadPdf } from "./simple-pdf";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(amount);

export function downloadReciboPdf(recibo: ReciboCompleto) {
  const totalExigible = recibo.total + recibo.cargoMora;

  const lines: string[] = [
    "RECIBO DE PAGO",
    `Numero de recibo: ${recibo.id}`,
    `Estado: ${recibo.estado.replaceAll("_", " ")}`,
    "",
    "=== FECHAS ===",
    `Fecha de pago: ${format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    `Fecha de vencimiento: ${format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    "",
    "=== INQUILINO ===",
    `Nombre: ${recibo.contrato.inquilino.nombre}`,
    `Identidad: ${recibo.contrato.inquilino.identidad}`,
    `Telefono: ${recibo.contrato.inquilino.numero}`,
    `Correo: ${recibo.contrato.inquilino.correo ?? "Sin correo"}`,
    "",
    "=== INMUEBLE ===",
    `Apartamento: ${recibo.contrato.apartamento.numero}`,
    `Direccion: ${recibo.contrato.apartamento.direccion}`,
    "",
    "=== DETALLE DE CONCEPTOS ===",
    ...recibo.detalles.map((detalle) => `- ${detalle.descripcion}: ${formatCurrency(detalle.monto)}`),
    "",
    "=== RESUMEN FINANCIERO ===",
    `Total facturado: ${formatCurrency(recibo.total)}`,
    `Recargo por mora: ${formatCurrency(recibo.cargoMora)}`,
    `Pagado acumulado: ${formatCurrency(recibo.montoPagado)}`,
    `Total exigible: ${formatCurrency(totalExigible)}`,
    `Saldo pendiente: ${formatCurrency(recibo.saldoPendiente)}`,
    "",
    `Documento generado el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `recibo-${recibo.id}.pdf`);
}
