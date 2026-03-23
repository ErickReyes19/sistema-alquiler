import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Wrench } from "lucide-react";

import { getMaintenanceModuleData } from "./actions";
import { MantenimientoDashboard } from "./components/mantenimiento-dashboard";

export default async function MantenimientoPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_mantenimientos")) {
    return <NoAcceso />;
  }

  const data = await getMaintenanceModuleData();

  return (
    <div className="container mx-auto space-y-6 py-4">
      <HeaderComponent
        Icon={Wrench}
        screenName="Mantenimiento e incidencias"
        description="Controle tickets, daños reportados, mantenimiento preventivo/correctivo, proveedor, costos y fecha de atención por apartamento."
      />

      <MantenimientoDashboard
        data={data}
        canCreate={permisos.includes("crear_mantenimiento")}
        canEdit={permisos.includes("editar_mantenimiento")}
      />
    </div>
  );
}
