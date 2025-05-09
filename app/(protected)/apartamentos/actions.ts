'use server'
import { prisma } from '@/lib/prisma'
import { Apartamento, Habitacion } from './type'

// Crear un nuevo apartamento con sus habitaciones asociadas
// Actualizar un apartamento (sin tocar habitaciones)
export async function putApartamento({
  apartamento,
  habitaciones,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
}): Promise<boolean> {
  try {
    // Eliminar las habitaciones existentes del apartamento
    await prisma.habitaciones.deleteMany({
      where: { apartamentoId: apartamento.id! },
    })

    // Actualizar el apartamento
    await prisma.apartamento.update({
      where: { id: apartamento.id! },
      data: {
        numero: apartamento.numero,
        direccion: apartamento.direccion ?? undefined,
        disponible: apartamento.disponible ?? true,
        activo: apartamento.activo ?? true,
      },
    })

    // Crear las nuevas habitaciones asociadas al apartamento
    await prisma.habitaciones.createMany({
      data: habitaciones.map((h) => ({
        apartamentoId: apartamento.id!,
        tipoHabitacionId: h.tipoHabitacionId,
        cantidad: h.cantidad,
        activo: h.activo ?? true,
      })),
    })

    return true
  } catch (error) {
    console.error('Error al actualizar el apartamento y las habitaciones:', error)
    return false
  }
}

export async function postApartamentoConHabitaciones({
  apartamento,
  habitaciones,
}: {
  apartamento: Apartamento
  habitaciones: Habitacion[]
}): Promise<boolean> {
  try {
    // Crear el apartamento
    const createdApartamento = await prisma.apartamento.create({
      data: {
        numero: apartamento.numero,
        direccion: apartamento.direccion ?? undefined,
        disponible: apartamento.disponible ?? true,
        activo: apartamento.activo ?? true,
      },
    })

    // Crear las habitaciones asociadas al apartamento
    await prisma.habitaciones.createMany({
      data: habitaciones.map((h) => ({
        apartamentoId: createdApartamento.id,
        tipoHabitacionId: h.tipoHabitacionId,
        cantidad: h.cantidad,
        activo: h.activo ?? true,
      })),
    })

    return true
  } catch (error) {
    console.error('Error al crear el apartamento y las habitaciones:', error)
    return false
  }
}

// Obtener todos los apartamentos con sus habitaciones
export async function getApartamentos(): Promise<(Apartamento & { habitaciones: Habitacion[] })[]> {
  try {
    const apartamentos = await prisma.apartamento.findMany({
      include: { apartamento: true }, // la relación en Prisma es 'apartamento'
    })
    return apartamentos.map((a) => ({
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
    }))
  } catch (error) {
    console.error('Error al obtener los apartamentos:', error)
    return []
  }
}

// Obtener apartamentos activos con sus habitaciones
export async function getApartamentosActivos(): Promise<(Apartamento & { habitaciones: Habitacion[] })[]> {
  try {
    const apartamentos = await prisma.apartamento.findMany({
      where: { activo: true },
      include: { apartamento: true },
    })
    return apartamentos.map((a) => ({
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
    }))
  } catch (error) {
    console.error('Error al obtener los apartamentos activos:', error)
    return []
  }
}



// Obtener un apartamento por ID con sus habitaciones
export async function getApartamentoById(
  id: string
): Promise<(Apartamento & { habitaciones: Habitacion[] }) | null> {
  try {
    const apt = await prisma.apartamento.findUnique({
      where: { id },
      include: { apartamento: true },
    })
    if (!apt) return null
    return {
      id: apt.id,
      numero: apt.numero,
      direccion: apt.direccion ?? undefined,
      disponible: apt.disponible,
      activo: apt.activo,
      habitaciones: apt.apartamento.map((h) => ({
        id: h.id,
        apartamentoId: h.apartamentoId,
        tipoHabitacionId: h.tipoHabitacionId,
        cantidad: h.cantidad,
        activo: h.activo,
      })),
    }
  } catch (error) {
    console.error('Error al obtener el apartamento por ID:', error)
    return null
  }
}
