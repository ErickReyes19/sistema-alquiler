export type Acompanante = {
    id?: string;
    nombreCompleto: string;
    parentesco: string;
    activo?: boolean;
  };
  
  export type Inquilino = {
    id?: string;
    nombreCompleto: string;
    dni: string;
    telefono: string;
    correo?: string;
    fechaNacimiento: string;
    activo?: boolean;
    // <-- aquí añadimos el array de acompañantes
    acompanantes?: Acompanante[];
  };
  
  // Opcionalmente, si quieres un tipo específico para el formulario que garantice siempre el array:
  export type InquilinoForm = Omit<Inquilino, "acompanantes"> & {
    acompanantes: Acompanante[];
  };
  