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
    "RECIBO OFICIAL DE PAGO DE ARRENDAMIENTO",
    "COMPROBANTE CONTABLE Y DE CUMPLIMIENTO CONTRACTUAL",
    SEP,
    `Numero de recibo: ${recibo.id}`,
    `Estado del recibo: ${recibo.estado.replaceAll("_", " ")}`,
    `Fecha de emision: ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    "",
    "I. DATOS DEL CONTRATO E INQUILINO",
    `Contrato relacionado: ${recibo.contrato.id}`,
    `Inquilino: ${recibo.contrato.inquilino.nombre}`,
    `Identidad: ${recibo.contrato.inquilino.identidad}`,
    `Telefono: ${recibo.contrato.inquilino.numero}`,
    `Correo electronico: ${recibo.contrato.inquilino.correo ?? "Sin correo registrado"}`,
    "",
    "II. DATOS DEL INMUEBLE",
    `Apartamento: ${recibo.contrato.apartamento.numero}`,
    `Direccion: ${recibo.contrato.apartamento.direccion}`,
    "",
    "III. PERIODO Y FECHAS DE COBRO",
    `Fecha programada de pago: ${format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    `Fecha limite de vencimiento: ${format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    "",
    "IV. DETALLE DE CONCEPTOS FACTURADOS",
    ...recibo.detalles.map((detalle, index) => `${index + 1}. ${detalle.descripcion}: ${formatCurrency(detalle.monto)}`),
    "",
    "V. RESUMEN FINANCIERO",
    `Subtotal facturado: ${formatCurrency(recibo.total)}`,
    `Recargo por mora: ${formatCurrency(recibo.cargoMora)}`,
    `Total exigible: ${formatCurrency(totalExigible)}`,
    `Pagos aplicados: ${formatCurrency(recibo.montoPagado)}`,
    `Saldo pendiente: ${formatCurrency(recibo.saldoPendiente)}`,
    "",
    "VI. DECLARACION",
    "Este recibo acredita los cargos aplicables al contrato de arrendamiento y su estado de cuenta a la fecha de emision.",
    "Constituye soporte administrativo y puede ser utilizado para fines de control contable y legal.",
    "",
    "Firma responsable de cobro: ____________________",
    "Firma de recibido del inquilino: _______________",
    SEP,
    `Documento generado automaticamente el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `recibo-${recibo.id}.pdf`);
}
