import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getServicioById } from "../../actions"; // Asegúrate de tener una función que obtenga el tipo de habitación por ID
import { FormularioServicio } from "../../components/Formulario"; // Formulario para editar el tipo de habitación
import { getSessionPermisos } from "@/auth"; // Verifica los permisos de la sesión
import NoAcceso from "@/components/noAccess"; // Componente que se muestra si el usuario no tiene acceso

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar permisos
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_servicio")) {
    return <NoAcceso />;
  }

  // Obtener los datos del tipo de habitación por su ID
  const servicio = await getServicioById(params.id);

  // Si no se encuentra el tipo de habitación, redirigir
  if (!servicio) {
    redirect("/servicio"); // Redirige si no encuentra el tipo de habitación
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un servicio."
        screenName="Editar servicio"
      />
      
      {/* Formulario de edición de tipo de habitación */}
      <FormularioServicio
        isUpdate={true} // Indicamos que estamos editando, no creando
        initialData={servicio} // Pasamos los datos del tipo de habitación
      />
    </div>
  );
}
