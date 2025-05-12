export type Habitacion = {
  id?: string;
  apartamentoId?: string;
  tipoHabitacionId: string;
  cantidad: number;
  activo?: boolean;
};

export type Apartamento = {
  id?: string;
  numero: string;
  direccion?: string;
  disponible?: boolean;
  activo?: boolean;
  habitaciones?: Habitacion[];
};


export type ApartamentoServicio = {
  id?: string;
  apartamentoId?: string;
  servicioId: string;
  incluido?: boolean;
  costoAdicional?: number;
};

export type ApartamentoView = {
  id: string;
  numero: string;
  direccion?: string;
  disponible: boolean;
  activo: boolean;
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
};
