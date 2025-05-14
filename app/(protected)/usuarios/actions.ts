"use server";

import { prisma } from "@/lib/prisma";
import { Usuario, UsuarioCreate, UsuarioUpdate } from "./type";
import { Rol } from "@/app/generated/prisma";
import bcrypt from 'bcryptjs';
import { randomUUID } from "crypto";

// Utilidad para mapear el objeto de Prisma al tipo Usuario que tú usas
function mapUsuario(data: { 
  id: string; 
  nombre: string; 
  createAt: Date; 
  updateAt: Date; 
  activo: boolean; 
  rolId: string; 
  email: string; 
  password: string; 
  DebeCambiar: boolean; 
  rol: Rol | null; 
}): Usuario {
  return {
    id: data.id,
    usuario: data.nombre, 
    rol_id: data.rolId,  
    rol: data.rol?.nombre ?? "", 
    activo: data.activo,
    email: data.email, 
  };
}

export async function getUsuarios(): Promise<Usuario[]> {
  try {
    const response = await prisma.usuario.findMany({
      include: {
        rol: true, // Incluir los datos del rol para mapearlo correctamente
      },
      orderBy: {
        nombre: "asc",
      },
    });

    // Mapeo explícito para que los datos estén tipados correctamente
    return response.map(mapUsuario);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
}
export async function postUsuario({ usuario }: { usuario: UsuarioCreate }): Promise<Usuario> {

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password.123", saltRounds);

    // Crear el usuario con la contraseña encriptada
    const newUsuario = await prisma.usuario.create({
      data: {
        id: randomUUID(), // Generar un ID único si no se proporciona
        nombre: usuario.usuario,  // mapeo de usuario a nombre
        rolId: usuario.rol_id,    // mapeo de rol_id
        activo: true,              // Por defecto, lo creamos activo
        email: usuario.email,     // Agregar email
        password: hashedPassword, // Agregar la contraseña encriptada
        DebeCambiar: true,        // Cambiar por un valor por defecto si no lo pasas
      },
      include: {
        rol: true, 
      },
    });

    // Mapeamos el nuevo usuario a nuestro tipo Usuario
    return mapUsuario(newUsuario);
  } catch (error) {
    console.error("Error en postUsuario:", error);
    throw new Error("Error al crear el usuario");
  }
}


export async function putUsuario({ usuario }: { usuario: UsuarioUpdate }): Promise<Usuario> {
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        nombre: usuario.usuario,
        rolId: usuario.rol_id,
        email: usuario.email,
        activo: usuario.activo,
      },
      include: {
        rol: true,
      },
    });

    // Mapeamos el usuario actualizado para devolverlo en el formato correcto
    return mapUsuario(updatedUsuario);
  } catch (error) {
    console.error("Error en putUsuario:", error);
    throw new Error("Error al actualizar el usuario");
  }
}

export async function getUsuarioById(id: string): Promise<Usuario | null> {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: {
        rol: true,
      },
    });

    // Si encontramos el usuario, lo mapeamos a nuestro tipo, sino, retornamos null
    return usuario ? mapUsuario(usuario) : null;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
}
