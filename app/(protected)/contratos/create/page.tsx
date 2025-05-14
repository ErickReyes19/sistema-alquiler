import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { FilePlus, PlusCircle } from "lucide-react";
import { getRolesPermisosActivos } from "../../roles/actions";
import { Formulario } from "../components/Form";
import { getInquilinosActivosSinContrato } from "../../inquilinos/actions"; // Función para obtener inquilinos activos
import { getApartamentosCompleto, getServiciosActivos } from "../../apartamentos/actions"; // Función para obtener apartamentos activos
import NoAcceso from "@/components/noAccess";

export default async function Create() {
  // Verificar permisos de sesión
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_usuario")) {
    return <NoAcceso />;
  }


  // Obtener inquilinos y apartamentos activos
  const inquilinosActivos = await getInquilinosActivosSinContrato(); // Función para obtener inquilinos activos
  const apartamentosActivos = await getApartamentosCompleto(); // Función para obtener apartamentos activos

  // Definir datos iniciales para el formulario (en este caso para un nuevo usuario)
  const initialData = {
    usuario: "",
    contrasena: "",
    rol_id: "",
    activo: true,
    email: "",
    inquilinoId: "", // Updated to match expected property name
    apartamentoId: "", // Updated to match expected property name
    fechaInicio: new Date().toISOString(), // Convert Date to ISO string
    montoMensual: 0, // Added required property
  };

  return (
    <div>
      <HeaderComponent
        Icon={FilePlus}
        description="En este apartado podrás crear un nuevo contrato"
        screenName="Contrato"
      />
      
      <Formulario 
        isUpdate={false} 
        initialData={initialData}  
        inquilinos={inquilinosActivos} // Pasamos los inquilinos activos al formulario
        apartamentos={apartamentosActivos} // Pasamos los apartamentos activos al formulario
      />
    </div>
  );
}
