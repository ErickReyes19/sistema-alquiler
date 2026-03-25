'use server'

import { prisma } from '@/lib/prisma'
import { buildTenantWhere, getTenantIdFromSession } from '@/lib/tenant-session'
import { normalizeUploadedAssets } from '@/lib/uploaded-asset'

import {
  Apartamento,
  ApartamentoActivo,
  ApartamentoServicio,
  ApartamentoView,
  Habitacion,
} from './type'

const apartamentoInclude = {
  apartamento: true,
  ApartamentoServicios: true,
  activos: true,
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
  activos: {
    include: {
      tipoActivo: true,
      tipoHabitacion: true,
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
  clave?: string | null
  incluido: boolean
  costoAdicional: { toString(): string } | number
}): ApartamentoServicio => ({
  id: servicio.id,
  apartamentoId: servicio.apartamentoId,
  servicioId: servicio.servicioId,
  clave: servicio.clave,
  incluido: servicio.incluido,
  costoAdicional: Number(servicio.costoAdicional),
})

const mapApartamentoActivo = (activo: {
  id: string
  apartamentoId: string
  tipoActivoId: string
  tipoHabitacionId: string | null
  identificador: string
  descripcion: string | null
  activo: boolean
}): ApartamentoActivo => ({
  id: activo.id,
  apartamentoId: activo.apartamentoId,
  tipoActivoId: activo.tipoActivoId,
  tipoHabitacionId: activo.tipoHabitacionId,
  identificador: activo.identificador,
  descripcion: activo.descripcion,
  activo: activo.activo,
})

const mapApartamentoCompleto = (apartamento: any): Apartamento & {
  habitaciones: Habitacion[]
  servicios: ApartamentoServicio[]
  activos: ApartamentoActivo[]
} => ({
  id: apartamento.id,
  numero: apartamento.numero,
  direccion: apartamento.direccion ?? undefined,
  imagenes: normalizeUploadedAssets(apartamento.imagenes),
  disponible: apartamento.disponible,
  activo: apartamento.activo,
  habitaciones: apartamento.apartamento.map(mapHabitacion),
  servicios: apartamento.ApartamentoServicios.map(mapApartamentoServicio),
  activos: apartamento.activos.map(mapApartamentoActivo),
})

const buildApartamentoData = (apartamento: Apartamento) => ({
  numero: apartamento.numero,
  direccion: apartamento.direccion ?? undefined,
  imagenes: apartamento.imagenes?.length ? apartamento.imagenes : undefined,
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
    clave: servicio.clave?.trim() || null,
    incluido: servicio.incluido ?? true,
    costoAdicional: servicio.costoAdicional ?? 0,
  }))

const buildActivosCreateData = (tenantId: string, activos: ApartamentoActivo[]) =>
  activos.map((activo) => ({
    tenantId,
    tipoActivoId: activo.tipoActivoId,
    tipoHabitacionId: activo.tipoHabitacionId || null,
    identificador: activo.identificador.trim(),
    descripcion: activo.descripcion?.trim() || null,
    activo: activo.activo ?? true,
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
    clave: servicio.clave?.trim() || null,
    incluido: servicio.incluido ?? true,
    costoAdicional: servicio.costoAdicional ?? 0,
  }))

const buildActivosCreateManyData = (
  tenantId: string,
  apartamentoId: string,
  activos: ApartamentoActivo[],
) =>
  activos.map((activo) => ({
    tenantId,
    apartamentoId,
    tipoActivoId: activo.tipoActivoId,
    tipoHabitacionId: activo.tipoHabitacionId || null,
    identificador: activo.identificador.trim(),
    descripcion: activo.descripcion?.trim() || null,
    activo: activo.activo ?? true,
  }))

export async function postApartamentoCompleto({
  apartamento,
  habitaciones,
  servicios,
  activos,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
  servicios: ApartamentoServicio[]
  activos: ApartamentoActivo[]
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
        activos: activos.length
          ? {
              create: buildActivosCreateData(tenantId, activos),
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
  activos,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
  servicios: ApartamentoServicio[]
  activos: ApartamentoActivo[]
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
      await tx.apartamentoActivo.deleteMany({
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
      if (activos.length) {
        await tx.apartamentoActivo.createMany({
          data: buildActivosCreateManyData(tenantId, apartamento.id!, activos),
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
  (Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[]; activos: ApartamentoActivo[] })[]
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

export async function getTiposActivosActivos(): Promise<{ id: string; nombre: string }[]> {
  try {
    const tipos = await prisma.tipoActivoApartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    })

    return tipos
  } catch (error) {
    console.error('Error al obtener tipos de activos:', error)
    return []
  }
}

export async function getApartamentoCompletoById(
  id: string,
): Promise<(Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[]; activos: ApartamentoActivo[] }) | null> {
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
      imagenes: normalizeUploadedAssets(
        (apartamento as { imagenes?: unknown }).imagenes,
      ),
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
        clave: (servicio as { clave?: string | null }).clave ?? null,
        incluido: servicio.incluido,
        costoAdicional: Number(servicio.costoAdicional),
      })),
      activos: apartamento.activos.map((activo) => ({
        id: activo.id,
        tipoActivoId: activo.tipoActivoId,
        tipoActivoNombre: activo.tipoActivo.nombre,
        tipoHabitacionId: activo.tipoHabitacionId,
        tipoHabitacionNombre: activo.tipoHabitacion?.nombre ?? null,
        identificador: activo.identificador,
        descripcion: activo.descripcion ?? null,
        activo: activo.activo,
      })),
    }
  } catch (error) {
    console.error('Error al obtener apartamento completo con ID:', error)
    return null
  }
}
