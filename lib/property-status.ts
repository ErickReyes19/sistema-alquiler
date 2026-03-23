export type EstadoOperativoUnidad = "DISPONIBLE" | "OCUPADO" | "MANTENIMIENTO";

export function resolveEstadoOperativoUnidad(input: {
  hasActiveContract: boolean;
  hasBlockingMaintenance: boolean;
}): EstadoOperativoUnidad {
  if (input.hasBlockingMaintenance) {
    return "MANTENIMIENTO";
  }

  if (input.hasActiveContract) {
    return "OCUPADO";
  }

  return "DISPONIBLE";
}
