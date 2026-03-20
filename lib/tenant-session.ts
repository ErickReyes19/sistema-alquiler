"use server"

import { getSession, type UsuarioSesion } from "@/auth"

export type TenantSession = UsuarioSesion & {
  tenantId: string
}

export async function requireTenantSession(): Promise<TenantSession> {
  const session = await getSession()

  if (!session) {
    throw new Error("Sesión no válida o expirada.")
  }

  if (!session.tenantId) {
    throw new Error("La sesión no contiene tenantId.")
  }

  return session as TenantSession
}

export async function getTenantIdFromSession(): Promise<string> {
  const session = await requireTenantSession()
  return session.tenantId
}

export async function buildTenantWhere<T extends object>(where?: T): Promise<T & { tenantId: string }> {
  const tenantId = await getTenantIdFromSession()
  return {
    ...(where ?? {}),
    tenantId,
  } as T & { tenantId: string }
}
