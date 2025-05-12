// app/apartamento/[id]/edit/page.tsx

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import ApartamentoForm from "../../components/Formulario";
import { getApartamentoCompletoById, getApartamentoCompletoConId, getServiciosActivos } from "../../actions"; // Asegúrate de tener esta función implementada
import { getTiposHabitacionActivos } from "../../../tipo-habitacion/actions";
import { redirect } from "next/navigation";

export default async function EditApartamentoPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_apartamento")) {
    return <NoAcceso />;
  }

  const apartamento = await getApartamentoCompletoById(params.id);

  if (!apartamento) {
    redirect("/apartamento");
  }

  const tipoHabitaciones = await getTiposHabitacionActivos();
  const serviciosActivos = await getServiciosActivos(); // Asegúrate de tener esta función para obtener los tipos de habitaciones
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
        serviciosDisponibles={serviciosActivos}
      />
    </div>
  );
}
