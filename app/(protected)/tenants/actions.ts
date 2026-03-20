"use server"

import { randomUUID } from "crypto"

import { Prisma, TipoUsuario } from "@/app/generated/prisma"
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

      await tx.tenant.createMany({
        data: {
          id: tenantId,
          nombre,
          slug,
          activo: true,
        },
      })

      const createdTenant = await tx.tenant.findUnique({
        where: { id: tenantId },
      })

      if (!createdTenant) {
        throw new Error('No se pudo confirmar la creación del tenant.')
      }

      const tenantPermissions: Array<{ id: string }> = []

      for (const permissionName of TENANT_PERMISSION_NAMES) {
        const permiso = await tx.permiso.create({
          data: {
            id: randomUUID(),
            tenantId: createdTenant.id,
            nombre: permissionName,
            descripcion: `Permite ${permissionName.replace(/_/g, ' ')}`,
            activo: true,
            esPermisoSistema: SYSTEM_HIDDEN_PERMISSION_NAMES.has(permissionName),
          },
          select: { id: true },
        })

        tenantPermissions.push(permiso)
      }

      for (const permissionName of ROOT_PERMISSION_NAMES) {
        await tx.permiso.create({
          data: {
            id: randomUUID(),
            tenantId: createdTenant.id,
            nombre: permissionName,
            descripcion: `Permite ${permissionName.replace(/_/g, ' ')}`,
            activo: true,
            esPermisoSistema: true,
          },
        })
      }

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
