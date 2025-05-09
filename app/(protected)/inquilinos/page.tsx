import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { ListCheck } from "lucide-react";
import InquilinoListMobile from "./components/inquilinos-list-mobile";
import { DataTable } from "./components/data-table";
import { getRolesPermisos } from "../roles/actions";
import { getInquilinos } from "./actions";
import { columns } from "./components/columns";

export default async function EstadoServicio() {



  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_inquilinos")) {
    return <NoAcceso />;
  }

  const data = await getInquilinos();
  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
      Icon={ListCheck}
      description="En este apartado podrá ver todos los inquilinos"
      screenName="Inquilinos"
      />
      <div className="hidden md:block">
      <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
      <InquilinoListMobile inquilinos={data} />
      </div>
    </div>
  );
}
