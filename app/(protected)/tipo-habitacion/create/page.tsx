// importaciones necesarias
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import { FormularioTipoHabitacion } from "../components/Formulario"; // Formulario para crear el tipo de habitación
import NoAcceso from "@/components/noAccess"; // Componente de acceso restringido

export default async function Create() {
  // Verifica la sesión y redirige si no hay sesión
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_tipo_habitacion")) {
    return <NoAcceso />;
  }

  // Datos iniciales para el formulario (vacío en este caso para un nuevo tipo de habitación)
  const initialData = {
    nombre: "",
    activo: true, // Por defecto la habitación está activa
  };

  return (
    <div>
      {/* Encabezado de la página */}
      <HeaderComponent
        Icon={PlusCircle} // Ícono de la página
        description="En este apartado podrá crear un tipo de habitación."
        screenName="Crear Tipo de Habitación" // Título de la pantalla
      />
      
      {/* Formulario de creación de tipo de habitación */}
      <FormularioTipoHabitacion
        isUpdate={false} // Esto indica que estamos creando un nuevo tipo de habitación
        initialData={initialData} // Se pasa el valor inicial vacío
      />
    </div>
  );
}
