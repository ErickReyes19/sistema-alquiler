
"use server";
import { prisma } from "@/libs/prisma"; // Asegúrate de importar correctamente tu cliente de Prisma
import { PermisosRol, Rol } from "./type";


export async function getRolesPermisos() {
  try {
    const roles = await prisma.rol.findMany({
      include: {
        permisos: true, // Asegúrate de que "permisos" sea el nombre correcto de la relación en tu modelo de Prisma
      },
    });
    return roles;
  } catch (error) {
    console.error("Error al obtener los roles y permisos:", error);
    return [];
  }
}

export async function getRolsActivos() {
  try {
    const rolesActivos = await prisma.rol.findMany({
      where: {
        activo: true, // Asegúrate de que "activo" sea el campo correcto en tu modelo
      },
    });
    return rolesActivos;
  } catch (error) {
    console.error("Error al obtener los roles activos:", error);
    return [];
  }
}

export async function putRol({ rol }: { rol: Rol }) {
  const permisosIds = rol.permisos.map((permiso: PermisosRol) => ({ id: permiso.id }));

  try {
    const updatedRol = await prisma.rol.update({
      where: { id: rol.id },
      data: {
        ...rol,
        permisos: {
          set: permisosIds,
        },
      },
    });
    return updatedRol;
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return null;
  }
}

export async function getRolsPermisoById(id: string) {
  try {
    const rol = await prisma.rol.findUnique({
      where: { id },
      include: {
        permisos: true, // Incluye los permisos relacionados
      },
    });
    return rol;
  } catch (error) {
    console.error("Error al obtener el rol por ID:", error);
    return null;
  }
}

export async function postRol({ rol }: { rol: Rol }) {
  const permisosIds = rol.permisos.map((permiso: PermisosRol) => ({ id: permiso.id }));

  try {
    const newRol = await prisma.rol.create({
      data: {
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        activo: rol.activo ?? true, // Asegura un valor booleano, por defecto true
        permisos: {
          connect: permisosIds, // Conecta los permisos existentes
        },
      },
    });
    return newRol;
  } catch (error) {
    console.error("Error al crear el rol:", error);
    throw error;
  }
}
