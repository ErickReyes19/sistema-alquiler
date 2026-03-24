'use server'

import { prisma } from '@/lib/prisma'
import {
  logServerActionError,
  requireEntityId,
  resolveActivo,
} from '@/lib/server-action-utils'
import { buildTenantWhere, getTenantIdFromSession } from '@/lib/tenant-session'

import { Servicio } from './type'

const mapServicioToDto = (servicio: {
  id: string
  nombre: string
  clave: string | null
  activo: boolean
}): Servicio => ({
  id: servicio.id,
  nombre: servicio.nombre,
  clave: servicio.clave,
  activo: servicio.activo,
})

async function findServicios(where?: { activo?: boolean }): Promise<Servicio[]> {
  const servicios = await prisma.servicios.findMany({
    where: await buildTenantWhere(where),
    orderBy: { nombre: 'asc' },
  })

  return servicios.map(mapServicioToDto)
}

const buildServicioData = (servicio: Servicio) => ({
  nombre: servicio.nombre,
  clave: servicio.clave?.trim() || null,
  activo: resolveActivo(servicio.activo),
})

export async function getServicios(): Promise<Servicio[]> {
  try {
    return await findServicios()
  } catch (error) {
    logServerActionError('getServicios', error)
    return []
  }
}

export async function getServiciosActivos(): Promise<Servicio[]> {
  try {
    return await findServicios({ activo: true })
  } catch (error) {
    logServerActionError('getServiciosActivos', error)
    return []
  }
}

export async function putServicio({ servicio }: { servicio: Servicio }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession()
    const servicioId = requireEntityId(servicio.id, 'servicio')
    const updated = await prisma.servicios.updateMany({
      where: { id: servicioId, tenantId },
      data: buildServicioData(servicio),
    })

    if (updated.count === 0) {
      throw new Error('Servicio no encontrado para el tenant actual.')
    }

    return true
  } catch (error) {
    logServerActionError('putServicio', error)
    return false
  }
}

export async function postservicio({ servicio }: { servicio: Servicio }): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession()
    await prisma.servicios.create({
      data: {
        ...buildServicioData(servicio),
        tenantId,
      },
    })

    return true
  } catch (error) {
    logServerActionError('postServicio', error)
    return false
  }
}

export async function getServicioById(id: string): Promise<Servicio | null> {
  try {
    const servicio = await prisma.servicios.findFirst({
      where: await buildTenantWhere({ id }),
    })

    return servicio ? mapServicioToDto(servicio) : null
  } catch (error) {
    logServerActionError('getServicioById', error)
    return null
  }
}
