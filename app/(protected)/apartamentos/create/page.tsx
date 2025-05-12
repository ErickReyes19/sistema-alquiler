// importaciones necesarias
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import NoAcceso from "@/components/noAccess"; // Componente de acceso restringido
import ApartamentoForm  from "../components/Formulario"; // Asegúrate de tener este componente
import { getTiposHabitacion, getTiposHabitacionActivos } from "../../tipo-habitacion/actions";
import { getServiciosActivos } from "../actions";

export default async function CreateApartamentoPage() {
  // Verifica la sesión y redirige si no hay permisos
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_apartamento")) {
    return <NoAcceso />;
  }

  // Datos iniciales del formulario
  const initialData = {
    numero: "",
    direccion: "",
    disponible: true,
    activo: true,
    habitaciones: [],
  };
  const tipoHabitaciones = await getTiposHabitacionActivos(); // Asegúrate de tener esta función para obtener los tipos de habitaciones
  const serviciosActivos = await getServiciosActivos(); // Asegúrate de tener esta función para obtener los tipos de habitaciones

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un apartamento."
        screenName="Crear Apartamento"
      />
      <ApartamentoForm tipoHabitaciones={tipoHabitaciones}
      initialData={initialData}isUpdate={false}
      serviciosDisponibles={serviciosActivos}
      />
    </div>
  );
}
