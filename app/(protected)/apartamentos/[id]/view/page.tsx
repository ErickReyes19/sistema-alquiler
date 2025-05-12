// app/apartamento/[id]/edit/page.tsx

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import {  getApartamentoCompletoConId } from "../../actions";
import { redirect } from "next/navigation";
import { ApartamentoCard } from "../../components/aparamenteCard";
import { View } from "lucide-react";

export default async function EditApartamentoPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_apartamento")) {
    return <NoAcceso />;
  }

  const apartamento = await getApartamentoCompletoConId(params.id); 
  
  if (!apartamento) {
    redirect("/apartamento");
  }
 // Asegúrate de tener esta función para obtener los tipos de habitaciones
  return (
    <div>
      <HeaderComponent
        Icon={View}
        description="En este apartado podrá ver detalles de un apartamento."
        screenName="Ver detalle Apartamento"
      />
      <ApartamentoCard
      apartamento={apartamento}
      />
    </div>
  );
}
