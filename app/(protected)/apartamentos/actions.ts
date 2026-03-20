'use server'

import { prisma } from '@/lib/prisma'
import { buildTenantWhere, getTenantIdFromSession } from '@/lib/tenant-session'

import {
  Apartamento,
  ApartamentoServicio,
  ApartamentoView,
  Habitacion,
} from './type'

const apartamentoInclude = {
  apartamento: true,
  ApartamentoServicios: true,
} as const

const apartamentoViewInclude = {
  apartamento: {
    include: {
      tipoHabitacion: true,
    },
  },
  ApartamentoServicios: {
    include: {
      servicio: true,
    },
  },
} as const

const mapHabitacion = (habitacion: {
  id: string
  apartamentoId: string
  tipoHabitacionId: string
  cantidad: number
  activo: boolean
}): Habitacion => ({
  id: habitacion.id,
  apartamentoId: habitacion.apartamentoId,
  tipoHabitacionId: habitacion.tipoHabitacionId,
  cantidad: habitacion.cantidad,
  activo: habitacion.activo,
})

const mapApartamentoServicio = (servicio: {
  id: string
  apartamentoId: string
  servicioId: string
  incluido: boolean
  costoAdicional: { toString(): string } | number
}): ApartamentoServicio => ({
  id: servicio.id,
  apartamentoId: servicio.apartamentoId,
  servicioId: servicio.servicioId,
  incluido: servicio.incluido,
  costoAdicional: Number(servicio.costoAdicional),
})

const mapApartamentoCompleto = (apartamento: {
  id: string
  numero: string
  direccion: string | null
  disponible: boolean
  activo: boolean
  apartamento: Array<Parameters<typeof mapHabitacion>[0]>
  ApartamentoServicios: Array<Parameters<typeof mapApartamentoServicio>[0]>
}): Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[] } => ({
  id: apartamento.id,
  numero: apartamento.numero,
  direccion: apartamento.direccion ?? undefined,
  disponible: apartamento.disponible,
  activo: apartamento.activo,
  habitaciones: apartamento.apartamento.map(mapHabitacion),
  servicios: apartamento.ApartamentoServicios.map(mapApartamentoServicio),
})

const buildApartamentoData = (apartamento: Apartamento) => ({
  numero: apartamento.numero,
  direccion: apartamento.direccion ?? undefined,
  disponible: apartamento.disponible ?? true,
  activo: apartamento.activo ?? true,
})

const buildHabitacionesCreateData = (tenantId: string, habitaciones: Habitacion[]) =>
  habitaciones.map((habitacion) => ({
    tenantId,
    tipoHabitacionId: habitacion.tipoHabitacionId,
    cantidad: habitacion.cantidad,
    activo: habitacion.activo ?? true,
  }))

const buildServiciosCreateData = (tenantId: string, servicios: ApartamentoServicio[]) =>
  servicios.map((servicio) => ({
    tenantId,
    servicioId: servicio.servicioId,
    incluido: servicio.incluido ?? true,
    costoAdicional: servicio.costoAdicional ?? 0,
  }))

const buildHabitacionesCreateManyData = (
  tenantId: string,
  apartamentoId: string,
  habitaciones: Habitacion[],
) =>
  habitaciones.map((habitacion) => ({
    tenantId: tenantId,
    apartamentoId,
    tipoHabitacionId: habitacion.tipoHabitacionId,
    cantidad: habitacion.cantidad,
    activo: habitacion.activo ?? true,
  }))

const buildServiciosCreateManyData = (
  tenantId: string,
  apartamentoId: string,
  servicios: ApartamentoServicio[],
) =>
  servicios.map((servicio) => ({
    tenantId: tenantId,
    apartamentoId,
    servicioId: servicio.servicioId,
    incluido: servicio.incluido ?? true,
    costoAdicional: servicio.costoAdicional ?? 0,
  }))

export async function postApartamentoCompleto({
  apartamento,
  habitaciones,
  servicios,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
  servicios: ApartamentoServicio[]
}): Promise<boolean> {
  try {
    const tenantId = await getTenantIdFromSession()
    await prisma.apartamento.create({
      data: {
        tenantId,
        ...buildApartamentoData(apartamento),
        apartamento: {
          create: buildHabitacionesCreateData(tenantId, habitaciones),
        },
        ApartamentoServicios: servicios.length
          ? {
              create: buildServiciosCreateData(tenantId, servicios),
            }
          : undefined,
      },
    })

    return true
  } catch (error) {
    console.error('Error al crear apartamento completo:', error)
    throw new Error('No se pudo crear el apartamento.')
  }
}

