'use server'
import { prisma } from "@/lib/prisma";
import { Servicio } from "./type";

export async function getServicios(): Promise<Servicio[]> {
  try {
    const servicios = await prisma.servicios.findMany();

    // Mapear al DTO
    return servicios.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      activo: t.activo,
    }));
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
}

export async function getServiciosActivos(): Promise<Servicio[]> {
  try {
    const servicios = await prisma.servicios.findMany({
      where: {
        activo: true,
      },
    });

    return servicios.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      activo: t.activo,
    }));
  } catch (error) {
    console.error("Error al obtener los servicios activos:", error);
    return [];
  }
}


export async function putServicio({
  servicio,
}: {
  servicio: Servicio;
}): Promise<boolean> {
  try {
    await prisma.servicios.update({
      where: { id: servicio.id! },
      data: {
        nombre: servicio.nombre,
        activo: servicio.activo ?? true,
      },
    });

    return true;
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    return false;
  }
}

export async function postservicio({
  servicio,
}: {
  servicio: Servicio;
}): Promise<boolean> {
  try {
    await prisma.servicios.create({
      data: {
        nombre: servicio.nombre,
        activo: servicio.activo ?? true,
      },
    });
    return true;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return false;
  }
}


export async function getServicioById(id: string): Promise<Servicio | null> {
  try {
    const servicio = await prisma.servicios.findUnique({
      where: { id },
    });

    if (!servicio) {
      return null;
    }

    return {
      id: servicio.id,
      nombre: servicio.nombre,
      activo: servicio.activo,
    };
  } catch (error) {
    console.error("Error al obtener el servicio por ID:", error);
    return null;
  }
}


