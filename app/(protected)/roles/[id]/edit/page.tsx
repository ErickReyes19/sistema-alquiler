
// import { getPermisosActivos } from "@/app/(protected)/permisos/actions";
// import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
// import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getRolPermisoById } from "../../actions";
import { FormularioRol } from "../../components/Formulario";
import {  getPermisosForRoles } from "@/app/(protected)/permisos/actions";
import NoAcceso from "@/components/noAccess";
import { getSessionPermisos } from "@/auth";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_roles")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const roles = await getRolPermisoById(params.id);
  // console.log("🚀 ~ Edit ~ roles:", roles)
  if (!roles) {
    redirect("/roles"); // Redirige si no se encuentra el cliente
  }


  const permisosData = await getPermisosForRoles();

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un rol y asignarle permisos"
        screenName="Editar Rol"
      />
      <FormularioRol
        isUpdate={true}
        initialData={roles} // Pasamos los datos del cliente al formulario
        permisos={permisosData}
      />
    </div>
  );
}
