export function requireEntityId(
  id: string | undefined,
  entityName: string,
): string {
  if (!id) {
    throw new Error(`El ID de ${entityName} es obligatorio.`)
  }

  return id
}

export function resolveActivo(activo?: boolean): boolean {
  return activo ?? true
}

export function normalizeOptionalText(value?: string | null, fallback = ''): string {
  return value?.trim() || fallback
}

export function logServerActionError(actionName: string, error: unknown) {
  console.error(`Error en ${actionName}:`, error)
}


export function assertEntityTenant(entityTenantId: string, sessionTenantId: string, entityName: string) {
  if (entityTenantId !== sessionTenantId) {
    throw new Error(`No tienes acceso al ${entityName} indicado.`)
  }
}
