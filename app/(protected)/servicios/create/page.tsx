// importaciones necesarias
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import { FormularioServicio } from "../components/Formulario"; // Formulario para crear el tipo de habitación
import NoAcceso from "@/components/noAccess"; // Componente de acceso restringido

export default async function Create() {
  // Verifica la sesión y redirige si no hay sesión
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_servicio")) {
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
        description="En este apartado podrá crear un servicio."
        screenName="Crear servicio" // Título de la pantalla
      />
      
      {/* Formulario de creación de servicio */}
      <FormularioServicio
        isUpdate={false} // Esto indica que estamos creando un nuevo servicio
        initialData={initialData} // Se pasa el valor inicial vacío
      />
    </div>
  );
}
