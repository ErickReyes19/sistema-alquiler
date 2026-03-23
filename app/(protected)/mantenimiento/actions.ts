"use server";

import { endOfMonth, format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import {
  EstadoMantenimiento,
  OrigenMantenimiento,
  TipoMantenimiento,
} from "@/lib/generated/prisma";

import { prisma } from "@/lib/prisma";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";
import {
  maintenanceOriginOptions,
  maintenanceStatusOptions,
  maintenanceTypeOptions,
} from "./constants";

const toNumber = (value: { toString(): string } | number | null | undefined) => Number(value ?? 0);

const typeLabelMap = new Map(maintenanceTypeOptions.map((item) => [item.value, item.label]));
const originLabelMap = new Map(maintenanceOriginOptions.map((item) => [item.value, item.label]));
const statusLabelMap = new Map(maintenanceStatusOptions.map((item) => [item.value, item.label]));

export type MaintenanceFormInput = {
  id?: string;
  apartamentoId: string;
  tipo: TipoMantenimiento;
  origen: OrigenMantenimiento;
  titulo: string;
  descripcion: string;
  proveedorAsignado?: string;
  costoEstimado?: number;
  costoReal?: number | null;
  fechaReporte: string;
  fechaAtencion?: string;
  afectaDisponibilidad?: boolean;
  estado: EstadoMantenimiento;
  evidenciaFotos?: string;
};

export type MaintenanceListItem = {
  id: string;
  apartamentoId: string;
  apartamento: string;
  direccion?: string | null;
  contratoId?: string | null;
  inquilino?: string | null;
  tipo: TipoMantenimiento;
  tipoLabel: string;
  origen: OrigenMantenimiento;
  origenLabel: string;
  titulo: string;
  descripcion: string;
  proveedorAsignado?: string | null;
  costoEstimado: number;
  costoReal: number;
  fechaReporte: string;
  fechaAtencion?: string | null;
  afectaDisponibilidad: boolean;
  estado: EstadoMantenimiento;
  estadoLabel: string;
  evidenciaFotos: string[];
};

export type MaintenanceModuleData = {
  resumen: {
    abiertas: number;
    enProceso: number;
    resueltasMes: number;
    preventivos: number;
    correctivos: number;
    costoEstimadoAbierto: number;
    costoRealMes: number;
    unidadesFueraServicio: number;
  };
  metadata: {
    mesActual: string;
    fechaCorte: string;
  };
  apartamentos: Array<{ id: string; numero: string; direccion?: string | null }>;
  incidencias: MaintenanceListItem[];
};

function normalizeDate(value?: string, label = "fecha") {
  if (!value) return undefined;
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`La ${label} no es válida.`);
  }

  return parsed;
}

function parseEvidence(value?: string) {
  return (value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function resolveContratoId(apartamentoId: string, tenantId: string) {
  const contrato = await prisma.contratos.findFirst({
    where: {
      tenantId,
      apartamentoId,
      activo: true,
    },
    orderBy: {
      fechaInicio: "desc",
    },
    select: {
      id: true,
    },
  });

  return contrato?.id ?? null;
}

function normalizeInput(input: MaintenanceFormInput) {
  const titulo = input.titulo.trim();
  const descripcion = input.descripcion.trim();
  const proveedorAsignado = input.proveedorAsignado?.trim() || undefined;
  const costoEstimado = Number(input.costoEstimado ?? 0);
  const costoReal = input.costoReal == null ? undefined : Number(input.costoReal);
  const fechaReporte = normalizeDate(input.fechaReporte, "fecha de reporte");
  const fechaAtencion = normalizeDate(input.fechaAtencion, "fecha de atención");

  if (!input.apartamentoId) {
    throw new Error("Debe seleccionar un apartamento.");
  }

  if (!titulo) {
    throw new Error("El título es obligatorio.");
  }

  if (!descripcion) {
    throw new Error("La descripción es obligatoria.");
  }

  if (!fechaReporte) {
    throw new Error("La fecha de reporte es obligatoria.");
  }

  if (!Number.isFinite(costoEstimado) || costoEstimado < 0) {
    throw new Error("El costo estimado debe ser cero o mayor.");
  }

  if (costoReal !== undefined && (!Number.isFinite(costoReal) || costoReal < 0)) {
    throw new Error("El costo real debe ser cero o mayor.");
  }

  return {
    apartamentoId: input.apartamentoId,
    tipo: input.tipo,
    origen: input.origen,
    titulo,
    descripcion,
    proveedorAsignado,
    costoEstimado,
    costoReal,
    fechaReporte,
    fechaAtencion,
    afectaDisponibilidad: Boolean(input.afectaDisponibilidad),
    estado: input.estado,
    evidenciaFotos: parseEvidence(input.evidenciaFotos),
  };
}

function mapMaintenance(data: any): MaintenanceListItem {
  return {
    id: data.id,
    apartamentoId: data.apartamentoId,
    apartamento: data.apartamento.numero,
    direccion: data.apartamento.direccion,
    contratoId: data.contratoId,
    inquilino: data.contrato?.inquilino?.nombreCompleto ?? null,
    tipo: data.tipo,
    tipoLabel: typeLabelMap.get(data.tipo) ?? data.tipo,
    origen: data.origen,
    origenLabel: originLabelMap.get(data.origen) ?? data.origen,
    titulo: data.titulo,
    descripcion: data.descripcion,
    proveedorAsignado: data.proveedorAsignado,
    costoEstimado: toNumber(data.costoEstimado),
    costoReal: toNumber(data.costoReal),
    fechaReporte: data.fechaReporte.toISOString(),
    fechaAtencion: data.fechaAtencion?.toISOString() ?? null,
    afectaDisponibilidad: data.afectaDisponibilidad,
    estado: data.estado,
    estadoLabel: statusLabelMap.get(data.estado) ?? data.estado,
    evidenciaFotos: data.evidencias.map((item: { url: string }) => item.url),
  };
}

export async function getMaintenanceModuleData(): Promise<MaintenanceModuleData> {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const [apartamentos, incidencias] = await Promise.all([
    prisma.apartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      orderBy: { numero: "asc" },
      select: { id: true, numero: true, direccion: true },
    }),
    prisma.mantenimientoIncidencia.findMany({
      where: await buildTenantWhere({}),
      include: {
        apartamento: true,
        contrato: {
          include: {
            inquilino: true,
          },
        },
        evidencias: {
          orderBy: { createAt: "asc" },
        },
      },
      orderBy: [{ estado: "asc" }, { fechaReporte: "desc" }, { createAt: "desc" }],
    }),
  ]);

  const items = incidencias.map(mapMaintenance);
  const abiertas = items.filter((item) => item.estado === "REPORTADO").length;
  const enProceso = items.filter((item) => item.estado === "EN_PROCESO").length;
  const resueltasMes = items.filter((item) => {
    if (item.estado !== "RESUELTO" || !item.fechaAtencion) return false;
    const fecha = new Date(item.fechaAtencion);
    return fecha >= start && fecha <= end;
  }).length;
  const preventivos = items.filter((item) => item.tipo === "PREVENTIVO").length;
  const correctivos = items.filter((item) => item.tipo === "CORRECTIVO" || item.tipo === "DANIO_REPORTADO").length;
  const costoEstimadoAbierto = items
    .filter((item) => item.estado !== "RESUELTO")
    .reduce((sum, item) => sum + item.costoEstimado, 0);
  const costoRealMes = items
    .filter((item) => item.fechaAtencion)
    .filter((item) => {
      const fecha = new Date(item.fechaAtencion!);
      return fecha >= start && fecha <= end;
    })
    .reduce((sum, item) => sum + item.costoReal, 0);
  const unidadesFueraServicio = new Set(
    items
      .filter((item) => item.afectaDisponibilidad && item.estado !== "RESUELTO")
      .map((item) => item.apartamentoId)
  ).size;

  return {
    resumen: {
      abiertas,
      enProceso,
      resueltasMes,
      preventivos,
      correctivos,
      costoEstimadoAbierto,
      costoRealMes,
      unidadesFueraServicio,
    },
    metadata: {
      mesActual: format(now, "MMMM yyyy", { locale: es }),
      fechaCorte: now.toISOString(),
    },
    apartamentos,
    incidencias: items,
  };
}

