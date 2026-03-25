import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ContratoView } from "@/app/(protected)/contratos/type";
import { downloadDocumentPdf } from "./document-pdf";

const formatDate = (date: string | null) =>
  date ? format(new Date(date), "dd/MM/yyyy", { locale: es }) : "por tiempo indefinido";

const formatCurrency = (amount: number) =>
  `L ${new Intl.NumberFormat("es-HN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;

export function downloadContratoPdf(contrato: ContratoView) {
  const fechaGeneracion = format(new Date(), "dd/MM/yyyy HH:mm", { locale: es });
  const servicios = contrato.apartamento.servicios.map((servicio) => {
    const base = `${servicio.servicioNombre}: ${servicio.incluido ? "incluido" : "no incluido"}`;
    return servicio.costoAdicional > 0 ? `${base} (cargo adicional ${formatCurrency(servicio.costoAdicional)})` : base;
  });

  const habitaciones = contrato.apartamento.habitaciones.map(
    (habitacion) => `${habitacion.tipoHabitacionNombre}: ${habitacion.cantidad}`,
  );

  const clausulas = [
    `La renta mensual pactada es de ${formatCurrency(contrato.montoMensual)} y deberá cancelarse, como fecha límite, el día ${contrato.diaPagoMensual} de cada mes.`,
    `El arrendamiento inicia el ${formatDate(contrato.fechaInicio)} y finaliza el ${formatDate(contrato.fechaFin)}.`,
    `La terminación anticipada por cualquiera de las partes deberá notificarse con al menos ${contrato.preavisoDias} días de antelación.`,
    "El inmueble se destina exclusivamente a uso habitacional y no podrá subarrendarse sin autorización previa y escrita.",
    ...contrato.reglas.map((regla) => `${regla.nombre}: ${regla.descripcion || "de cumplimiento obligatorio durante toda la vigencia contractual."}`),
  ];

  downloadDocumentPdf(
    {
      title: "Contrato de arrendamiento de vivienda",
      subtitle: `Contrato #${contrato.id} - ${contrato.activo ? "Vigente" : "No vigente"}`,
      metadataLine: `Emitido el ${fechaGeneracion}`,
      blocks: [
        {
          type: "paragraph",
          text: `Entre la parte arrendadora y la parte arrendataria ${contrato.inquilino}, con identidad ${contrato.inquiliniIdentidad}, se deja formalizado el presente acuerdo para el uso y goce del inmueble apartamento #${contrato.apartamento.numero}, ubicado en ${contrato.apartamento.direccion ?? "dirección no registrada"}.`,
        },
        { type: "heading", text: "Descripción del inmueble" },
        {
          type: "paragraph",
          text: "El inmueble se entrega en condiciones aptas para habitación y con las características físicas y de servicios detalladas a continuación.",
        },
        { type: "list", items: habitaciones },
        { type: "list", items: servicios },
        { type: "heading", text: "Condiciones contractuales" },
        { type: "list", items: clausulas },
        {
          type: "paragraph",
          text: "Las partes manifiestan que han leído y comprendido el contenido del presente documento, aceptando de forma libre sus términos, obligaciones y derechos derivados de la relación arrendaticia.",
        },
        { type: "spacer", size: 26 },
        {
          type: "signature",
          leftLabel: "Arrendador",
          rightLabel: "Arrendatario",
        },
      ],
      footer: "Este documento fue generado digitalmente por el sistema de gestión de alquileres y puede imprimirse para firma física.",
    },
    `contrato-${contrato.id}.pdf`,
  );
}
