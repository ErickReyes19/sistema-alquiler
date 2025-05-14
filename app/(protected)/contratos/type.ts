export type Contrato = {
    id?: string;
    inquilinoId: string;
    apartamentoId: string;
    fechaInicio: string;
    fechaFin?: string | null;
    montoMensual: number;
    activo: boolean;
    inquilino?: string; // nombre
    apartamento?: string; // identificador o nombre
  };
  
  export type ContratoCreate = Omit<Contrato, "id" | "inquilino" | "apartamento">;
  export type ContratoUpdate = Contrato;
  
  export interface ContratoView {
    id: string;
    inquilinoId: string;
    inquiliniIdentidad: string
    apartamentoId: string;
    fechaInicio: string;
    fechaFin: string | null;
    montoMensual: number;
    activo: boolean;
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
    };
  }