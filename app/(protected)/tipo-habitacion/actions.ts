'use server'

import { prisma } from '@/lib/prisma'
import {
  logServerActionError,
  requireEntityId,
  resolveActivo,
} from '@/lib/server-action-utils'

import { TipoHabitacion } from './type'

const mapTipoHabitacionToDto = (tipoHabitacion: {
  id: string
  nombre: string
  activo: boolean
}): TipoHabitacion => ({
  id: tipoHabitacion.id,
  nombre: tipoHabitacion.nombre,
  activo: tipoHabitacion.activo,
})

async function findTiposHabitacion(where?: { activo?: boolean }): Promise<TipoHabitacion[]> {
  const tiposHabitacion = await prisma.tiposHabitacion.findMany({
    where,
    orderBy: { nombre: 'asc' },
  })

  return tiposHabitacion.map(mapTipoHabitacionToDto)
}

const buildTipoHabitacionData = (tipoHabitacion: TipoHabitacion) => ({
  nombre: tipoHabitacion.nombre,
  activo: resolveActivo(tipoHabitacion.activo),
})

export async function getTiposHabitacion(): Promise<TipoHabitacion[]> {
  try {
    return await findTiposHabitacion()
  } catch (error) {
    logServerActionError('getTiposHabitacion', error)
    return []
  }
}

export async function getTiposHabitacionActivos(): Promise<TipoHabitacion[]> {
  try {
    return await findTiposHabitacion({ activo: true })
  } catch (error) {
    logServerActionError('getTiposHabitacionActivos', error)
    return []
  }
}

export async function putTipoHabitacion({
  tipoHabitacion,
}: {
  tipoHabitacion: TipoHabitacion
}): Promise<boolean> {
  try {
    await prisma.tiposHabitacion.update({
      where: { id: requireEntityId(tipoHabitacion.id, 'tipo de habitación') },
      data: buildTipoHabitacionData(tipoHabitacion),
    })

    return true
  } catch (error) {
    logServerActionError('putTipoHabitacion', error)
    return false
  }
}

export async function postTipoHabitacion({
  tipoHabitacion,
}: {
  tipoHabitacion: TipoHabitacion
}): Promise<boolean> {
  try {
    await prisma.tiposHabitacion.create({
      data: buildTipoHabitacionData(tipoHabitacion),
    })

    return true
  } catch (error) {
    logServerActionError('postTipoHabitacion', error)
    return false
  }
}

export async function getTipoHabitacionById(id: string): Promise<TipoHabitacion | null> {
  try {
    const tipoHabitacion = await prisma.tiposHabitacion.findUnique({
      where: { id },
    })

    return tipoHabitacion ? mapTipoHabitacionToDto(tipoHabitacion) : null
  } catch (error) {
    logServerActionError('getTipoHabitacionById', error)
    return null
  }
}
