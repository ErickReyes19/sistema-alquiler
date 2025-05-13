"use server";
import { prisma } from "@/lib/prisma";
import { Inquilino, Acompanante } from "./type";
import { randomUUID } from "crypto";

export async function getInquilinos(): Promise<Inquilino[]> {
  const inquilinos = await prisma.inquilino.findMany({
    include: { Acompañante: true },
  });
  return inquilinos.map((r) => ({
    id:       r.id,
    nombreCompleto:  r.nombreCompleto,
    dni:      r.dni,
    activo:   r.activo,
    telefono: r.numero,
    correo:   r.correo,
    fechaNacimiento: r.fechaNacimiento.toISOString(),
    acompanantes: r.Acompañante.map(a => ({
      id:             a.id,
      nombreCompleto: a.nombreCompleto,
      parentesco:     a.Parentesco,
      fechaNacimiento:a.createAt.toISOString(), // si guardas la fecha real, ajústalo
      activo:         a.activo,
    })),
  }));
}
export async function getInquilinosActivos(): Promise<Inquilino[]> {
  const inquilinos = await prisma.inquilino.findMany({
    where: { activo: true },
    include: { Acompañante: true },
  });
  return inquilinos.map((r) => ({
    id:       r.id,
    nombreCompleto:  r.nombreCompleto,
    dni:      r.dni,
    activo:   r.activo,
    telefono: r.numero,
    correo:   r.correo,
    fechaNacimiento: r.fechaNacimiento.toISOString(),
    acompanantes: r.Acompañante.map(a => ({
      id:             a.id,
      nombreCompleto: a.nombreCompleto,
      parentesco:     a.Parentesco,
      fechaNacimiento:a.createAt.toISOString(), // si guardas la fecha real, ajústalo
      activo:         a.activo,
    })),
  }));
}

export async function getInquilinoById(id: string): Promise<Inquilino | null> {
  const r = await prisma.inquilino.findUnique({
    where: { id },
    include: { Acompañante: true },
  });
  if (!r) return null;
  return {
    id:       r.id,
    nombreCompleto:  r.nombreCompleto,
    dni:      r.dni,
    activo:   r.activo,
    telefono: r.numero,
    correo:   r.correo,
    fechaNacimiento: r.fechaNacimiento.toISOString(),
    acompanantes: r.Acompañante.map(a => ({
      id:             a.id,
      nombreCompleto: a.nombreCompleto,
      parentesco:     a.Parentesco,
      fechaNacimiento:a.createAt.toISOString(),
      activo:         a.activo,
    })),
  };
}

export async function postInquilino({
  inquilino,
}: {
  inquilino: Inquilino & { acompanantes: Acompanante[] };
}): Promise<Inquilino | null> {
  const created = await prisma.inquilino.create({
    data: {
      id:             inquilino.id ?? randomUUID(),
      nombreCompleto: inquilino.nombreCompleto,
      dni:            inquilino.dni,
      activo:         inquilino.activo ?? true,
      numero:         inquilino.telefono,
      correo:         inquilino.correo ?? "Sin Correo",
      fechaNacimiento:new Date(inquilino.fechaNacimiento),
      Acompañante: {
        create: inquilino.acompanantes.map(a => ({
          id:             a.id ?? randomUUID(),
          nombreCompleto: a.nombreCompleto,
          Parentesco:     a.parentesco,
          activo:         a.activo ?? true,
        })),
      },
    },
    include: { Acompañante: true },
  });

  return {
    id:       created.id,
    nombreCompleto:  created.nombreCompleto,
    dni:      created.dni,
    activo:   created.activo,
    telefono: created.numero,
    correo:   created.correo,
    fechaNacimiento: created.fechaNacimiento.toISOString(),
    acompanantes: created.Acompañante.map(a => ({
      id:             a.id,
      nombreCompleto: a.nombreCompleto,
      parentesco:     a.Parentesco,
      activo:         a.activo,
    })),
  };
}

export async function putInquilino({
  inquilino,
}: {
  inquilino: Inquilino & { acompanantes: Acompanante[] };
}): Promise<Inquilino | null> {
  if (!inquilino.id) throw new Error("ID es obligatorio para actualizar.");

  // Estrategia: borrar los viejos y crear los nuevos.
  // Otra opción: hacer upsert individual por cada acompañante.
  await prisma.acompañante.deleteMany({
    where: { inquilinoId: inquilino.id },
  });

  const updated = await prisma.inquilino.update({
    where: { id: inquilino.id },
    data: {
      nombreCompleto: inquilino.nombreCompleto,
      dni:            inquilino.dni,
      activo:         inquilino.activo ?? true,
      numero:         inquilino.telefono,
      correo:         inquilino.correo ?? "Sin Correo",
      fechaNacimiento:new Date(inquilino.fechaNacimiento),
      Acompañante: {
        create: inquilino.acompanantes.map(a => ({
          id:             a.id ?? randomUUID(),
          nombreCompleto: a.nombreCompleto,
          Parentesco:     a.parentesco,
          activo:         a.activo ?? true,
        })),
      },
    },
    include: { Acompañante: true },
  });

  return {
    id:       updated.id,
    nombreCompleto:  updated.nombreCompleto,
    dni:      updated.dni,
    activo:   updated.activo,
    telefono: updated.numero,
    correo:   updated.correo,
    fechaNacimiento: updated.fechaNacimiento.toISOString(),
    acompanantes: updated.Acompañante.map(a => ({
      id:             a.id,
      nombreCompleto: a.nombreCompleto,
      parentesco:     a.Parentesco,
      activo:         a.activo,
    })),
  };
}
