import { PrismaClient, TipoUsuario } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

import { ROOT_PERMISSION_NAMES } from "../lib/platform-permissions";

const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

async function main() {
  console.log("🔌 Conectando a la base de datos...");

  const emailRoot = "root@plataforma.com";
  const passwordRoot = await bcrypt.hash("root.123", 10);

  const platformTenant = await prisma.tenant.upsert({
    where: { slug: "platform-root" },
    update: {
      nombre: "Plataforma",
      activo: true,
    },
    create: {
      id: randomUUID(),
      nombre: "Plataforma",
      slug: "platform-root",
      activo: true,
    },
  });

  const permisosRoot = await Promise.all(
    ROOT_PERMISSION_NAMES.map((nombre) =>
      prisma.permiso.upsert({
        where: { tenantId_nombre: { tenantId: platformTenant.id, nombre } },
        update: {
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
          esPermisoSistema: true,
        },
        create: {
          id: randomUUID(),
          tenantId: platformTenant.id,
          nombre,
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
          esPermisoSistema: true,
        },
      })
    )
  );
  console.log("✅ Permisos root seed completado");

  await prisma.usuario.deleteMany({
    where: {
      tenantId: platformTenant.id,
      email: { not: emailRoot },
    },
  });

  await prisma.rolPermiso.deleteMany({
    where: {
      tenantId: platformTenant.id,
      permiso: { nombre: { notIn: [...ROOT_PERMISSION_NAMES] } },
    },
  });

  await prisma.rol.deleteMany({
    where: {
      tenantId: platformTenant.id,
      nombre: { not: "root" },
    },
  });

  await prisma.permiso.deleteMany({
    where: {
      tenantId: platformTenant.id,
      nombre: { notIn: [...ROOT_PERMISSION_NAMES] },
    },
  });

  await prisma.rolPermiso.deleteMany({
    where: {
      tenantId: platformTenant.id,
      rol: { nombre: "root" },
    },
  });

  const rolRoot = await prisma.rol.upsert({
    where: { tenantId_nombre: { tenantId: platformTenant.id, nombre: "root" } },
    update: {
      descripcion: "Dueño de la plataforma con acceso solo a tenants y usuarios asignables",
      activo: true,
    },
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "root",
      descripcion: "Dueño de la plataforma con acceso solo a tenants y usuarios asignables",
      activo: true,
    }
  });

  await prisma.rolPermiso.createMany({
    data: permisosRoot.map((permiso) => ({
      id: randomUUID(),
      tenantId: platformTenant.id,
      rolId: rolRoot.id,
      permisoId: permiso.id,
    })),
    skipDuplicates: true,
  });
  console.log("✅ Rol root seed completado");

  await prisma.usuario.upsert({
    where: { tenantId_email: { tenantId: platformTenant.id, email: emailRoot } },
    update: {
      nombre: "root",
      password: passwordRoot,
      activo: true,
      rolId: rolRoot.id,
      DebeCambiar: true,
      tipoUsuario: TipoUsuario.ROOT,
    },
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "root",
      email: emailRoot,
      password: passwordRoot,
      activo: true,
      rolId: rolRoot.id,
      DebeCambiar: true,
      tipoUsuario: TipoUsuario.ROOT,
    }
  });
  console.log("✅ Usuario root seed completado");

  console.log("🎉 Seed completado exitosamente.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); console.log("🔌 Desconectado de la base de datos."); });
