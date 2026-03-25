import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Armchair } from "lucide-react";

import { getApartamentoActivos } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import ActivosListMobile from "./components/activos-list-mobile";

export default async function ActivosApartamentoPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_activos_apartamento")) {
    return <NoAcceso />;
  }

  const data = await getApartamentoActivos();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Armchair}
        description="Administre muebles/activos por apartamento y tipo de habitación, con identificadores únicos por unidad."
        screenName="Activos por apartamento"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ActivosListMobile activos={data} />
      </div>
    </div>
  );
}
