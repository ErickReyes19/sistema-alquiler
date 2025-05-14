// app/contratos/[id]/recibos/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { ListChecks } from "lucide-react";
import { getSessionPermisos } from "@/auth";
import NoAcceso from "@/components/noAccess";          // Acción que filtra por contratoId
import { columns } from "./components/columns";                 // ColumnDefs para ReciboView
import { DataTable } from "./components/data-table";
import { getRecibosByContrato } from "./actions";
import ReciboListMobile from "./components/contrato-list-mobile";

interface RecibosPageProps {
  params: { id: string };   // id del contrato
}

export default async function RecibosPage({ params }: RecibosPageProps) {
  // 1) Verificar permisos
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_recibos")) {
    return <NoAcceso />;
  }

  // 2) Obtener los recibos de este contrato
  const recibos = await getRecibosByContrato(params.id);

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListChecks}
        description="En este apartado podrá ver todos los recibos de este contrato"
        screenName="Recibos"
      />

      {/* Desktop */}
      <div className="hidden md:block">
        <DataTable columns={columns} data={recibos} id={params.id} />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <ReciboListMobile recibos={recibos} contratoId={params.id} />
      </div>
    </div>
  );
}
