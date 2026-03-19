"use server";

import { randomUUID } from "crypto";

import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  logServerActionError,
  normalizeOptionalText,
  requireEntityId,
  resolveActivo,
} from "@/lib/server-action-utils";

import { Acompanante, Inquilino } from "./type";

const inquilinoInclude = {
  Acompañante: true,
} as const;

type InquilinoWithAcompanantes = Prisma.InquilinoGetPayload<{
  include: typeof inquilinoInclude;
}>;

const mapInquilinoToDto = (inquilino: InquilinoWithAcompanantes): Inquilino => ({
  id: inquilino.id,
  nombreCompleto: inquilino.nombreCompleto,
  dni: inquilino.dni,
  activo: inquilino.activo,
  telefono: inquilino.numero,
  correo: inquilino.correo,
  fechaNacimiento: inquilino.fechaNacimiento,
  acompanantes: inquilino.Acompañante.map((acompanante) => ({
    id: acompanante.id,
    nombreCompleto: acompanante.nombreCompleto,
    parentesco: acompanante.Parentesco,
    activo: acompanante.activo,
  })),
});

const buildAcompanantesCreateData = (acompanantes: Acompanante[]) =>
  acompanantes.map((acompanante) => ({
    id: acompanante.id ?? randomUUID(),
    nombreCompleto: acompanante.nombreCompleto,
    Parentesco: acompanante.parentesco,
    activo: resolveActivo(acompanante.activo),
  }));

const buildInquilinoData = (
  inquilino: Inquilino & { acompanantes: Acompanante[] },
) => ({
  nombreCompleto: inquilino.nombreCompleto,
  dni: inquilino.dni,
  activo: resolveActivo(inquilino.activo),
  numero: inquilino.telefono,
  correo: normalizeOptionalText(inquilino.correo, "Sin Correo"),
  fechaNacimiento: new Date(inquilino.fechaNacimiento),
  Acompañante: {
    create: buildAcompanantesCreateData(inquilino.acompanantes),
  },
});

async function findInquilinos(where?: { activo?: boolean }): Promise<Inquilino[]> {
  const inquilinos = await prisma.inquilino.findMany({
    where,
    include: inquilinoInclude,
    orderBy: { nombreCompleto: "asc" },
  });

  return inquilinos.map(mapInquilinoToDto);
}

export async function getInquilinos(): Promise<Inquilino[]> {
  try {
    return await findInquilinos();
  } catch (error) {
    logServerActionError("getInquilinos", error);
    return [];
  }
}

export async function getInquilinosActivosSinContrato(): Promise<Inquilino[]> {
  try {
    return await findInquilinos({ activo: true });
  } catch (error) {
    logServerActionError("getInquilinosActivosSinContrato", error);
    return [];
  }
}

export async function getInquilinoById(id: string): Promise<Inquilino | null> {
  try {
    const inquilino = await prisma.inquilino.findUnique({
      where: { id },
      include: inquilinoInclude,
    });

    return inquilino ? mapInquilinoToDto(inquilino) : null;
  } catch (error) {
    logServerActionError("getInquilinoById", error);
    return null;
  }
}

export async function postInquilino({
  inquilino,
}: {
  inquilino: Inquilino & { acompanantes: Acompanante[] };
}): Promise<Inquilino | null> {
  try {
    const created = await prisma.inquilino.create({
      data: {
        id: inquilino.id ?? randomUUID(),
        ...buildInquilinoData(inquilino),
      },
      include: inquilinoInclude,
    });

    return mapInquilinoToDto(created);
  } catch (error) {
    logServerActionError("postInquilino", error);
    return null;
  }
}

export async function putInquilino({
  inquilino,
}: {
  inquilino: Inquilino & { acompanantes: Acompanante[] };
}): Promise<Inquilino | null> {
  try {
    const inquilinoId = requireEntityId(inquilino.id, "inquilino");

    const updated = await prisma.$transaction(async (tx) => {
      await tx.acompañante.deleteMany({
        where: { inquilinoId },
      });

      return tx.inquilino.update({
        where: { id: inquilinoId },
        data: buildInquilinoData(inquilino),
        include: inquilinoInclude,
      });
    });

    return mapInquilinoToDto(updated);
  } catch (error) {
    logServerActionError("putInquilino", error);
    return null;
  }
}
