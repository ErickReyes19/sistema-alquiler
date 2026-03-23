export type EstadoRenovacionContrato =
  | "SIN_GESTION"
  | "ALERTA_GENERADA"
  | "EN_NEGOCIACION"
  | "RENOVADO"
  | "NO_RENOVADO";

export type EstadoOperacionContrato =
  | "VIGENTE"
  | "POR_VENCER"
  | "VENCIDO"
  | "DESOCUPADO"
  | "INACTIVO";

export type TipoInventarioContrato = "ENTRADA" | "SALIDA";

export type Contrato = {
  id?: string;
  inquilinoId: string;
  apartamentoId: string;
  fechaInicio: string;
  fechaFin?: string | null;
  montoMensual: number;
  activo: boolean;
  preavisoDias: number;
  estadoRenovacion: EstadoRenovacionContrato;
  fechaDesocupacion?: string | null;
  motivoCancelacion?: string | null;
  diasParaVencer?: number | null;
  requiereRenovacion?: boolean;
  alertaVencimiento?: boolean;
  estadoOperacion?: EstadoOperacionContrato;
  inquilino?: string;
  apartamento?: string;
};

export type ContratoCreate = Omit<
  Contrato,
  | "id"
  | "inquilino"
  | "apartamento"
  | "diasParaVencer"
  | "requiereRenovacion"
  | "alertaVencimiento"
  | "estadoOperacion"
  | "fechaDesocupacion"
  | "motivoCancelacion"
>;

export type ContratoUpdate = Contrato;

export interface ContratoRenovacion {
  id: string;
  fechaGestion: string;
  fechaInicioRenovada: string;
  fechaFinRenovada: string | null;
  montoAnterior: number;
  montoNuevo: number;
  porcentajeAjuste: number;
  estado: EstadoRenovacionContrato;
  notas?: string;
}

export interface ContratoAjusteRenta {
  id: string;
  fechaAplicacion: string;
  montoAnterior: number;
  montoNuevo: number;
  porcentajeAjuste: number;
  motivo?: string;
}

export interface ContratoInventario {
  id: string;
  tipo: TipoInventarioContrato;
  fechaRegistro: string;
  observaciones?: string;
  items: string[];
}

export interface ContratoEntrega {
  id: string;
  fechaEntrega: string;
  estadoInmueble: string;
  cargosDanos: number;
  saldoPendiente: number;
  motivoCancelacion?: string;
  observaciones?: string;
}

export interface HistorialOcupacionApartamento {
  contratoId: string;
  inquilino: string;
  fechaInicio: string;
  fechaFin: string | null;
  fechaDesocupacion: string | null;
  motivoCancelacion: string | null;
  montoMensual: number;
  estadoOperacion: EstadoOperacionContrato;
}

export interface ContratoView {
  id: string;
  inquilinoId: string;
  inquiliniIdentidad: string;
  apartamentoId: string;
  fechaInicio: string;
  fechaFin: string | null;
  montoMensual: number;
  activo: boolean;
  preavisoDias: number;
  estadoRenovacion: EstadoRenovacionContrato;
  fechaUltimaRenovacion: string | null;
  fechaDesocupacion: string | null;
  motivoCancelacion: string | null;
  notasCierre: string | null;
  diasParaVencer: number | null;
  requiereRenovacion: boolean;
  alertaVencimiento: boolean;
  estadoOperacion: EstadoOperacionContrato;
  inquilino: string;
  apartamento: {
    numero: string;
    direccion?: string;
    habitaciones: {
      id: string;
      tipoHabitacionId: string;
      tipoHabitacionNombre: string;
      cantidad: number;
      activo: boolean;
    }[];
    servicios: {
      id: string;
      servicioId: string;
      servicioNombre: string;
      incluido: boolean;
      costoAdicional: number;
    }[];
    historialOcupacion: HistorialOcupacionApartamento[];
  };
  renovaciones: ContratoRenovacion[];
  ajustesRenta: ContratoAjusteRenta[];
  inventarios: ContratoInventario[];
  entrega: ContratoEntrega | null;
}

export type RegistrarRenovacionInput = {
  contratoId: string;
  fechaGestion: string;
  fechaInicioRenovada: string;
  fechaFinRenovada?: string;
  montoNuevo: number;
  estado: EstadoRenovacionContrato;
  notas?: string;
};

export type RegistrarAjusteRentaInput = {
  contratoId: string;
  fechaAplicacion: string;
  montoNuevo: number;
  motivo?: string;
};

export type RegistrarInventarioInput = {
  contratoId: string;
  tipo: TipoInventarioContrato;
  fechaRegistro: string;
  observaciones?: string;
  items: string[];
};

export type RegistrarEntregaInput = {
  contratoId: string;
  fechaEntrega: string;
  estadoInmueble: string;
  cargosDanos: number;
  saldoPendiente: number;
  motivoCancelacion?: string;
  observaciones?: string;
};
