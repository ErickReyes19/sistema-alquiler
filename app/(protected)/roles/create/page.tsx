// import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
// import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
// import { getPermisosActivos } from "../../permisos/actions";
import { FormularioRol } from "../components/Formulario"; // Asegúrate de que el formulario sea para Empleados
import { getPermisosForRoles } from "../../permisos/actions";
import { getSessionPermisos } from "@/auth";
import NoAcceso from "@/components/noAccess";

export default async function Create() {


  // Redirige si no hay sesión

  // Verifica permisos para crear empleados
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_roles")) {
    return <NoAcceso />;
  }

  const permisosData = await getPermisosForRoles();
  // Inicializamos con un valor específico para genero
  const initialData = {
    nombre: "",
    descripcion: "",
    activo: true,
    permisos: [], // Cambié "permiso" a "permisos"

  };


  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un rol y asignarle permisos."
        screenName="Crear Rol" // Cambié la pantalla a "Crear Empleado"
      />
      <FormularioRol
        isUpdate={false} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
        permisos={permisosData}
      />
    </div>
  );
}
