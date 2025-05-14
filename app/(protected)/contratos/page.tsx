import HeaderComponent from "@/components/HeaderComponent";
import { ListChecks } from "lucide-react";
import { getContratos } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import ContratoListMobile from "./components/contrato-list-mobile";
import NoAcceso from "@/components/noAccess";
import { getSessionPermisos } from "@/auth";

export default async function ContratosPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_contratos")) {
    return <NoAcceso />;
  }

  const data = await getContratos();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListChecks}
        description="En este apartado podrá ver todos los contratos registrados"
        screenName="Contratos"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ContratoListMobile contratos={data} />
      </div>
    </div>
  );
}
