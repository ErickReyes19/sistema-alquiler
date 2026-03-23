export const maintenanceTypeOptions = [
  { value: "TICKET", label: "Ticket o incidencia" },
  { value: "DANIO_REPORTADO", label: "Daño reportado por inquilino" },
  { value: "PREVENTIVO", label: "Mantenimiento preventivo" },
  { value: "CORRECTIVO", label: "Mantenimiento correctivo" },
] as const;

export const maintenanceOriginOptions = [
  { value: "INQUILINO", label: "Inquilino" },
  { value: "ADMINISTRACION", label: "Administración" },
  { value: "INSPECCION", label: "Inspección" },
  { value: "PROPIETARIO", label: "Propietario" },
] as const;

export const maintenanceStatusOptions = [
  { value: "REPORTADO", label: "Reportado" },
  { value: "EN_PROCESO", label: "En proceso" },
  { value: "RESUELTO", label: "Resuelto" },
] as const;
