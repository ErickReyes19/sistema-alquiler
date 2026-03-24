export type EstadoRenovacionContrato =
  | "SIN_GESTION"
  | "ALERTA_GENERADA"
  | "EN_NEGOCIACION"
  | "RENOVADO"
  | "NO_RENOVADO";

export type EstadoOperacionContrato =
  | "POR_INICIAR"
  | "VIGENTE"
  | "POR_VENCER"
  | "VENCIDO"
  | "DESOCUPADO"
  | "INACTIVO";

export type TipoInventarioContrato = "ENTRADA" | "SALIDA";

export type EstadoDepositoGarantia =
  | "PENDIENTE"
  | "RECIBIDO"
  | "PARCIALMENTE_DEVUELTO"
  | "APLICADO"
  | "DEVUELTO";

export type TipoMovimientoDepositoGarantia =
  | "RECIBIDO"
  | "APLICADO_DANOS"
  | "APLICADO_SALDO_PENDIENTE"
  | "DEVOLUCION_PARCIAL"
  | "DEVOLUCION_TOTAL"
  | "AJUSTE";

export type Contrato = {
  id?: string;
  inquilinoId: string;
  apartamentoId: string;
  fechaInicio: string;
  fechaFin?: string | null;
  montoMensual: number;
  diaPagoMensual: number;
  reglaIds: string[];
  depositoGarantiaMonto: number;
  fechaRecepcionDeposito?: string | null;
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
  deduccionesDeposito: DeduccionDepositoItem[];
  motivoCancelacion?: string;
  observaciones?: string;
}

export interface DeduccionDepositoItem {
  concepto: string;
  monto: number;
}

export interface MovimientoDepositoGarantia {
  id: string;
  fecha: string;
  tipo: TipoMovimientoDepositoGarantia;
  monto: number;
  descripcion?: string;
}

export interface DepositoGarantia {
  id: string;
  monto: number;
  fechaRecepcion: string | null;
  estado: EstadoDepositoGarantia;
  montoDevuelto: number;
  montoAplicadoDanos: number;
  montoAplicadoSaldo: number;
  saldoRetenido: number;
  reciboRecepcion?: string | null;
  reciboLiquidacion?: string | null;
  observaciones?: string | null;
  movimientos: MovimientoDepositoGarantia[];
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
  diaPagoMensual: number;
  reglaIds: string[];
  depositoGarantiaMonto: number;
  fechaRecepcionDeposito?: string | null;
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
  reglas: {
    id: string;
    reglaId: string;
    nombre: string;
    descripcion?: string | null;
  }[];
  renovaciones: ContratoRenovacion[];
  ajustesRenta: ContratoAjusteRenta[];
  inventarios: ContratoInventario[];
  entrega: ContratoEntrega | null;
  depositoGarantia: DepositoGarantia | null;
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
  deduccionesDeposito?: DeduccionDepositoItem[];
  depositoDevuelto: number;
  observacionDeposito?: string;
  reciboLiquidacion?: string;
  motivoCancelacion?: string;
  observaciones?: string;
};
