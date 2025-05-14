// app/apartamento/[id]/edit/page.tsx

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { getReciboCompletoById } from "../../actions";
import { redirect } from "next/navigation";
import { View } from "lucide-react";
import  { ReciboDetalle } from "../../components/recibo-view";

export default async function EditApartamentoPage({ params }: { params: { idrecibo: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_contratos")) {
    return <NoAcceso />;
  }

  const recibo = await getReciboCompletoById(params.idrecibo); 
  
  if (!recibo) {
    redirect("/contratos");
  }

  return (
    <div>
      <HeaderComponent
        Icon={View}
        description="En este apartado podrá ver detalles de un apartamento."
        screenName="Ver detalle Apartamento"
      />
      <ReciboDetalle
      recibo={recibo}
      />
    </div>
  );
}
