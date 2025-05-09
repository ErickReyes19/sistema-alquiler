// app/apartamento/[id]/edit/page.tsx

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import ApartamentoForm from "../../components/Formulario";
import { getApartamentoById } from "../../actions"; // Asegúrate de tener esta función implementada
import { getTiposHabitacionActivos } from "../../../tipo-habitacion/actions";
import { redirect } from "next/navigation";

export default async function EditApartamentoPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_apartamento")) {
    return <NoAcceso />;
  }

  const apartamento = await getApartamentoById(params.id); // Debe incluir las habitaciones también
  if (!apartamento) {
    redirect("/apartamento");
  }

  const tipoHabitaciones = await getTiposHabitacionActivos();

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un apartamento."
        screenName="Editar Apartamento"
      />
      <ApartamentoForm
        isUpdate={true}
        initialData={apartamento}
        tipoHabitaciones={tipoHabitaciones}
      />
    </div>
  );
}
