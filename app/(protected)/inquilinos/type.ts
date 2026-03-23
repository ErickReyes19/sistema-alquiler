export type Acompanante = {
  id?: string;
  nombreCompleto: string;
  parentesco: string;
  activo?: boolean;
};

export type ReferenciaArrendamiento = {
  id?: string;
  tipo: "PERSONAL" | "LABORAL" | "ARRENDADOR_ANTERIOR";
  nombreCompleto: string;
  telefono: string;
  correo?: string;
  relacion?: string;
  notas?: string;
};

export type GaranteArrendamiento = {
  id?: string;
  nombreCompleto: string;
  dni: string;
  telefono: string;
  correo?: string;
  empresa?: string;
  ingresosMensuales?: number;
  notas?: string;
};

export type ExpedienteArrendamiento = {
  id?: string;
  ocupacion?: string;
  empresa?: string;
  ingresosMensuales?: number;
  historialAlquiler?: string;
  motivoSolicitud?: string;
  estadoDecision?: "PENDIENTE" | "APROBADO" | "RECHAZADO";
  decisionTomadaPor?: string;
  fechaDecision?: Date | null;
  motivoDecision?: string;
  referencias?: ReferenciaArrendamiento[];
  garantes?: GaranteArrendamiento[];
};

export type Inquilino = {
  id?: string;
  nombreCompleto: string;
  dni: string;
  telefono: string;
  correo?: string;
  fechaNacimiento: Date;
  activo?: boolean;
  acompanantes: Acompanante[];
  expedienteArrendamiento: ExpedienteArrendamiento;
};

export type InquilinoForm = Inquilino;
