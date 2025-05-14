
// import { getPermisosActivos } from "@/app/(protected)/permisos/actions";
// import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
// import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import {  getPermisosForRoles } from "@/app/(protected)/permisos/actions";
import NoAcceso from "@/components/noAccess";
import { getSessionPermisos } from "@/auth";
import { getInquilinoById } from "../../actions";
import { FormularioInquilino } from "../../components/Formulario";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_roles")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const inquilino = await getInquilinoById(params.id);
  // console.log("🚀 ~ Edit ~ roles:", roles)
  if (!inquilino) {
    redirect("/roles"); // Redirige si no se encuentra el cliente
  }



  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un inquilino y asignarle acompañantes."
        screenName="Editar Inquilino"
      />
      <FormularioInquilino
        isUpdate={true}
        initialData={inquilino} 
      />
    </div>
  );
}
