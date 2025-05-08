import { ListCheck } from "lucide-react";
// import {  getSessionPermisos } from "@/auth";
// import { getPermisos } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import { getPermisos } from "./actions";
import PermissionListMobile from "./components/permisos-list-mobile";
import NoAcceso from "@/components/noAccess";
import { getSessionPermisos } from "@/auth";
// import NoAcceso from "@/components/noAccess";
// import PermissionListMobile from "./components/permisos-list-mobile";

export default async function EstadoServicio() {

  const permisos = await getSessionPermisos();


  
  if (!permisos?.includes("ver_permisos")) {
    return <NoAcceso />;
  }
  const data = await getPermisos();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListCheck}
        description="En este apartado podrá ver todos los permisos"
        screenName="Permisos"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <PermissionListMobile permisos={data} />
      </div>
    </div>
  );
}
