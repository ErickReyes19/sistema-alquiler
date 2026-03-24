"use server"

import { randomUUID } from "crypto"

import bcrypt from "bcryptjs"

import { Prisma, TipoUsuario } from "@/lib/generated/prisma"
import { generateTemporaryPassword } from "@/lib/default-user-password"
import { prisma } from "@/lib/prisma"
import { SYSTEM_HIDDEN_PERMISSION_NAMES, TENANT_PERMISSION_NAMES } from "@/lib/platform-permissions"
import { requireTenantSession } from "@/lib/tenant-session"

export type TenantListItem = {
  id: string
  nombre: string
  slug: string
  activo: boolean
  usuarios: number
}

async function requireRootSession() {
  const session = await requireTenantSession()
  if (session.tipoUsuario !== TipoUsuario.ROOT) {
    throw new Error('Solo el usuario root puede realizar esta acción.')
  }
  return session
}

export async function getPlatformTenants(): Promise<TenantListItem[]> {
  await requireRootSession()

  const tenants = await prisma.tenant.findMany({
    where: { slug: { not: 'platform-root' } },
    include: { usuarios: { select: { id: true } } },
    orderBy: { nombre: 'asc' },
  })

  return tenants.map((tenant) => ({
    id: tenant.id,
    nombre: tenant.nombre,
    slug: tenant.slug,
    activo: tenant.activo,
    usuarios: tenant.usuarios.length,
  }))
}

export async function createTenant(input: { nombre: string; slug: string }) {
  await requireRootSession()

  const nombre = input.nombre.trim()
  const slug = input.slug.trim().toLowerCase()

  if (!nombre || !slug) {
    throw new Error('Nombre y slug son obligatorios.')
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const tenantId = randomUUID()
      const roleId = randomUUID()
      const tenantPermissionRecords = TENANT_PERMISSION_NAMES.map((permissionName) => ({
        id: randomUUID(),
        tenantId,
        nombre: permissionName,
        descripcion: `Permite ${permissionName.replace(/_/g, ' ')}`,
        activo: true,
        esPermisoSistema: SYSTEM_HIDDEN_PERMISSION_NAMES.has(permissionName),
      }))
      const createdTenant = await tx.tenant.create({
        data: {
          id: tenantId,
          nombre,
          slug,
          activo: true,
        },
      })

      await tx.permiso.createMany({
        data: tenantPermissionRecords,
      })

      await tx.rol.create({
        data: {
          id: roleId,
          tenantId,
          nombre: 'administrador',
          descripcion: 'Administrador principal del tenant',
          activo: true,
        },
      })

      await tx.rolPermiso.createMany({
        data: tenantPermissionRecords.map((permiso) => ({
          id: randomUUID(),
          tenantId,
          rolId: roleId,
          permisoId: permiso.id,
        })),
      })

      return createdTenant
    })
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('Ya existe un tenant con ese slug.')
    }

    throw error
  }
}

export async function resetTenantPassword(tenantId: string) {
  await requireRootSession()

  const normalizedTenantId = tenantId.trim()
  if (!normalizedTenantId) {
    throw new Error("Tenant inválido.")
  }

  const tenantAdmin = await prisma.usuario.findFirst({
    where: {
      tenantId: normalizedTenantId,
      tipoUsuario: TipoUsuario.TENANT_ADMIN,
      activo: true,
    },
    orderBy: { createAt: "asc" },
  })

  if (!tenantAdmin) {
    throw new Error("No hay usuarios activos para restablecer en este tenant.")
  }

  const passwordTemporal = generateTemporaryPassword()
  const hashedPassword = await bcrypt.hash(passwordTemporal, 10)

  await prisma.usuario.update({
    where: { id: tenantAdmin.id },
    data: {
      password: hashedPassword,
      DebeCambiar: true,
    },
  })

  return {
    username: tenantAdmin.nombre,
    passwordTemporal,
  }
}
