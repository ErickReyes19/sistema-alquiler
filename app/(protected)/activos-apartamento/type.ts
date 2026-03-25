export type ApartamentoActivoItem = {
  id?: string;
  apartamentoId: string;
  apartamentoNumero: string;
  tipoActivoId: string;
  tipoActivoNombre: string;
  tipoHabitacionId?: string | null;
  tipoHabitacionNombre?: string | null;
  identificador: string;
  descripcion?: string | null;
  activo?: boolean;
};

export type ApartamentoOption = {
  id: string;
  numero: string;
};

export type TipoActivoOption = {
  id: string;
  nombre: string;
};

export type TipoHabitacionOption = {
  id: string;
  nombre: string;
};
