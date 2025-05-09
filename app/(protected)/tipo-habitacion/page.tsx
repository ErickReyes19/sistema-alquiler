import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { ListCheck } from "lucide-react";
import { getTiposHabitacion } from "./actions"; 
import { columns } from "./components/columns"; 
import { DataTable } from "./components/data-table";  
import TipoHabitacionListMobile from "./components/tipo-habitacion-list-mobile";  

export default async function TiposHabitacionPage() {

  // Comprobamos los permisos del usuario
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_tipos_habitacion")) {
    return <NoAcceso />;
  }

  // Obtenemos los tipos de habitación desde la base de datos
  const data = await getTiposHabitacion();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListCheck}
        description="En este apartado podrá ver todos los tipos de habitación"
        screenName="Tipos de Habitaciones"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <TipoHabitacionListMobile tiposHabitacion={data} />
      </div>
    </div>
  );
}
