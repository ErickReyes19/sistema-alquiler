import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Armchair } from "lucide-react";

import { getTiposActivosApartamento } from "./actions";
import ActivosListMobile from "./components/activos-list-mobile";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function TiposActivosApartamentoPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_activos_apartamento")) {
    return <NoAcceso />;
  }

  const data = await getTiposActivosApartamento();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Armchair}
        description="Aquí solo se administran tipos de activos. La asignación por identificador se hace en cada apartamento."
        screenName="Tipos de activos"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ActivosListMobile tipos={data} />
      </div>
    </div>
  );
}
