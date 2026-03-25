import { format } from "date-fns";
import { es } from "date-fns/locale";

import type { ContratoView } from "@/app/(protected)/contratos/type";
import { downloadPdf } from "./simple-pdf";

const formatDate = (dateString: string | null) =>
  dateString ? format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es }) : "No definida";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amount);

const SEP = "--------------------------------------------------------------------------------";

export function downloadContratoPdf(contrato: ContratoView) {
  const reglas =
    contrato.reglas.length > 0
      ? contrato.reglas.map(
          (regla, index) =>
            `${index + 1}. ${regla.nombre}: ${regla.descripcion ?? "Disposicion de cumplimiento obligatorio para las partes contratantes."}`,
        )
      : ["1. El arrendatario y el arrendador se comprometen a cumplir la normativa civil y administrativa aplicable."];

  const lines: string[] = [
    "CONTRATO DE ARRENDAMIENTO DE INMUEBLE HABITACIONAL",
    "DOCUMENTO PRIVADO CON EFECTOS LEGALES ENTRE LAS PARTES",
    SEP,
    `Codigo de contrato: ${contrato.id}`,
    `Fecha de emision: ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    `Estado contractual: ${contrato.activo ? "VIGENTE" : "NO VIGENTE"}`,
    "",
    "I. IDENTIFICACION DE LAS PARTES",
    `Arrendatario: ${contrato.inquilino}`,
    `Documento de identidad: ${contrato.inquiliniIdentidad}`,
    `Inmueble arrendado: Apartamento ${contrato.apartamento.numero}`,
    `Direccion contractual: ${contrato.apartamento.direccion ?? "Sin direccion registrada"}`,
    "",
    "II. PLAZO Y CONDICIONES ECONOMICAS",
    `Fecha de inicio de vigencia: ${formatDate(contrato.fechaInicio)}`,
    `Fecha de terminacion de vigencia: ${formatDate(contrato.fechaFin)}`,
    `Canon de arrendamiento mensual: ${formatCurrency(contrato.montoMensual)}`,
    `Dia limite de pago mensual: ${contrato.diaPagoMensual}`,
    `Plazo de preaviso para terminacion: ${contrato.preavisoDias} dias calendario`,
    "",
    "!! PUNTOS CLAVE DEL CONTRATO",
    `!! Canon mensual pactado: ${formatCurrency(contrato.montoMensual)}`,
    `!! Vigencia: ${formatDate(contrato.fechaInicio)} al ${formatDate(contrato.fechaFin)}`,
    `!! Pago limite de cada mes: dia ${contrato.diaPagoMensual}`,
    "",
    "III. ESPECIFICACIONES DEL INMUEBLE",
    "Habitaciones declaradas:",
    ...contrato.apartamento.habitaciones.map((item) => `- ${item.tipoHabitacionNombre}: ${item.cantidad}`),
    "",
    "Servicios asociados:",
    ...contrato.apartamento.servicios.map(
      (item) =>
        `- ${item.servicioNombre}: ${item.incluido ? "Incluido en la renta" : "No incluido"}. Cargo adicional: ${formatCurrency(item.costoAdicional)}`,
    ),
    "",
    "IV. CLAUSULAS Y REGLAMENTO CONTRACTUAL",
    ...reglas,
    "",
    "V. DECLARACIONES LEGALES",
    "1. Las partes manifiestan su consentimiento libre y voluntario sobre el presente contrato.",
    "2. El incumplimiento de pago, uso indebido del inmueble o infraccion del reglamento faculta a exigir las acciones legales correspondientes.",
    "3. Cualquier modificacion debera formalizarse por escrito y contar con aceptacion de ambas partes.",
    "4. Para efectos de notificacion, se tendran como validos los datos consignados en este documento.",
    "",
    "VI. ACEPTACION Y FIRMAS",
    "Con la firma de este documento, las partes aceptan el contenido integro del contrato y su obligatoriedad legal.",
    "",
    "Firma Arrendador: _____________________________ || Firma Arrendatario: ____________________________",
    "Lugar y fecha: ________________________________",
    SEP,
    `Documento generado automaticamente el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `contrato-${contrato.id}.pdf`);
}
