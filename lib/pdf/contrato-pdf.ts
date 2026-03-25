import { format } from "date-fns";
import { es } from "date-fns/locale";

import type { ContratoView } from "@/app/(protected)/contratos/type";
import { downloadPdf } from "./simple-pdf";

const formatDate = (dateString: string | null) =>
  dateString ? format(new Date(dateString), "dd/MM/yyyy", { locale: es }) : "No definida";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amount);

const SEP = "--------------------------------------------------------------------------------";

export function downloadContratoPdf(contrato: ContratoView) {
  const lines: string[] = [
    "CONTRATO DE ARRENDAMIENTO",
    "Diseno PDF basado en la vista de impresion del contrato",
    SEP,
    `Codigo de contrato: #${contrato.id} || Estado: ${contrato.activo ? "ACTIVO" : "INACTIVO"}`,
    `Documento generado: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
    "",
    "I. PARTE ARRENDATARIA",
    `Nombre: ${contrato.inquilino}`,
    `Identidad: ${contrato.inquiliniIdentidad}`,
    "",
    "II. INMUEBLE ARRENDADO",
    `Apartamento: ${contrato.apartamento.numero}`,
    `Direccion: ${contrato.apartamento.direccion ?? "Sin direccion registrada"}`,
    "",
    "III. TERMINOS ECONOMICOS Y VIGENCIA",
    `Fecha de inicio: ${formatDate(contrato.fechaInicio)}`,
    `Fecha de fin: ${formatDate(contrato.fechaFin)}`,
    `Renta mensual: ${formatCurrency(contrato.montoMensual)}`,
    `Dia de pago mensual: ${contrato.diaPagoMensual}`,
    `Preaviso: ${contrato.preavisoDias} dias calendario`,
    "",
    "IV. HABITACIONES INCLUIDAS",
    "Tipo de habitacion || Cantidad",
    ...contrato.apartamento.habitaciones.map((habitacion) => `${habitacion.tipoHabitacionNombre} || ${habitacion.cantidad}`),
    "",
    "V. SERVICIOS DEL APARTAMENTO",
    "Servicio || Incluido / Costo",
    ...contrato.apartamento.servicios.map(
      (servicio) =>
        `${servicio.servicioNombre} || ${servicio.incluido ? "Si" : "No"} / ${servicio.costoAdicional > 0 ? formatCurrency(servicio.costoAdicional) : "Sin costo"}`,
    ),
    "",
    "VI. CLAUSULAS Y REGLAS APLICABLES",
    `1. La parte arrendataria pagara la renta mensual de ${formatCurrency(contrato.montoMensual)} dentro de los primeros ${contrato.diaPagoMensual} dias de cada mes.`,
    "2. El inmueble sera de uso habitacional y no se podra subarrendar sin autorizacion escrita.",
    `3. En caso de terminacion anticipada se notificara con ${contrato.preavisoDias} dias calendario de antelacion.`,
    ...contrato.reglas.map(
      (regla, index) => `${index + 4}. ${regla.nombre}. ${regla.descripcion || "Regla aplicable de cumplimiento obligatorio."}`,
    ),
    "",
    "VII. FIRMAS",
    "Firma del arrendador: ________________________ || Firma del inquilino: ________________________",
    SEP,
    `Documento generado automaticamente el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `contrato-${contrato.id}.pdf`);
}
