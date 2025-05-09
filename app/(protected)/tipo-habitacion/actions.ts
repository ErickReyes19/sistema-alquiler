'use server'
import { prisma } from "@/lib/prisma";
import { TipoHabitacion } from "./type";

export async function getTiposHabitacion(): Promise<TipoHabitacion[]> {
  try {
    const tipos = await prisma.tiposHabitacion.findMany();

    // Mapear al DTO
    return tipos.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      activo: t.activo,
    }));
  } catch (error) {
    console.error("Error al obtener los tipos de habitación:", error);
    return [];
  }
}

export async function getTiposHabitacionActivos(): Promise<TipoHabitacion[]> {
  try {
    const tipos = await prisma.tiposHabitacion.findMany({
      where: {
        activo: true,
      },
    });

    return tipos.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      activo: t.activo,
    }));
  } catch (error) {
    console.error("Error al obtener los tipos de habitación activos:", error);
    return [];
  }
}


export async function putTipoHabitacion({
  tipoHabitacion,
}: {
  tipoHabitacion: TipoHabitacion;
}): Promise<boolean> {
  try {
    await prisma.tiposHabitacion.update({
      where: { id: tipoHabitacion.id! },
      data: {
        nombre: tipoHabitacion.nombre,
        activo: tipoHabitacion.activo ?? true,
      },
    });

    return true;
  } catch (error) {
    console.error("Error al actualizar el tipo de habitación:", error);
    return false;
  }
}

export async function postTipoHabitacion({
  tipoHabitacion,
}: {
  tipoHabitacion: TipoHabitacion;
}): Promise<boolean> {
  try {
    await prisma.tiposHabitacion.create({
      data: {
        nombre: tipoHabitacion.nombre,
        activo: tipoHabitacion.activo ?? true,
      },
    });
    return true;
  } catch (error) {
    console.error("Error al crear el tipo de habitación:", error);
    return false;
  }
}


export async function getTipoHabitacionById(id: string): Promise<TipoHabitacion | null> {
  try {
    const tipo = await prisma.tiposHabitacion.findUnique({
      where: { id },
    });

    if (!tipo) {
      return null;
    }

    return {
      id: tipo.id,
      nombre: tipo.nombre,
      activo: tipo.activo,
    };
  } catch (error) {
    console.error("Error al obtener el tipo de habitación por ID:", error);
    return null;
  }
}


