import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { File } from "lucide-react";
import NoAcceso from "@/components/noAccess";
import { redirect } from "next/navigation";

import { getReciboById } from "../../actions";
import FormularioRecibo from "../../components/Form";

export default async function Edit({ params }: { params: { idrecibo: string } }) {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_recibo")) {
    return <NoAcceso />;
  }

  const recibo = await getReciboById(params.idrecibo);
  if (!recibo) {
    redirect("/contratos");
  }

  const initialData = {
    id: recibo.id,
    contratoId: recibo.contratoId,
    fechaPago: new Date(recibo.fechaPago).toISOString(),
    fechaVencimiento: new Date(recibo.fechaVencimiento).toISOString(),
    total: recibo.total,
    cargoMora: recibo.cargoMora,
    saldoPendiente: recibo.saldoPendiente,
    estado: recibo.estado,
    observacionesCobranza: recibo.observacionesCobranza,
    detalles: [...recibo.detalles],
  };

  return (
    <div>
      <HeaderComponent
        Icon={File}
        description="En este apartado podrás editar un recibo existente y sus parámetros de cobranza."
        screenName="Editar recibo"
      />
      <FormularioRecibo isUpdate={true} initialData={initialData} contratoId={recibo.contratoId} />
    </div>
  );
}
