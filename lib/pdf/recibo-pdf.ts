import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type";
import { downloadDocumentPdf } from "./document-pdf";

const formatCurrency = (amount: number) =>
  `L ${new Intl.NumberFormat("es-HN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;

export function downloadReciboPdf(recibo: ReciboCompleto) {
  const totalExigible = recibo.total + recibo.cargoMora;
  const fechaGeneracion = format(new Date(), "dd/MM/yyyy HH:mm", { locale: es });
  const fechaPago = format(new Date(recibo.fechaPago), "dd/MM/yyyy", { locale: es });
  const fechaVencimiento = format(new Date(recibo.fechaVencimiento), "dd/MM/yyyy", { locale: es });

  const conceptos = recibo.detalles
    .sort((a, b) => b.monto - a.monto)
    .map((detalle) => `${detalle.descripcion}: ${formatCurrency(detalle.monto)}`);

  downloadDocumentPdf(
    {
      title: "Recibo de pago de arrendamiento",
      subtitle: `Recibo #${recibo.id} - Estado ${recibo.estado.replaceAll("_", " ")}`,
      metadataLine: `Documento generado el ${fechaGeneracion}`,
      blocks: [
        {
          type: "paragraph",
          text: `Por medio del presente se deja constancia del movimiento de cobro asociado al apartamento #${recibo.contrato.apartamento.numero}, ubicado en ${recibo.contrato.apartamento.direccion}, correspondiente al periodo de pago con vencimiento el ${fechaVencimiento}.`,
        },
        {
          type: "paragraph",
          text: `La parte arrendataria registrada para este recibo es ${recibo.contrato.inquilino.nombre}, identidad ${recibo.contrato.inquilino.identidad}, con fecha de pago reportada para el ${fechaPago}.`,
        },
        { type: "heading", text: "Detalle económico" },
        { type: "list", items: conceptos },
        {
          type: "paragraph",
          text: `El total facturado asciende a ${formatCurrency(recibo.total)}. Se aplica recargo por mora de ${formatCurrency(recibo.cargoMora)}, para un total exigible de ${formatCurrency(totalExigible)}. A la fecha, se registra un pago acumulado de ${formatCurrency(recibo.montoPagado)} y un saldo pendiente de ${formatCurrency(recibo.saldoPendiente)}.`,
        },
        { type: "heading", text: "Declaración" },
        {
          type: "paragraph",
          text: "Este recibo se emite como constancia administrativa y legal del estado de cuenta del arrendamiento al momento de su expedición. Cualquier ajuste posterior deberá reflejarse en un nuevo documento o en anexos de cobranza debidamente fechados.",
        },
      ],
      footer: `Canales de contacto del inquilino: ${recibo.contrato.inquilino.numero}${recibo.contrato.inquilino.correo ? ` | ${recibo.contrato.inquilino.correo}` : ""}`,
    },
    `recibo-${recibo.id}.pdf`,
  );
}
