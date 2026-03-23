export type EstadoRecibo = "PENDIENTE" | "PAGADO" | "VENCIDO" | "PARCIALMENTE_PAGADO";

export type PagoParcial = {
  id: string;
  fechaPago: string;
  monto: number;
  referencia?: string | null;
  nota?: string | null;
};

export type PromesaPago = {
  id: string;
  fechaPrometida: string;
  montoPrometido: number;
  nota?: string | null;
  cumplida: boolean;
  fechaCumplimiento?: string | null;
};

export type RecordatorioCobranza = {
  id: string;
  canal: "WHATSAPP" | "EMAIL";
  destinatario: string;
  mensaje: string;
  enviadoAt: string;
};

export type Recibo = {
  id?: string;
  contratoId: string;
  fechaPago: string;
  fechaVencimiento: string;
  total: number;
  cargoMora: number;
  saldoPendiente: number;
  estado: EstadoRecibo;
  observacionesCobranza?: string | null;
};

export type ReciboCreate = Omit<Recibo, "id" | "saldoPendiente" | "estado">;

export type ReciboUpdate = Recibo;

export type ReciboDetalle = {
  id?: string;
  reciboId?: string;
  descripcion: string;
  monto: number;
};

export type ReciboDetalleCreate = Omit<ReciboDetalle, "id" | "reciboId">;

export type ReciboDetalleUpdate = ReciboDetalle;

export interface ReciboView {
  id: string;
  contratoId: string;
  fechaPago: string;
  fechaVencimiento: string;
  total: number;
  cargoMora: number;
  saldoPendiente: number;
  estado: EstadoRecibo;
  observacionesCobranza?: string | null;
  montoPagado: number;
  detalles: {
    reciboId: string;
    id: string;
    descripcion: string;
    monto: number;
  }[];
  pagosParciales: PagoParcial[];
  promesasPago: PromesaPago[];
  recordatorios: RecordatorioCobranza[];
}

export type DetallesParaNuevoRecibo = {
  contratoId: string;
  montoMensual: string;
  apartamento: {
    id: string;
    numero: string;
  };
  servicios: {
    id: string;
    nombre: string;
    costoAdicional: string;
    incluido: boolean;
  }[];
};

export type ReciboCompleto = {
  id: string;
  fechaPago: Date;
  fechaVencimiento: Date;
  total: number;
  cargoMora: number;
  saldoPendiente: number;
  estado: EstadoRecibo;
  observacionesCobranza?: string | null;
  montoPagado: number;
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
      correo?: string;
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
  pagosParciales: PagoParcial[];
  promesasPago: PromesaPago[];
  recordatorios: RecordatorioCobranza[];
};
