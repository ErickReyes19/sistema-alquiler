"use server";

import { randomUUID } from "crypto";

import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  logServerActionError,
  normalizeOptionalText,
  requireEntityId,
  resolveActivo,
} from "@/lib/server-action-utils";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";

import {
  Acompanante,
  ExpedienteArrendamiento,
  GaranteArrendamiento,
  Inquilino,
  ReferenciaArrendamiento,
} from "./type";

const inquilinoInclude = {
  Acompañante: true,
  expedienteArrendamiento: {
    include: {
      referencias: true,
      garantes: true,
    },
  },
} as const;

type InquilinoWithRelations = Prisma.InquilinoGetPayload<{
  include: typeof inquilinoInclude;
}>;
type ExpedienteWithRelations = NonNullable<InquilinoWithRelations["expedienteArrendamiento"]>;

const mapReferenciaToDto = (
  referencia: ExpedienteWithRelations["referencias"][number],
): ReferenciaArrendamiento => ({
  id: referencia.id,
  tipo: referencia.tipo,
  nombreCompleto: referencia.nombreCompleto,
  telefono: referencia.telefono,
  correo: referencia.correo ?? "",
  relacion: referencia.relacion ?? "",
  notas: referencia.notas ?? "",
});

const mapGaranteToDto = (
  garante: ExpedienteWithRelations["garantes"][number],
): GaranteArrendamiento => ({
  id: garante.id,
  nombreCompleto: garante.nombreCompleto,
  dni: garante.dni,
  telefono: garante.telefono,
  correo: garante.correo ?? "",
  empresa: garante.empresa ?? "",
  ingresosMensuales: garante.ingresosMensuales ? Number(garante.ingresosMensuales) : undefined,
  notas: garante.notas ?? "",
});

const emptyExpediente = (): ExpedienteArrendamiento => ({
  ocupacion: "",
  empresa: "",
  historialAlquiler: "",
  motivoSolicitud: "",
  estadoDecision: "PENDIENTE",
  decisionTomadaPor: "",
  fechaDecision: null,
  motivoDecision: "",
  referencias: [],
  garantes: [],
});

const mapInquilinoToDto = (inquilino: InquilinoWithRelations): Inquilino => ({
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
  expedienteArrendamiento: inquilino.expedienteArrendamiento
    ? {
        id: inquilino.expedienteArrendamiento.id,
        ocupacion: inquilino.expedienteArrendamiento.ocupacion ?? "",
        empresa: inquilino.expedienteArrendamiento.empresa ?? "",
        ingresosMensuales: inquilino.expedienteArrendamiento.ingresosMensuales
          ? Number(inquilino.expedienteArrendamiento.ingresosMensuales)
          : undefined,
        historialAlquiler: inquilino.expedienteArrendamiento.historialAlquiler ?? "",
        motivoSolicitud: inquilino.expedienteArrendamiento.motivoSolicitud ?? "",
        estadoDecision: inquilino.expedienteArrendamiento.estadoDecision,
        decisionTomadaPor: inquilino.expedienteArrendamiento.decisionTomadaPor ?? "",
        fechaDecision: inquilino.expedienteArrendamiento.fechaDecision,
        motivoDecision: inquilino.expedienteArrendamiento.motivoDecision ?? "",
        referencias: inquilino.expedienteArrendamiento.referencias.map(mapReferenciaToDto),
        garantes: inquilino.expedienteArrendamiento.garantes.map(mapGaranteToDto),
      }
    : emptyExpediente(),
});

const buildAcompanantesCreateData = (tenantId: string, acompanantes: Acompanante[]) =>
  acompanantes.map((acompanante) => ({
    id: acompanante.id ?? randomUUID(),
    tenantId,
    nombreCompleto: acompanante.nombreCompleto,
    Parentesco: acompanante.parentesco,
    activo: resolveActivo(acompanante.activo),
  }));

const buildReferenciasCreateData = (tenantId: string, referencias: ReferenciaArrendamiento[]) =>
  referencias.map((referencia) => ({
    id: referencia.id ?? randomUUID(),
    tenantId,
    tipo: referencia.tipo,
    nombreCompleto: referencia.nombreCompleto,
    telefono: referencia.telefono,
    correo: normalizeOptionalText(referencia.correo),
    relacion: normalizeOptionalText(referencia.relacion),
    notas: normalizeOptionalText(referencia.notas),
  }));

const buildGarantesCreateData = (tenantId: string, garantes: GaranteArrendamiento[]) =>
  garantes.map((garante) => ({
    id: garante.id ?? randomUUID(),
    tenantId,
    nombreCompleto: garante.nombreCompleto,
    dni: garante.dni,
    telefono: garante.telefono,
    correo: normalizeOptionalText(garante.correo),
    empresa: normalizeOptionalText(garante.empresa),
    ingresosMensuales:
      garante.ingresosMensuales === undefined || garante.ingresosMensuales === null
        ? undefined
        : new Prisma.Decimal(garante.ingresosMensuales),
    notas: normalizeOptionalText(garante.notas),
  }));

