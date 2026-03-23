import { CategoriaGasto } from "@/lib/generated/prisma";

export const categoriaOptions: Array<{ value: CategoriaGasto; label: string }> = [
  { value: "MANTENIMIENTO", label: "Mantenimiento" },
  { value: "REPARACION", label: "Reparación" },
  { value: "SERVICIO_DUENO", label: "Servicios asumidos por el dueño" },
  { value: "LIMPIEZA", label: "Limpieza" },
  { value: "MOBILIARIO", label: "Mobiliario" },
  { value: "COMISION", label: "Comisiones" },
  { value: "IMPUESTO", label: "Impuestos" },
  { value: "EXTRAORDINARIO", label: "Gasto extraordinario" },
  { value: "OTRO", label: "Otro" },
];
