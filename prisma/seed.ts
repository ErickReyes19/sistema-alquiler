import { PrismaClient, TipoUsuario } from "../app/generated/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

import { ROOT_PERMISSION_NAMES, SYSTEM_HIDDEN_PERMISSION_NAMES, TENANT_PERMISSION_NAMES } from "../lib/platform-permissions";

const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

async function main() {
  console.log("🔌 Conectando a la base de datos...");

  const platformTenant = await prisma.tenant.upsert({
    where: { slug: "platform-root" },
    update: {},
    create: {
      id: randomUUID(),
      nombre: "Plataforma",
      slug: "platform-root",
      activo: true,
    },
  });

  const rootPermissions = await Promise.all(
    ROOT_PERMISSION_NAMES.map((nombre) =>
      prisma.permiso.upsert({
        where: { tenantId_nombre: { tenantId: platformTenant.id, nombre } },
        update: {},
        create: {
          id: randomUUID(),
          tenantId: platformTenant.id,
          nombre,
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
          esPermisoSistema: true,
        }
      })
    )
  );

  await Promise.all(
    TENANT_PERMISSION_NAMES.map((nombre) =>
      prisma.permiso.upsert({
        where: { tenantId_nombre: { tenantId: platformTenant.id, nombre } },
        update: {},
        create: {
          id: randomUUID(),
          tenantId: platformTenant.id,
          nombre,
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
          esPermisoSistema: SYSTEM_HIDDEN_PERMISSION_NAMES.has(nombre),
        },
      })
    )
  )
  console.log("✅ Permisos root seed completado");

  const rolRoot = await prisma.rol.upsert({
    where: { tenantId_nombre: { tenantId: platformTenant.id, nombre: "root" } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "root",
      descripcion: "Rol del dueño de la plataforma para gestionar tenants y sus usuarios",
      activo: true,
      permisos: {
        create: rootPermissions.map((p: any) => ({
          tenant: { connect: { id: platformTenant.id } },
          permiso: { connect: { id: p.id } },
        })),
      },
    }
  });
  console.log("✅ Rol root seed completado");

  const email = "erickjosepineda33@gmail.com";
  const hashedPassword = await bcrypt.hash("erick.reyes", 10);

  await prisma.usuario.upsert({
    where: { tenantId_email: { tenantId: platformTenant.id, email } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "root.platform",
      email,
      password: hashedPassword,
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
