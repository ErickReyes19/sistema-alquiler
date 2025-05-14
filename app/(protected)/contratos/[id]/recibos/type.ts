import { Decimal } from "@/app/generated/prisma/runtime/library";

// Recibo básico
export type Recibo = {
  id?: string;
  contratoId: string;
  fechaPago: string;          // ISO string
  total: number;
};

// Para crear un recibo (el total podrías calcularlo en el servidor)
export type ReciboCreate = Omit<Recibo, "id">;

// Para actualizar un recibo (incluye todas las propiedades)
export type ReciboUpdate = Recibo;

// Detalle de un recibo
export type ReciboDetalle = {
  id?: string;
  reciboId?: string;
  descripcion: string;
  monto: number;
};

// Para crear un detalle (se asigna reciboId en el servidor)
export type ReciboDetalleCreate = Omit<ReciboDetalle, "id" | "reciboId">;

// Para actualizar un detalle
export type ReciboDetalleUpdate = ReciboDetalle;

// View que retorna un recibo con sus detalles
export interface ReciboView {
  id: string;
  contratoId: string;
  fechaPago: string;
  total: number;
  detalles: {
    id: string;
    descripcion: string;
    monto: number;
  }[];
}


export type DetallesParaNuevoRecibo = {
  contratoId: string
  montoMensual: string
  apartamento: {
    id: string
    numero: string
  }
  servicios: {
    id: string
    nombre: string
    costoAdicional: string
    incluido: boolean
  }[]
}


export type ReciboCompleto = {
  id: string;
  fechaPago: Date;
  total: number;
  contrato: {
    id: string;
    fechaInicio: Date;
    fechaFin: Date | null;
    montoMensual: number;
    activo: boolean;
    inquilino: {
      id: string;
      nombre: string;
      identidad: string;
      numero: string;
    };
    apartamento: {
      id: string;
      numero: string;
      direccion: string;
    };
  };
  detalles: Array<{
    id: string;
    descripcion: string;
    monto: number;
  }>;
};


// Ahora extendemos tu ContratoView para incluir recibos

