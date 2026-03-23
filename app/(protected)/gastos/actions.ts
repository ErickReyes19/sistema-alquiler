"use server";

import { endOfMonth, format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CategoriaGasto } from "@/lib/generated/prisma";

import { prisma } from "@/lib/prisma";
import { categoriaOptions } from "./constants";
import { buildTenantWhere, getTenantIdFromSession } from "@/lib/tenant-session";

const toNumber = (value: { toString(): string } | number | null | undefined) => Number(value ?? 0);

const categoriaLabelMap = new Map(categoriaOptions.map((item) => [item.value, item.label]));

export type GastoFormInput = {
  id?: string;
  apartamentoId: string;
  fecha: string;
  categoria: CategoriaGasto;
  concepto: string;
  descripcion?: string;
  monto: number;
  extraordinario?: boolean;
};

export type GastoListItem = {
  id: string;
  apartamentoId: string;
  apartamento: string;
  fecha: string;
  categoria: CategoriaGasto;
  categoriaLabel: string;
  concepto: string;
  descripcion?: string | null;
  monto: number;
  extraordinario: boolean;
};

export type RentabilidadApartamentoItem = {
  apartamentoId: string;
  apartamento: string;
  direccion?: string | null;
  inquilino: string;
  ingresosMes: number;
  gastosMes: number;
  utilidadMes: number;
  margen: number;
  gastoCount: number;
  disponible: boolean;
};

export type GastosModuleData = {
  resumen: {
    ingresosMes: number;
    gastosMes: number;
    utilidadMes: number;
    propiedadesRentables: number;
    propiedadesConPerdida: number;
    gastoPromedio: number;
  };
  metadata: {
    mesActual: string;
    fechaCorte: string;
  };
  apartamentos: Array<{ id: string; numero: string; direccion?: string | null }>;
  rentabilidadPorApartamento: RentabilidadApartamentoItem[];
  gastosRecientes: GastoListItem[];
};

function getCategoriaLabel(categoria: CategoriaGasto) {
  return categoriaLabelMap.get(categoria) ?? categoria;
}

function normalizeInput(input: GastoFormInput) {
  const concepto = input.concepto.trim();
  const descripcion = input.descripcion?.trim() || undefined;
  const monto = Number(input.monto);
  const fecha = new Date(input.fecha);

  if (!input.apartamentoId) {
    throw new Error("Debe seleccionar un apartamento.");
  }

  if (!concepto) {
    throw new Error("El concepto del gasto es obligatorio.");
  }

  if (!Number.isFinite(monto) || monto <= 0) {
    throw new Error("El monto debe ser mayor a cero.");
  }

  if (Number.isNaN(fecha.getTime())) {
    throw new Error("La fecha del gasto no es válida.");
  }

  return {
    apartamentoId: input.apartamentoId,
    categoria: input.categoria,
    concepto,
    descripcion,
    monto,
    fecha,
    extraordinario: Boolean(input.extraordinario),
  };
}

