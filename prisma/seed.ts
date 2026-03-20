import { PrismaClient, TipoUsuario } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

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

  const permisoNames = [
    "ver_permisos", "ver_roles", "crear_roles", "editar_roles",
    "ver_usuarios", "crear_usuario", "editar_usuario",
    "ver_inquilinos", "crear_inquilino", "editar_inquilino",
    "ver_acompanantes", "editar_tipo_habitacion",
    "ver_tipos_habitacion", "crear_tipo_habitacion", "ver_apartamentos",
    "crear_apartamento", "editar_apartamento", "crear_servicio", "ver_servicios",
    "editar_servicio", "ver_contratos", "crear_contrato", "editar_contrato", "ver_recibos",
    "crear_recibo", "editar_recibo"
  ];

  const permisos = await Promise.all(
    permisoNames.map((nombre) =>
      prisma.permiso.upsert({
        where: { tenantId_nombre: { tenantId: platformTenant.id, nombre } },
        update: {},
        create: {
          id: randomUUID(),
          tenantId: platformTenant.id,
          nombre,
          descripcion: `Permite ${nombre.replace(/_/g, " ")}`,
          activo: true,
          esPermisoSistema: nombre === "ver_permisos",
        }
      })
    )
  );
  console.log("✅ Permisos seed completado");

  const rolAdmin = await prisma.rol.upsert({
    where: { tenantId_nombre: { tenantId: platformTenant.id, nombre: "administrador" } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "administrador",
      descripcion: "Rol con todos los permisos de administración",
      activo: true,
      permisos: {
        create: permisos.map((p) => ({
          tenant: { connect: { id: platformTenant.id } },
          permiso: { connect: { id: p.id } },
        })),
      },
    }
  });
  console.log("✅ Rol administrador seed completado");

  const email = "erickjosepineda33@gmail.com";
  const email2 = "visitante@gmail.com";
  const hashedPassword = await bcrypt.hash("erick.reyes", 10);
  const hashedPassword2 = await bcrypt.hash("visitante", 10);

  await prisma.usuario.upsert({
    where: { tenantId_email: { tenantId: platformTenant.id, email } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "erick.reyes",
      email,
      password: hashedPassword,
      activo: true,
      rolId: rolAdmin.id,
      DebeCambiar: true,
      tipoUsuario: TipoUsuario.ROOT,
    }
  });

  await prisma.usuario.upsert({
    where: { tenantId_email: { tenantId: platformTenant.id, email: email2 } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId: platformTenant.id,
      nombre: "visitante",
      email: email2,
      password: hashedPassword2,
      activo: true,
      rolId: rolAdmin.id,
      DebeCambiar: false,
      tipoUsuario: TipoUsuario.TENANT_ADMIN,
    }
  });
  console.log("✅ Usuario administrador seed completado");

  console.log("🎉 Seed completado exitosamente.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); console.log("🔌 Desconectado de la base de datos."); });
