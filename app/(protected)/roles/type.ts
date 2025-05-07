
export type Rol = {
    id?: string;
    nombre: string;
    descripcion: string;
    activo?: boolean;
    permisos: PermisosRol[];
};

export type PermisosRol = {
    id: string;
    nombre: string;
};

export function mapRol(rolPrisma: {
    id: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
    permisos: { id: string; nombre: string }[];
  }): Rol {
    return {
      id: rolPrisma.id,
      nombre: rolPrisma.nombre,
      descripcion: rolPrisma.descripcion,
      activo: rolPrisma.activo
    };
  }
  
