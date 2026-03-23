import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { ReceiptText } from "lucide-react";

import { getGastosModuleData } from "./actions";
import { GastosDashboard } from "./components/gastos-dashboard";

export default async function GastosPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_gastos")) {
    return <NoAcceso />;
  }

  const data = await getGastosModuleData();

  return (
    <div className="container mx-auto space-y-6 py-4">
      <HeaderComponent
        Icon={ReceiptText}
        screenName="Gastos, egresos y rentabilidad"
        description="Registre costos operativos reales por propiedad y compare el ingreso mensual contra la utilidad neta de cada apartamento."
      />

      <GastosDashboard
        data={data}
        canCreate={permisos.includes("crear_gasto")}
        canEdit={permisos.includes("editar_gasto")}
      />
    </div>
  );
}
