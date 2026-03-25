import { format } from "date-fns";
import { es } from "date-fns/locale";

import type { ContratoView } from "@/app/(protected)/contratos/type";
import { downloadPdf } from "./simple-pdf";

const formatDate = (dateString: string | null) =>
  dateString ? format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es }) : "No definida";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amount);

export function downloadContratoPdf(contrato: ContratoView) {
  const lines: string[] = [
    "CONTRATO DE ARRENDAMIENTO",
    `Codigo de contrato: ${contrato.id}`,
    "",
    "=== DATOS PRINCIPALES ===",
    `Estado: ${contrato.activo ? "ACTIVO" : "INACTIVO"}`,
    `Inquilino: ${contrato.inquilino}`,
    `Identidad: ${contrato.inquiliniIdentidad}`,
    `Apartamento: ${contrato.apartamento.numero}`,
    `Direccion: ${contrato.apartamento.direccion ?? "Sin direccion"}`,
    "",
    "=== VIGENCIA Y MONTO ===",
    `Fecha inicio: ${formatDate(contrato.fechaInicio)}`,
    `Fecha fin: ${formatDate(contrato.fechaFin)}`,
    `Renta mensual: ${formatCurrency(contrato.montoMensual)}`,
    `Dia de pago mensual: ${contrato.diaPagoMensual}`,
    `Preaviso: ${contrato.preavisoDias} dias`,
    "",
    "=== HABITACIONES ===",
    ...contrato.apartamento.habitaciones.map(
      (item) => `- ${item.tipoHabitacionNombre}: ${item.cantidad}`,
    ),
    "",
    "=== SERVICIOS ===",
    ...contrato.apartamento.servicios.map(
      (item) =>
        `- ${item.servicioNombre}: ${item.incluido ? "Incluido" : "No incluido"} | Costo adicional: ${formatCurrency(item.costoAdicional)}`,
    ),
    "",
    "=== REGLAS Y CLAUSULAS ===",
    ...contrato.reglas.map((regla, index) => `${index + 1}. ${regla.nombre}. ${regla.descripcion ?? "Regla de cumplimiento obligatorio."}`),
    "",
    `Documento generado el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `contrato-${contrato.id}.pdf`);
}
