// app/apartamento/[id]/edit/page.tsx

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import {  getContratoByIdView } from "../../actions";
import { redirect } from "next/navigation";
import { View } from "lucide-react";
import ContratoViewComponent from "../../components/contratoVIew";

export default async function EditApartamentoPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_contratos")) {
    return <NoAcceso />;
  }

  const contrato = await getContratoByIdView(params.id); 
  
  if (!contrato) {
    redirect("/contratos");
  }

  return (
    <div>
      <HeaderComponent
        Icon={View}
        description="En este apartado podrá ver detalles de un apartamento."
        screenName="Ver detalle Apartamento"
      />
      <ContratoViewComponent
      contrato={contrato}
      />
    </div>
  );
}
