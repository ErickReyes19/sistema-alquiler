'use server'
import { prisma } from '@/lib/prisma'
import { Apartamento, ApartamentoServicio, ApartamentoView, Habitacion } from './type'

// Crear un nuevo apartamento con sus habitaciones y servicios asociados
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
    const created = await prisma.apartamento.create({
      data: {
        numero: apartamento.numero,
        direccion: apartamento.direccion ?? undefined,
        disponible: apartamento.disponible ?? true,
        activo: apartamento.activo ?? true,
        apartamento: {
          create: habitaciones.map((h) => ({
            tipoHabitacionId: h.tipoHabitacionId,
            cantidad: h.cantidad,
            activo: h.activo ?? true,
          })),
        },
        ApartamentoServicios: servicios.length
          ? {
              create: servicios.map((s) => ({
                servicioId: s.servicioId,
                incluido: s.incluido ?? true,
                costoAdicional: s.costoAdicional ?? 0,
              })),
            }
          : undefined,
      },
    })
    return true
  } catch (e) {
    console.error('Error al crear apartamento completo:', e)
    return false
  }
}

// Actualizar un apartamento: recrea habitaciones y servicios
export async function putApartamentoCompleto({
  apartamento,
  habitaciones,
  servicios,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
  servicios: ApartamentoServicio[]
}): Promise<boolean> {
  try {
    // borrar existencias
    await prisma.apartamentoServicios.deleteMany({ where: { apartamentoId: apartamento.id! } })
    await prisma.habitaciones.deleteMany({ where: { apartamentoId: apartamento.id! } })
    // actualizar datos
    await prisma.apartamento.update({
      where: { id: apartamento.id! },
      data: {
        numero: apartamento.numero,
        direccion: apartamento.direccion ?? undefined,
        disponible: apartamento.disponible ?? true,
        activo: apartamento.activo ?? true,
      },
    })
    // recrear habitaciones
    if (habitaciones.length) {
      await prisma.habitaciones.createMany({
        data: habitaciones.map((h) => ({
          apartamentoId: apartamento.id!,
          tipoHabitacionId: h.tipoHabitacionId,
          cantidad: h.cantidad,
          activo: h.activo ?? true,
        })),
      })
    }
    // recrear servicios
    if (servicios.length) {
      await prisma.apartamentoServicios.createMany({
        data: servicios.map((s) => ({
          apartamentoId: apartamento.id!,
          servicioId: s.servicioId,
          incluido: s.incluido ?? true,
          costoAdicional: s.costoAdicional ?? 0,
        })),
      })
    }
    return true
  } catch (e) {
    console.error('Error al actualizar apartamento completo:', e)
    return false
  }
}

// Obtener todos los apartamentos con sus habitaciones y servicios
export async function getApartamentosCompleto(): Promise<
  (Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[] })[]
> {
  try {
    const list = await prisma.apartamento.findMany({
      include: { apartamento: true, ApartamentoServicios: true },
    })
    return list.map((a) => ({
      id: a.id,
      numero: a.numero,
      direccion: a.direccion ?? undefined,
      disponible: a.disponible,
      activo: a.activo,
      habitaciones: a.apartamento.map((h) => ({
        id: h.id,
        apartamentoId: h.apartamentoId,
        tipoHabitacionId: h.tipoHabitacionId,
        cantidad: h.cantidad,
        activo: h.activo,
      })),
      servicios: a.ApartamentoServicios.map((s) => ({
        id: s.id,
        apartamentoId: s.apartamentoId,
        servicioId: s.servicioId,
        incluido: s.incluido,
        costoAdicional: Number(s.costoAdicional),
      })),
    }))
  } catch (e) {
    console.error('Error al obtener apartamentos completos:', e)
    return []
  }
}

// Obtener servicios activos
export async function getServiciosActivos(): Promise<{ id: string; nombre: string }[]> {
  try {
    const servicios = await prisma.servicios.findMany({
      where: { activo: true },
    })
    return servicios.map((s) => ({ id: s.id, nombre: s.nombre }))
  } catch (e) {
    console.error('Error al obtener servicios activos:', e)
    return []
  }
}

// Obtener datos de un apartamento por ID (completo)
export async function getApartamentoCompletoById(
  id: string
): Promise<(Apartamento & { habitaciones: Habitacion[]; servicios: ApartamentoServicio[] }) | null> {
  try {
    const a = await prisma.apartamento.findUnique({
      where: { id },
      include: { apartamento: true, ApartamentoServicios: true },
    })
    if (!a) return null
    return {
      id: a.id,
      numero: a.numero,
      direccion: a.direccion ?? undefined,
      disponible: a.disponible,
      activo: a.activo,
      habitaciones: a.apartamento.map((h) => ({
        id: h.id,
        apartamentoId: h.apartamentoId,
        tipoHabitacionId: h.tipoHabitacionId,
        cantidad: h.cantidad,
        activo: h.activo,
      })),
      servicios: a.ApartamentoServicios.map((s) => ({
        id: s.id,
        apartamentoId: s.apartamentoId,
        servicioId: s.servicioId,
        incluido: s.incluido,
        costoAdicional: Number(s.costoAdicional),
      })),
    }
  } catch (e) {
    console.error('Error al obtener apartamento completo por ID:', e)
    return null
  }
}
export async function getApartamentoCompletoConId(
  id: string
): Promise<ApartamentoView | null> {
  try {
    const apartamento = await prisma.apartamento.findUnique({
      where: { id },
      include: {
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
      },
    });

    if (!apartamento) {
      return null;
    }

    return {
      id: apartamento.id,
      numero: apartamento.numero,
      direccion: apartamento.direccion ?? undefined,
      disponible: apartamento.disponible,
      activo: apartamento.activo,
      habitaciones: apartamento.apartamento.map((h) => ({
        id: h.id,
        tipoHabitacionId: h.tipoHabitacionId,
        tipoHabitacionNombre: h.tipoHabitacion.nombre,
        cantidad: h.cantidad,
        activo: h.activo,
      })),
      servicios: apartamento.ApartamentoServicios.map((s) => ({
        id: s.id,
        servicioId: s.servicioId,
        servicioNombre: s.servicio.nombre,
        incluido: s.incluido,
        costoAdicional: Number(s.costoAdicional),
      })),
    };
  } catch (e) {
    console.error('Error al obtener apartamento completo con ID:', e);
    return null;
  }
}

