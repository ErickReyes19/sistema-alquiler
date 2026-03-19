'use server'

import { prisma } from '@/lib/prisma'
import {
  logServerActionError,
  requireEntityId,
  resolveActivo,
} from '@/lib/server-action-utils'

import { Servicio } from './type'

const mapServicioToDto = (servicio: {
  id: string
  nombre: string
  activo: boolean
}): Servicio => ({
  id: servicio.id,
  nombre: servicio.nombre,
  activo: servicio.activo,
})

async function findServicios(where?: { activo?: boolean }): Promise<Servicio[]> {
  const servicios = await prisma.servicios.findMany({
    where,
    orderBy: { nombre: 'asc' },
  })

  return servicios.map(mapServicioToDto)
}

const buildServicioData = (servicio: Servicio) => ({
  nombre: servicio.nombre,
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
    await prisma.servicios.update({
      where: { id: requireEntityId(servicio.id, 'servicio') },
      data: buildServicioData(servicio),
    })

    return true
  } catch (error) {
    logServerActionError('putServicio', error)
    return false
  }
}

export async function postservicio({ servicio }: { servicio: Servicio }): Promise<boolean> {
  try {
    await prisma.servicios.create({
      data: buildServicioData(servicio),
    })

    return true
  } catch (error) {
    logServerActionError('postServicio', error)
    return false
  }
}

export async function getServicioById(id: string): Promise<Servicio | null> {
  try {
    const servicio = await prisma.servicios.findUnique({
      where: { id },
    })

    return servicio ? mapServicioToDto(servicio) : null
  } catch (error) {
    logServerActionError('getServicioById', error)
    return null
  }
}
