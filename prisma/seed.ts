import { PrismaClient } from "../app/generated/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

async function main() {
  console.log("🔌 Conectando a la base de datos...");
  // Eliminar $connect ya que Prisma maneja la conexión automáticamente
  // await prisma.$connect();
  console.log("✅ Conectado.");

  const permisoNames = [
    "ver_permisos",
    "ver_roles",
    "crear_roles",
    "editar_roles",
    "ver_usuarios",
    "crear_usuario",
    "editar_usuario",
  ];

  console.log("🔧 Creando permisos...");
  const permisos = await Promise.all(
    permisoNames.map((nombre) =>
      prisma.permiso.upsert({
        where: { nombre }, // Se asegura de que no se dupliquen permisos por nombre
        update: {},
        create: {
          id: randomUUID(),
          nombre,
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
        },
      })
    )
  );
  
  console.log("✅ Permisos actualizados:", permisos.map((p) => p.nombre));

  console.log("🔧 Creando rol administrador...");
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: "administrador" },
    update: {},
    create: {
      id: randomUUID(),
      nombre: "administrador",
      descripcion: "Rol con todos los permisos de administración",
      activo: true,
      permisos: {
        create: permisos.map((p) => ({
          id: randomUUID(),
          permiso: { connect: { id: p.id } },
        })),
      },
    },
    include: {
      permisos: {
        include: { permiso: true },
      },
    },
  });
  console.log("✅ Rol administrador creado:", rolAdmin.nombre);

  console.log("🔧 Creando usuario administrador...");
  const email = "erickjosepineda33@gmail.com";
  const plainPassword = "erick.reyes"; // Asegúrate de que esta no sea una contraseña real en producción
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const usuario = await prisma.usuario.upsert({
    where: { email },
    update: {},
    create: {
      id: randomUUID(),
      nombre: "erick.reyes",
      email,
      password: hashedPassword,
      activo: true,
      rolId: rolAdmin.id,
      DebeCambiar: true,
    },
  });
  console.log("✅ Usuario creado:", usuario.email);
}

main()
  .then(() => {
    console.log("🎉 Datos de prueba creados exitosamente.");
  })
  .catch((error) => {
    console.error("❌ Error durante el seed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Desconectado de la base de datos.");
  });
