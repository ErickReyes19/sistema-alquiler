import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { ListCheck } from "lucide-react";
import { getServicios } from "./actions"; 
import { columns } from "./components/columns"; 
import { DataTable } from "./components/data-table";  
import ServiciosListMobile from "./components/tipo-habitacion-list-mobile";  

export default async function TiposHabitacionPage() {

  // Comprobamos los permisos del usuario
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_servicios")) {
    return <NoAcceso />;
  }

  // Obtenemos los servicio desde la base de datos
  const data = await getServicios();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListCheck}
        description="En este apartado podrá ver todos los servicio"
        screenName="servicio"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ServiciosListMobile servicio={data} />
      </div>
    </div>
  );
}
