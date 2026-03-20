"use server"

import { randomUUID } from "crypto"

import bcrypt from "bcryptjs"

import { TipoUsuario } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"
import { requireTenantSession } from "@/lib/tenant-session"

export type TenantOption = {
  id: string
  nombre: string
  slug: string
}

export type TenantAssignedUser = {
  id: string
  nombre: string
  email: string
  tenantNombre: string
  tenantSlug: string
  activo: boolean
}

async function requireRootSession() {
  const session = await requireTenantSession()
  if (session.tipoUsuario !== TipoUsuario.ROOT) {
    throw new Error('Solo el usuario root puede realizar esta acción.')
  }
  return session
}

export async function getTenantOptions(): Promise<TenantOption[]> {
  await requireRootSession()

  return prisma.tenant.findMany({
    where: { slug: { not: 'platform-root' }, activo: true },
    orderBy: { nombre: 'asc' },
    select: { id: true, nombre: true, slug: true },
  })
}

export async function getTenantAssignedUsers(): Promise<TenantAssignedUser[]> {
  await requireRootSession()

  const users = await prisma.usuario.findMany({
    where: {
      tipoUsuario: TipoUsuario.TENANT_ADMIN,
      tenant: { slug: { not: 'platform-root' } },
    },
    include: { tenant: true },
    orderBy: [{ tenant: { nombre: 'asc' } }, { nombre: 'asc' }],
  })

  return users.map((user: any) => ({
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    tenantNombre: user.tenant.nombre,
    tenantSlug: user.tenant.slug,
    activo: user.activo,
  }))
}

export async function createTenantAssignedUser(input: { tenantId: string; nombre: string; email: string }) {
  await requireRootSession()

  const tenant = await prisma.tenant.findUnique({
    where: { id: input.tenantId },
    include: {
      roles: { where: { nombre: 'administrador', activo: true }, take: 1 },
    },
  })

  if (!tenant) {
    throw new Error('Tenant no encontrado.')
  }

  const adminRole = tenant.roles[0]
  if (!adminRole) {
    throw new Error('El tenant no tiene rol administrador provisionado.')
  }

  const hashedPassword = await bcrypt.hash('password.123', 10)

  return prisma.usuario.create({
    data: {
      id: randomUUID(),
      tenantId: tenant.id,
      nombre: input.nombre.trim(),
      email: input.email.trim().toLowerCase(),
      password: hashedPassword,
      activo: true,
      DebeCambiar: true,
      rolId: adminRole.id,
      tipoUsuario: TipoUsuario.TENANT_ADMIN,
    },
  })
}