export async function createMaintenance(input: MaintenanceFormInput) {
  const tenantId = await getTenantIdFromSession();
  const data = normalizeInput(input);

  const apartamento = await prisma.apartamento.findFirst({
    where: { id: data.apartamentoId, tenantId, activo: true },
    select: { id: true },
  });

  if (!apartamento) {
    throw new Error("El apartamento seleccionado no existe para este tenant.");
  }

  const contratoId = await resolveContratoId(data.apartamentoId, tenantId);

  await prisma.mantenimientoIncidencia.create({
    data: {
      tenantId,
      apartamentoId: data.apartamentoId,
      contratoId,
      tipo: data.tipo,
      origen: data.origen,
      titulo: data.titulo,
      descripcion: data.descripcion,
      proveedorAsignado: data.proveedorAsignado,
      costoEstimado: data.costoEstimado,
      costoReal: data.costoReal,
      fechaReporte: data.fechaReporte,
      fechaAtencion: data.fechaAtencion,
      afectaDisponibilidad: data.afectaDisponibilidad,
      estado: data.estado,
      evidencias: data.evidenciaFotos.length
        ? {
            create: data.evidenciaFotos.map((url) => ({
              tenantId,
              url,
            })),
          }
        : undefined,
    },
  });

  revalidatePath("/mantenimiento");
  revalidatePath("/dashboard");
  revalidatePath("/gastos");

  return { ok: true };
}

export async function updateMaintenance(input: MaintenanceFormInput) {
  const tenantId = await getTenantIdFromSession();

  if (!input.id) {
    throw new Error("El identificador de la incidencia es obligatorio para editar.");
  }

  const data = normalizeInput(input);

  const existing = await prisma.mantenimientoIncidencia.findFirst({
    where: { id: input.id, tenantId },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("La incidencia no existe para este tenant.");
  }

  const apartamento = await prisma.apartamento.findFirst({
    where: { id: data.apartamentoId, tenantId, activo: true },
    select: { id: true },
  });

  if (!apartamento) {
    throw new Error("El apartamento seleccionado no existe para este tenant.");
  }

  const contratoId = await resolveContratoId(data.apartamentoId, tenantId);

  await prisma.mantenimientoIncidencia.update({
    where: { id: input.id },
    data: {
      apartamentoId: data.apartamentoId,
      contratoId,
      tipo: data.tipo,
      origen: data.origen,
      titulo: data.titulo,
      descripcion: data.descripcion,
      proveedorAsignado: data.proveedorAsignado,
      costoEstimado: data.costoEstimado,
      costoReal: data.costoReal,
      fechaReporte: data.fechaReporte,
      fechaAtencion: data.fechaAtencion,
      afectaDisponibilidad: data.afectaDisponibilidad,
      estado: data.estado,
      evidencias: {
        deleteMany: {},
        create: data.evidenciaFotos.map((url) => ({
          tenantId,
          url,
        })),
      },
    },
  });

  revalidatePath("/mantenimiento");
  revalidatePath("/dashboard");
  revalidatePath("/gastos");

  return { ok: true };
}