const buildExpedienteCreateData = (tenantId: string, expediente: ExpedienteArrendamiento) => ({
  id: expediente.id ?? randomUUID(),
  tenantId,
  ocupacion: normalizeOptionalText(expediente.ocupacion),
  empresa: normalizeOptionalText(expediente.empresa),
  ingresosMensuales:
    expediente.ingresosMensuales === undefined || expediente.ingresosMensuales === null
      ? undefined
      : new Prisma.Decimal(expediente.ingresosMensuales),
  historialAlquiler: normalizeOptionalText(expediente.historialAlquiler),
  motivoSolicitud: normalizeOptionalText(expediente.motivoSolicitud),
  estadoDecision: expediente.estadoDecision ?? "PENDIENTE",
  decisionTomadaPor: normalizeOptionalText(expediente.decisionTomadaPor),
  fechaDecision: expediente.fechaDecision ? new Date(expediente.fechaDecision) : null,
  motivoDecision: normalizeOptionalText(expediente.motivoDecision),
  referencias: {
    create: buildReferenciasCreateData(tenantId, expediente.referencias ?? []),
  },
  garantes: {
    create: buildGarantesCreateData(tenantId, expediente.garantes ?? []),
  },
});

const buildInquilinoData = (
  tenantId: string,
  inquilino: Inquilino & { acompanantes: Acompanante[] },
) => ({
  tenantId,
  nombreCompleto: inquilino.nombreCompleto,
  dni: inquilino.dni,
  activo: resolveActivo(inquilino.activo),
  numero: inquilino.telefono,
  correo: normalizeOptionalText(inquilino.correo, "Sin Correo"),
  fechaNacimiento: new Date(inquilino.fechaNacimiento),
  Acompañante: {
    create: buildAcompanantesCreateData(tenantId, inquilino.acompanantes),
  },
  expedienteArrendamiento: {
    create: buildExpedienteCreateData(tenantId, inquilino.expedienteArrendamiento),
  },
});

async function findInquilinos(where?: { activo?: boolean }): Promise<Inquilino[]> {
  const inquilinos = await prisma.inquilino.findMany({
    where: await buildTenantWhere(where),
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
    const inquilino = await prisma.inquilino.findFirst({
      where: await buildTenantWhere({ id }),
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
    const tenantId = await getTenantIdFromSession();
    const created = await prisma.inquilino.create({
      data: {
        id: inquilino.id ?? randomUUID(),
        ...buildInquilinoData(tenantId, inquilino),
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
    const tenantId = await getTenantIdFromSession();
    const inquilinoId = requireEntityId(inquilino.id, "inquilino");

    const existing = await prisma.inquilino.findFirst({
      where: { id: inquilinoId, tenantId },
      include: { expedienteArrendamiento: true },
    });

    if (!existing) {
      throw new Error("Inquilino no encontrado para el tenant actual.");
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.acompañante.deleteMany({
        where: { inquilinoId, tenantId },
      });

      if (existing.expedienteArrendamiento) {
        await tx.referenciaArrendamiento.deleteMany({
          where: { expedienteArrendamientoId: existing.expedienteArrendamiento.id, tenantId },
        });

        await tx.garanteArrendamiento.deleteMany({
          where: { expedienteArrendamientoId: existing.expedienteArrendamiento.id, tenantId },
        });
      }

      return tx.inquilino.update({
        where: { id: inquilinoId },
        data: {
          tenantId,
          nombreCompleto: inquilino.nombreCompleto,
          dni: inquilino.dni,
          activo: resolveActivo(inquilino.activo),
          numero: inquilino.telefono,
          correo: normalizeOptionalText(inquilino.correo, "Sin Correo"),
          fechaNacimiento: new Date(inquilino.fechaNacimiento),
          Acompañante: {
            create: buildAcompanantesCreateData(tenantId, inquilino.acompanantes),
          },
          expedienteArrendamiento: existing.expedienteArrendamiento
            ? {
                update: {
                  ocupacion: normalizeOptionalText(inquilino.expedienteArrendamiento.ocupacion),
                  empresa: normalizeOptionalText(inquilino.expedienteArrendamiento.empresa),
                  ingresosMensuales:
                    inquilino.expedienteArrendamiento.ingresosMensuales === undefined ||
                    inquilino.expedienteArrendamiento.ingresosMensuales === null
                      ? null
                      : new Prisma.Decimal(inquilino.expedienteArrendamiento.ingresosMensuales),
                  historialAlquiler: normalizeOptionalText(
                    inquilino.expedienteArrendamiento.historialAlquiler,
                  ),
                  motivoSolicitud: normalizeOptionalText(inquilino.expedienteArrendamiento.motivoSolicitud),
                  estadoDecision: inquilino.expedienteArrendamiento.estadoDecision ?? "PENDIENTE",
                  decisionTomadaPor: normalizeOptionalText(
                    inquilino.expedienteArrendamiento.decisionTomadaPor,
                  ),
                  fechaDecision: inquilino.expedienteArrendamiento.fechaDecision
                    ? new Date(inquilino.expedienteArrendamiento.fechaDecision)
                    : null,
                  motivoDecision: normalizeOptionalText(inquilino.expedienteArrendamiento.motivoDecision),
                  referencias: {
                    create: buildReferenciasCreateData(
                      tenantId,
                      inquilino.expedienteArrendamiento.referencias ?? [],
                    ),
                  },
                  garantes: {
                    create: buildGarantesCreateData(
                      tenantId,
                      inquilino.expedienteArrendamiento.garantes ?? [],
                    ),
                  },
                },
              }
            : {
                create: buildExpedienteCreateData(tenantId, inquilino.expedienteArrendamiento),
              },
        },
        include: inquilinoInclude,
      });
    });

    return mapInquilinoToDto(updated);
  } catch (error) {
    logServerActionError("putInquilino", error);
    return null;
  }
}
