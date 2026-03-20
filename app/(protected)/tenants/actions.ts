"use server"

import { randomUUID } from "crypto"

import { TipoUsuario } from "@/app/generated/prisma"
import { prisma } from "@/lib/prisma"
import { ROOT_PERMISSION_NAMES, SYSTEM_HIDDEN_PERMISSION_NAMES, TENANT_PERMISSION_NAMES } from "@/lib/platform-permissions"
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

  return tenants.map((tenant: any) => ({
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

  return prisma.$transaction(async (tx: any) => {
    const createdTenant = await tx.tenant.create({
      data: {
        id: randomUUID(),
        nombre,
        slug,
        activo: true,
      },
    })

    const tenantPermissions = await Promise.all(
      TENANT_PERMISSION_NAMES.map((permissionName) =>
        tx.permiso.create({
          data: {
            id: randomUUID(),
            tenantId: createdTenant.id,
            nombre: permissionName,
            descripcion: `Permite ${permissionName.replace(/_/g, ' ')}`,
            activo: true,
            esPermisoSistema: SYSTEM_HIDDEN_PERMISSION_NAMES.has(permissionName),
          },
        }),
      ),
    )

    await Promise.all(
      ROOT_PERMISSION_NAMES.map((permissionName) =>
        tx.permiso.create({
          data: {
            id: randomUUID(),
            tenantId: createdTenant.id,
            nombre: permissionName,
            descripcion: `Permite ${permissionName.replace(/_/g, ' ')}`,
            activo: true,
            esPermisoSistema: true,
          },
        }),
      ),
    )

    await tx.rol.create({
      data: {
        id: randomUUID(),
        tenantId: createdTenant.id,
        nombre: 'administrador',
        descripcion: 'Administrador principal del tenant',
        activo: true,
        permisos: {
          create: tenantPermissions.map((permiso) => ({
            tenant: { connect: { id: createdTenant.id } },
            permiso: { connect: { id: permiso.id } },
          })),
        },
      },
    })

    return createdTenant
  })
}
