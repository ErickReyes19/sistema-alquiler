import { randomUUID } from "crypto";

import bcrypt from "bcryptjs";

import { PrismaClient, TipoUsuario } from "../lib/generated/prisma";
import { PLATFORM_TENANT_SLUG, ROOT_PERMISSION_NAMES, TENANT_PERMISSION_NAMES } from "../lib/platform-permissions";

const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

async function main() {
  console.log("🔌 Conectando a la base de datos...");

  const emailRoot = "root@plataforma.com";
  const passwordRoot = await bcrypt.hash("root.123", 10);

  const platformTenant = await prisma.tenant.upsert({
    where: { slug: PLATFORM_TENANT_SLUG },
    update: {
      nombre: "Plataforma",
      activo: true,
    },
    create: {
      id: randomUUID(),
      nombre: "Plataforma",
      slug: PLATFORM_TENANT_SLUG,
      activo: true,
    },
  });

  await prisma.permiso.createMany({
    data: ROOT_PERMISSION_NAMES.map((nombre) => ({
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre,
      descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
      activo: true,
      esPermisoSistema: true,
    })),
    skipDuplicates: true,
  });
  await prisma.permiso.createMany({
    data: TENANT_PERMISSION_NAMES.map((nombre) => ({
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre,
      descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
      activo: true,
      esPermisoSistema: false,
    })),
    skipDuplicates: true,
  });

  const permisosRoot = await Promise.all(
    ROOT_PERMISSION_NAMES.map((nombre) =>
      prisma.permiso.update({
        where: { tenantId_nombre: { tenantId: platformTenant.id, nombre } },
        data: {
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
          esPermisoSistema: true,
        },
      })
    )
  );
  console.log("✅ Permisos root verificados sin duplicados");

  await prisma.permiso.updateMany({
    where: {
      tenantId: platformTenant.id,
      nombre: { in: [...TENANT_PERMISSION_NAMES] },
    },
    data: {
      activo: true,
      esPermisoSistema: false,
    },
  });
  console.log("✅ Permisos de tenant globales verificados sin duplicados");

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
    },
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
  console.log("✅ Rol root verificado sin duplicados");

  await prisma.usuario.upsert({
    where: { tenantId_email: { tenantId: platformTenant.id, email: emailRoot } },
    update: {
      nombre: "root",
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
    },
  });
  console.log("✅ Usuario root verificado sin duplicados");

  console.log("🎉 Seed completado exitosamente.");
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Desconectado de la base de datos.");
  });
