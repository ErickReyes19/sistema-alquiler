import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getTipoHabitacionById } from "../../actions"; // Asegúrate de tener una función que obtenga el tipo de habitación por ID
import { FormularioTipoHabitacion } from "../../components/Formulario"; // Formulario para editar el tipo de habitación
import { getSessionPermisos } from "@/auth"; // Verifica los permisos de la sesión
import NoAcceso from "@/components/noAccess"; // Componente que se muestra si el usuario no tiene acceso

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar permisos
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_tipo_habitacion")) {
    return <NoAcceso />;
  }

  // Obtener los datos del tipo de habitación por su ID
  const tipoHabitacion = await getTipoHabitacionById(params.id);

  // Si no se encuentra el tipo de habitación, redirigir
  if (!tipoHabitacion) {
    redirect("/tipo-habitacion"); // Redirige si no encuentra el tipo de habitación
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un tipo de habitación."
        screenName="Editar Tipo de Habitación"
      />
      
      {/* Formulario de edición de tipo de habitación */}
      <FormularioTipoHabitacion
        isUpdate={true} // Indicamos que estamos editando, no creando
        initialData={tipoHabitacion} // Pasamos los datos del tipo de habitación
      />
    </div>
  );
}
