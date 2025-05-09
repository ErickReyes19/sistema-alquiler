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
