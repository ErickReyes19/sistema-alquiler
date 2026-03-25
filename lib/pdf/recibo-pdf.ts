import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type";
import { downloadPdf } from "./simple-pdf";

const formatCurrency = (amount: number) =>
  `L ${new Intl.NumberFormat("es-HN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;

export function downloadReciboPdf(recibo: ReciboCompleto) {
  const totalExigible = recibo.total + recibo.cargoMora;

  const lines: string[] = [
    "@title RECIBO DE PAGO",
    `@meta Recibo #${recibo.id} | Estado: ${recibo.estado.replaceAll("_", " ")} | Generado: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,

    "@section Fechas",
    `@row Fecha de pago || ${format(new Date(recibo.fechaPago), "dd/MM/yyyy", { locale: es })}`,
    `@row Fecha de vencimiento || ${format(new Date(recibo.fechaVencimiento), "dd/MM/yyyy", { locale: es })}`,

    "@section Inquilino",
    `@row Nombre || ${recibo.contrato.inquilino.nombre}`,
    `@row Identidad || ${recibo.contrato.inquilino.identidad}`,
    `@row Teléfono || ${recibo.contrato.inquilino.numero}`,
    `@row Correo || ${recibo.contrato.inquilino.correo ?? "Sin correo"}`,

    "@section Inmueble",
    `@row Apartamento || #${recibo.contrato.apartamento.numero}`,
    `@row Dirección || ${recibo.contrato.apartamento.direccion}`,

    "@section Conceptos",
    ...recibo.detalles
      .sort((a, b) => b.monto - a.monto)
      .map((d) => `@row ${d.descripcion} || ${formatCurrency(d.monto)}`),

    "@section Resumen financiero",
    `@row Total facturado || ${formatCurrency(recibo.total)}`,
    `@row Recargo por mora || ${formatCurrency(recibo.cargoMora)}`,
    `@row Pagado acumulado || ${formatCurrency(recibo.montoPagado)}`,
    `@highlight Total exigible || ${formatCurrency(totalExigible)}`,
    `@row Saldo pendiente || ${formatCurrency(recibo.saldoPendiente)}`,

    "@section Declaración legal",
    `@legal Este recibo refleja los pagos y saldo pendiente al momento de su emisión.`,
    `@legal Puede utilizarse como constancia interna de pago.`,

    `@note Generado el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `recibo-${recibo.id}.pdf`);
}
