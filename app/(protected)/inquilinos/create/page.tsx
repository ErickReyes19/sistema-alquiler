// import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
// import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
// import { getPermisosActivos } from "../../permisos/actions";
import { FormularioInquilino } from "../components/Formulario"; // Asegúrate de que el formulario sea para Empleados
import { getPermisosForRoles } from "../../permisos/actions";
import { getSessionPermisos } from "@/auth";
import NoAcceso from "@/components/noAccess";
import { getInquilinoById } from "../actions";

export default async function Create() {


  // Redirige si no hay sesión

  // Verifica permisos para crear empleados
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_inquilino")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para genero
const initialData = {
    nombreCompleto: "",
    dni: "",
    telefono: "",
    correo: "",
    fechaNacimiento: "",
    activo: true,
};


  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un inquilino y asignarle información."
        screenName="Crear Inquilino"
      />
      <FormularioInquilino
        isUpdate={false} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} 
      />
    </div>
  );
}
