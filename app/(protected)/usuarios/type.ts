
export type Usuario = {
    id?: string;
    usuario: string;
    email: string;
    rol?: string;
    rol_id: string;
    activo: boolean;
    password?: string; // Solo para crear o actualizar
    
}

export type UsuarioCreate = Omit<Usuario, "id" | "activo">;

// UsuarioUpdate: Para actualizar un usuario existente (requiere 'id' y 'activo')
export type UsuarioUpdate = Required<Usuario> & { usuario: string };  
