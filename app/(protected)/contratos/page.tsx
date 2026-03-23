import { ListChecks } from "lucide-react";

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getContratos } from "./actions";
import ContratoListMobile from "./components/contrato-list-mobile";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function ContratosPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_contratos")) {
    return <NoAcceso />;
  }

  const data = await getContratos();
  const contratosPorVencer = data.filter((contrato) => contrato.alertaVencimiento).length;
  const contratosVencidos = data.filter((contrato) => contrato.estadoOperacion === "VENCIDO").length;
  const contratosDesocupados = data.filter((contrato) => contrato.estadoOperacion === "DESOCUPADO").length;
  const renovacionesEnGestion = data.filter((contrato) => contrato.estadoRenovacion === "EN_NEGOCIACION").length;

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListChecks}
        description="En este apartado podrá ver todos los contratos registrados y su ciclo operativo"
        screenName="Contratos"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas activas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{contratosPorVencer}</p>
            <p className="text-sm text-muted-foreground">Contratos dentro del preaviso configurado.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vencidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{contratosVencidos}</p>
            <p className="text-sm text-muted-foreground">Requieren cierre o renovación inmediata.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Renovaciones en gestión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{renovacionesEnGestion}</p>
            <p className="text-sm text-muted-foreground">Negociaciones activas con inquilinos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rotación cerrada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{contratosDesocupados}</p>
            <p className="text-sm text-muted-foreground">Entregas registradas y unidades liberadas.</p>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ContratoListMobile contratos={data} />
      </div>
    </div>
  );
}
