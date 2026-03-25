import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ContratoView } from "@/app/(protected)/contratos/type";
import { downloadPdf } from "./simple-pdf";

const formatDate = (date: string | null) =>
  date ? format(new Date(date), "dd/MM/yyyy", { locale: es }) : "No definida";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amount);

export function downloadContratoPdf(contrato: ContratoView) {
  const lines: string[] = [
    "@title CONTRATO DE ARRENDAMIENTO",
    `@meta Contrato #${contrato.id} • Estado: ${contrato.activo ? "ACTIVO" : "INACTIVO"} • Generado: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,

    "@section Parte arrendataria",
    `@row Nombre || ${contrato.inquilino}`,
    `@row Identidad || ${contrato.inquiliniIdentidad}`,

    "@section Inmueble arrendado",
    `@row Apartamento || #${contrato.apartamento.numero}`,
    `@row Dirección || ${contrato.apartamento.direccion ?? "Sin dirección registrada"}`,

    "@section Vigencia y condiciones económicas",
    `@row Fecha inicio || ${formatDate(contrato.fechaInicio)}`,
    `@row Fecha fin || ${formatDate(contrato.fechaFin)}`,
    `@row Renta mensual || ${formatCurrency(contrato.montoMensual)}`,
    `@row Día de pago || ${contrato.diaPagoMensual}`,
    `@row Preaviso || ${contrato.preavisoDias} días`,

    "@section Habitaciones incluidas",
    ...contrato.apartamento.habitaciones.map(
      (h) => `@row ${h.tipoHabitacionNombre} || Cantidad: ${h.cantidad}`,
    ),

    "@section Servicios del apartamento",
    ...contrato.apartamento.servicios.map(
      (s) =>
        `@row ${s.servicioNombre} || ${s.incluido ? "Incluido" : "No incluido"}${s.costoAdicional > 0 ? ` • Costo adicional: ${formatCurrency(s.costoAdicional)}` : ""}`,
    ),

    "@section Cláusulas legales",
    `@legal 1. La renta mensual de ${formatCurrency(contrato.montoMensual)} debe pagarse dentro del plazo establecido.`,
    `@legal 2. El inmueble será solo para uso habitacional, prohibido subarrendar sin autorización.`,
    `@legal 3. Terminación anticipada requiere preaviso de ${contrato.preavisoDias} días.`,
    ...contrato.reglas.map(
      (r, i) => `@legal ${i + 4}. ${r.nombre}. ${r.descripcion || "Cumplimiento obligatorio."}`,
    ),

    "@section Firmas",
    `@row Arrendador || ____________________________`,
    `@row Arrendatario || ____________________________`,

    `@note Generado automáticamente el ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`,
  ];

  downloadPdf(lines, `contrato-${contrato.id}.pdf`);
}