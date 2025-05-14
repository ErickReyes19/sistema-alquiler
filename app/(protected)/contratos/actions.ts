"use server";

import { prisma } from "@/lib/prisma";
import { Contrato, ContratoCreate, ContratoUpdate, ContratoView } from "./type";

// Utilidad para mapear
function mapContrato(data: any): Contrato {
  return {
    id: data.id,
    inquilinoId: data.inquilinoId,
    apartamentoId: data.apartamentoId,
    fechaInicio: data.fechaInicio.toISOString(),
    fechaFin: data.fechaFin?.toISOString() ?? null,
    montoMensual: parseFloat(data.montoMensual),
    activo: data.activo,
    inquilino: data.inquilino?.nombreCompleto ?? "",
    apartamento: data.apartamento?.numero ?? "",
  };
}

export async function getContratos(): Promise<Contrato[]> {
  try {
    const response = await prisma.contratos.findMany({
      include: {
        inquilino: true,
        apartamento: true,
      },
      orderBy: {
        fechaInicio: "desc",
      },
    });
    
    return response.map(mapContrato);
  } catch (error) {
    console.error("Error al obtener los contratos:", error);
    return [];
  }
}

export async function postContrato({ contrato }: { contrato: ContratoCreate }): Promise<Contrato> {
  try {
    // Crear el contrato
    const newContrato = await prisma.contratos.create({
      data: {
        inquilinoId: contrato.inquilinoId,
        apartamentoId: contrato.apartamentoId,
        fechaInicio: new Date(contrato.fechaInicio),
        fechaFin: contrato.fechaFin ? new Date(contrato.fechaFin) : null,
        montoMensual: contrato.montoMensual,
        activo: contrato.activo ?? true,
      },
      include: {
        inquilino: true,
        apartamento: true,
      },
    });

    // Marcar el apartamento como no disponible
    await prisma.apartamento.update({
      where: { id: contrato.apartamentoId },
      data: {
        disponible: false,
      },
    });

    return mapContrato(newContrato);
  } catch (error) {
    console.error("Error en postContrato:", error);
    throw new Error("Error al crear el contrato");
  }
}


export async function putContrato({ contrato }: { contrato: ContratoUpdate }): Promise<Contrato> {
 try {
    const updatedContrato = await prisma.contratos.update({
      where: { id: contrato.id },
      data: {
        inquilinoId: contrato.inquilinoId,
        apartamentoId: contrato.apartamentoId,
        fechaInicio: new Date(contrato.fechaInicio),
        fechaFin: contrato.fechaFin ? new Date(contrato.fechaFin) : null,
        montoMensual: contrato.montoMensual,
        activo: contrato.activo,
      },
      include: {
        inquilino: true,
        apartamento: true,
      },
    });

    // Si se establece fechaFin, actualizar disponibilidad del apartamento
    if (contrato.fechaFin) {
      await prisma.apartamento.update({
        where: { id: contrato.apartamentoId },
        data: {
          disponible: true,
        },
      });
    }

    return mapContrato(updatedContrato);
  } catch (error) {
    console.error("Error en putContrato:", error);
    throw new Error("Error al actualizar el contrato");
  }
}


export async function getContratoById(id: string): Promise<Contrato | null> {
  try {
    const contrato = await prisma.contratos.findUnique({
      where: { id },
      include: {
        inquilino: true,
        apartamento: true,
      },
    });

    return contrato ? mapContrato(contrato) : null;
  } catch (error) {
    console.error("Error al obtener el contrato:", error);
    return null;
  }
}

export async function getContratoByIdView(id: string): Promise<ContratoView | null> {
  try {
    const contrato = await prisma.contratos.findUnique({
      where: { id },
      include: {
        inquilino: true, // Relación con el inquilino
        apartamento: {
          include: {
            apartamento: {
              include: {
                tipoHabitacion: true, // Relación con TiposHabitacion
              },
            },
            ApartamentoServicios: {
              include: {
                servicio: true, // Relación con Servicios
              },
            },
          },
        },
      },
    });

    if (!contrato) {
      return null;
    }

    return {
      id: contrato.id,
      inquilinoId: contrato.inquilinoId,
      apartamentoId: contrato.apartamentoId,
      fechaInicio: contrato.fechaInicio.toISOString(),
      fechaFin: contrato.fechaFin?.toISOString() ?? null,
      montoMensual: parseFloat(contrato.montoMensual.toString()),
      activo: contrato.activo,
      inquiliniIdentidad : contrato.inquilino.dni,
      inquilino: contrato.inquilino?.nombreCompleto ?? "",
      apartamento: {
        numero: contrato.apartamento.numero,
        direccion: contrato.apartamento.direccion || undefined,
        habitaciones: contrato.apartamento.apartamento.map((habitacion) => ({
          id: habitacion.id,
          tipoHabitacionId: habitacion.tipoHabitacionId,
          tipoHabitacionNombre: habitacion.tipoHabitacion.nombre,
          cantidad: habitacion.cantidad,
          activo: habitacion.activo,
        })),
        servicios: contrato.apartamento.ApartamentoServicios.map((servicio) => ({
          id: servicio.id,
          servicioId: servicio.servicioId,
          servicioNombre: servicio.servicio.nombre,
          incluido: servicio.incluido,
          costoAdicional: parseFloat(servicio.costoAdicional.toString()),
        })),
      },
    };
  } catch (error) {
    console.error("Error al obtener el contrato:", error);
    return null;
  }
}