export async function getGastosModuleData(): Promise<GastosModuleData> {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const [apartamentos, contratosActivos, recibosMes, gastosMes, gastosRecientes] = await Promise.all([
    prisma.apartamento.findMany({
      where: await buildTenantWhere({ activo: true }),
      orderBy: { numero: "asc" },
      select: { id: true, numero: true, direccion: true, disponible: true },
    }),
    prisma.contratos.findMany({
      where: await buildTenantWhere({ activo: true }),
      include: { inquilino: true, apartamento: true },
    }),
    prisma.recibos.findMany({
      where: await buildTenantWhere({
        fechaPago: { gte: start, lte: end },
      }),
      include: {
        contrato: {
          include: {
            apartamento: true,
          },
        },
      },
    }),
    prisma.gastoApartamento.findMany({
      where: await buildTenantWhere({
        fecha: { gte: start, lte: end },
      }),
      include: { apartamento: true },
      orderBy: [{ fecha: "desc" }, { createAt: "desc" }],
    }),
    prisma.gastoApartamento.findMany({
      where: await buildTenantWhere({}),
      include: { apartamento: true },
      orderBy: [{ fecha: "desc" }, { createAt: "desc" }],
      take: 50,
    }),
  ]);

  const ingresosPorApartamento = new Map<string, number>();
  for (const recibo of recibosMes) {
    const apartamentoId = recibo.contrato.apartamentoId;
    ingresosPorApartamento.set(
      apartamentoId,
      (ingresosPorApartamento.get(apartamentoId) ?? 0) + toNumber(recibo.total)
    );
  }

  const gastosPorApartamento = new Map<string, { total: number; count: number }>();
  for (const gasto of gastosMes) {
    const current = gastosPorApartamento.get(gasto.apartamentoId) ?? { total: 0, count: 0 };
    current.total += toNumber(gasto.monto);
    current.count += 1;
    gastosPorApartamento.set(gasto.apartamentoId, current);
  }

  const contratoPorApartamento = new Map(
    contratosActivos.map((contrato) => [contrato.apartamentoId, contrato])
  );

  const rentabilidadPorApartamento = apartamentos
    .map((apartamento) => {
      const contrato = contratoPorApartamento.get(apartamento.id);
      const ingresosMes = ingresosPorApartamento.get(apartamento.id) ?? 0;
      const gastosInfo = gastosPorApartamento.get(apartamento.id) ?? { total: 0, count: 0 };
      const utilidadMes = ingresosMes - gastosInfo.total;
      const margen = ingresosMes > 0 ? (utilidadMes / ingresosMes) * 100 : gastosInfo.total > 0 ? -100 : 0;

      return {
        apartamentoId: apartamento.id,
        apartamento: apartamento.numero,
        direccion: apartamento.direccion,
        inquilino: contrato?.inquilino.nombreCompleto ?? "Sin contrato activo",
        ingresosMes,
        gastosMes: gastosInfo.total,
        utilidadMes,
        margen,
        gastoCount: gastosInfo.count,
        disponible: apartamento.disponible,
      };
    })
    .sort((a, b) => b.utilidadMes - a.utilidadMes);

  const ingresosMes = Array.from(ingresosPorApartamento.values()).reduce((sum, item) => sum + item, 0);
  const totalGastosMes = Array.from(gastosPorApartamento.values()).reduce((sum, item) => sum + item.total, 0);
  const utilidadMes = ingresosMes - totalGastosMes;

  return {
    resumen: {
      ingresosMes,
      gastosMes: totalGastosMes,
      utilidadMes,
      propiedadesRentables: rentabilidadPorApartamento.filter((item) => item.utilidadMes > 0).length,
      propiedadesConPerdida: rentabilidadPorApartamento.filter((item) => item.utilidadMes < 0).length,
      gastoPromedio: gastosMes.length ? totalGastosMes / gastosMes.length : 0,
    },
    metadata: {
      mesActual: format(now, "MMMM yyyy", { locale: es }),
      fechaCorte: now.toISOString(),
    },
    apartamentos: apartamentos.map((apartamento) => ({
      id: apartamento.id,
      numero: apartamento.numero,
      direccion: apartamento.direccion,
    })),
    rentabilidadPorApartamento,
    gastosRecientes: gastosRecientes.map((gasto) => ({
      id: gasto.id,
      apartamentoId: gasto.apartamentoId,
      apartamento: gasto.apartamento.numero,
      fecha: gasto.fecha.toISOString(),
      categoria: gasto.categoria,
      categoriaLabel: getCategoriaLabel(gasto.categoria),
      concepto: gasto.concepto,
      descripcion: gasto.descripcion,
      monto: toNumber(gasto.monto),
      extraordinario: gasto.extraordinario,
    })),
  };
}

export async function createGasto(input: GastoFormInput) {
  const tenantId = await getTenantIdFromSession();
  const data = normalizeInput(input);

  const apartamento = await prisma.apartamento.findFirst({
    where: { id: data.apartamentoId, tenantId },
    select: { id: true },
  });

  if (!apartamento) {
    throw new Error("El apartamento seleccionado no existe para este tenant.");
  }

  await prisma.gastoApartamento.create({
    data: {
      tenantId,
      ...data,
    },
  });

  return { ok: true };
}

export async function updateGasto(input: GastoFormInput) {
  const tenantId = await getTenantIdFromSession();

  if (!input.id) {
    throw new Error("El identificador del gasto es obligatorio para editar.");
  }

  const data = normalizeInput(input);

  const existing = await prisma.gastoApartamento.findFirst({
    where: { id: input.id, tenantId },
    select: { id: true },
  });

  if (!existing) {
    throw new Error("No se encontró el gasto a editar.");
  }

  await prisma.gastoApartamento.update({
    where: { id: input.id },
    data,
  });

  return { ok: true };
}
