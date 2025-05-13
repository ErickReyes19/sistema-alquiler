import { PrismaClient } from "../app/generated/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

type SeederItem<T> = { create: T };

async function main() {
  console.log("🔌 Conectando a la base de datos...");
  const permisoNames = [
    "ver_permisos", "ver_roles", "crear_roles", "editar_roles",
    "ver_usuarios", "crear_usuario", "editar_usuario",
    "ver_inquilinos", "crear_inquilino", "editar_inquilino",
    "ver_acompanantes", "editar_tipo_habitacion",
    "ver_tipos_habitacion", "crear_tipo_habitacion", "ver_apartamentos",
    "crear_apartamento","editar_apartamento","crear_servicio","ver_servicios",
    "editar_servicio","ver_contratos","crear_contrato","editar_contrato",
  ];

  // Seed Permisos
  const permisos = await Promise.all(
    permisoNames.map((nombre) =>
      prisma.permiso.upsert({
        where: { nombre },
        update: {},
        create: { id: randomUUID(), nombre, descripcion: `Permite ${nombre.replace(/_/g, " ")}`, activo: true }
      })
    )
  );
  console.log("✅ Permisos seed completado");

  // Seed Rol Admin
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: "administrador" },
    update: {},
    create: {
      id: randomUUID(), nombre: "administrador",
      descripcion: "Rol con todos los permisos de administración", activo: true,
      permisos: { create: permisos.map(p => ({ id: randomUUID(), permiso: { connect: { id: p.id } } })) }
    }
  });
  console.log("✅ Rol administrador seed completado");

  // Seed Usuario Admin
  const email = "erickjosepineda33@gmail.com";
  const hashedPassword = await bcrypt.hash("erick.reyes", 10);
  await prisma.usuario.upsert({
    where: { email },
    update: {},
    create: {
      id: randomUUID(), nombre: "erick.reyes", email,
      password: hashedPassword, activo: true,
      rolId: rolAdmin.id, DebeCambiar: true
    }
  });
  console.log("✅ Usuario administrador seed completado");

  // Seed TiposHabitacion
  const tipos = ["Cocina", "Sala", "Dormitorio", "Baño"].map(nombre => ({ nombre }));
  const tiposCreated = await Promise.all(
    tipos.map(t => prisma.tiposHabitacion.upsert({
      where: { nombre: t.nombre }, update: {}, create: { nombre: t.nombre, activo: true }
    }))
  );
  console.log("✅ TiposHabitacion seed completado");

  // Seed Servicios
  const serviciosNames = ["Agua", "Internet"];
  const servicios = await Promise.all(
    serviciosNames.map(nombre => prisma.servicios.upsert({ where: { nombre }, update: {}, create: { nombre, activo: true } }))
  );
  console.log("✅ Servicios seed completado");

  // Seed Apartamentos
  const aptosData = [
    { numero: "A101", direccion: "Calle 1", disponible: true },
    { numero: "B202", direccion: "Calle 2", disponible: true }
  ];
  const aptos = await Promise.all(
    aptosData.map(a => prisma.apartamento.upsert({
      where: { numero: a.numero },
      update: {},
      create: {
        ...a,
        activo: true, // Agregar el campo activo
      }
    }))
  );
  
  console.log("✅ Apartamentos seed completado");

  // Seed Habitaciones por Apartamento
  for (const apto of aptos) {
    for (const tipo of tiposCreated) {
      await prisma.habitaciones.create({
        data: {
          apartamentoId: apto.id,
          tipoHabitacionId: tipo.id,
          cantidad: 1,
          activo: true, // Agregar el campo activo
        }
      });
    }
  }
  
  console.log("✅ Habitaciones seed completado");

  // Seed ApartamentoServicios
  for (const apto of aptos) {
    for (const serv of servicios) {
      await prisma.apartamentoServicios.create({ data: { apartamentoId: apto.id, servicioId: serv.id, incluido: true, costoAdicional: 0 } });
    }
  }
  console.log("✅ ApartamentoServicios seed completado");

  // Seed Inquilino y Acompañantes
  const inq = await prisma.inquilino.create({
    data: {
      id: randomUUID(), nombreCompleto: "Juan Perez", dni: "12345678", numero: "1010", correo: "juan@ejemplo.com",
      fechaNacimiento: new Date("1990-01-01"), activo: true,
      Acompañante: { create: [{ id: randomUUID(), nombreCompleto: "Ana Perez", Parentesco: "Pareja", activo: true }] }
    }
  });
  console.log("✅ Inquilino y acompañantes seed completado");

  // Seed Contratos
  const contrato = await prisma.contratos.create({
    data: {
      inquilinoId: inq.id, apartamentoId: aptos[0].id,
      fechaInicio: new Date(), montoMensual: 500, activo: true
    }
  });
  console.log("✅ Contratos seed completado");

  // Seed Desviaciones

  // Generar Recibo y Detalles
  const recibo = await prisma.recibos.create({ data: { contratoId: contrato.id, fechaPago: new Date(), total: 550 } });
  await prisma.reciboDetalles.createMany({
    data: [
      { reciboId: recibo.id, descripcion: "Renta Mensual", monto: 500 },
      { reciboId: recibo.id, descripcion: "Multa por ruido", monto: 50 }
    ]
  });
  console.log("✅ Recibos y ReciboDetalles seed completado");

  console.log("🎉 Seed completado exitosamente.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); console.log("🔌 Desconectado de la base de datos."); });
