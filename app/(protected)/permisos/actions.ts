"use server";

import { prisma } from "@/libs/prisma"; // Asegúrate de importar correctamente tu instancia de Prisma

export async function getPermisos() {
  try {
    const permisos = await prisma.permiso.findMany();
    return permisos;
  } catch (error) {
    console.error("Error al obtener los Permisos:", error);
    return [];
  }

}