export async function putApartamentoCompleto({
  apartamento,
  habitaciones,
  servicios,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
  servicios: ApartamentoServicio[]
}): Promise<boolean> {
  if (!apartamento.id) {
    throw new Error('El ID del apartamento es obligatorio para actualizar.')
  }

  try {
    const tenantId = await getTenantIdFromSession()
    await prisma.$transaction(async (tx) => {
      await tx.apartamentoServicios.deleteMany({
        where: { apartamentoId: apartamento.id!, tenantId },
      })
      await tx.habitaciones.deleteMany({
        where: { apartamentoId: apartamento.id!, tenantId },
      })

      const existingApartamento = await tx.apartamento.findFirst({
        where: { id: apartamento.id!, tenantId },
      })

      if (!existingApartamento) {
        throw new Error('Apartamento no encontrado para el tenant actual.')
      }

      await tx.apartamento.update({
        where: { id: apartamento.id! },
        data: buildApartamentoData(apartamento),
      })

      if (habitaciones.length) {
        await tx.habitaciones.createMany({
          data: buildHabitacionesCreateManyData(tenantId, apartamento.id!, habitaciones),
        })
      }

      if (servicios.length) {
        await tx.apartamentoServicios.createMany({
          data: buildServiciosCreateManyData(tenantId, apartamento.id!, servicios),
        })
      }
    })

    return true
  } catch (error) {
    console.error('Error al actualizar apartamento completo:', error)
    throw new Error('No se pudo actualizar el apartamento.')
  }
}

export async function getApartamentosCompleto(): Promise<
  (Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[] })[]
> {
  try {
    const apartamentos = await prisma.apartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      include: apartamentoInclude,
    })

    return apartamentos.map(mapApartamentoCompleto)
  } catch (error) {
    console.error('Error al obtener apartamentos completos:', error)
    return []
  }
}

export async function getServiciosActivos(): Promise<{ id: string; nombre: string }[]> {
  try {
    const servicios = await prisma.servicios.findMany({
      where: await buildTenantWhere({ activo: true }),
      orderBy: { nombre: 'asc' },
      select: {
        id: true,
        nombre: true,
      },
    })

    return servicios
  } catch (error) {
    console.error('Error al obtener servicios activos:', error)
    return []
  }
}

export async function getApartamentoCompletoById(
  id: string,
): Promise<(Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[] }) | null> {
  try {
    const apartamento = await prisma.apartamento.findFirst({
      where: await buildTenantWhere({ id }),
      include: apartamentoInclude,
    })

    return apartamento ? mapApartamentoCompleto(apartamento) : null
  } catch (error) {
    console.error('Error al obtener apartamento completo por ID:', error)
    return null
  }
}

export async function getApartamentoCompletoConId(
  id: string,
): Promise<ApartamentoView | null> {
  try {
    const apartamento = await prisma.apartamento.findFirst({
      where: await buildTenantWhere({ id }),
      include: apartamentoViewInclude,
    })

    if (!apartamento) {
      return null
    }

    return {
      id: apartamento.id,
      numero: apartamento.numero,
      direccion: apartamento.direccion ?? undefined,
      disponible: apartamento.disponible,
      activo: apartamento.activo,
      habitaciones: apartamento.apartamento.map((habitacion) => ({
        id: habitacion.id,
        tipoHabitacionId: habitacion.tipoHabitacionId,
        tipoHabitacionNombre: habitacion.tipoHabitacion.nombre,
        cantidad: habitacion.cantidad,
        activo: habitacion.activo,
      })),
      servicios: apartamento.ApartamentoServicios.map((servicio) => ({
        id: servicio.id,
        servicioId: servicio.servicioId,
        servicioNombre: servicio.servicio.nombre,
        incluido: servicio.incluido,
        costoAdicional: Number(servicio.costoAdicional),
      })),
    }
  } catch (error) {
    console.error('Error al obtener apartamento completo con ID:', error)
    return null
  }
}
