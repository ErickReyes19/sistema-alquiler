import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";

import { getActivosFormOptions, getApartamentoActivoById } from "../../actions";
import { FormularioActivoApartamento } from "../../components/Formulario";

export default async function EditActivoApartamentoPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_activo_apartamento")) {
    return <NoAcceso />;
  }

  const [activo, options] = await Promise.all([
    getApartamentoActivoById(params.id),
    getActivosFormOptions(),
  ]);

  if (!activo) {
    redirect("/activos-apartamento");
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="Actualice datos del activo para mantener trazabilidad detallada de gastos/mantenimiento."
        screenName="Editar activo de apartamento"
      />
      <FormularioActivoApartamento
        isUpdate
        initialData={{
          id: activo.id,
          apartamentoId: activo.apartamentoId,
          tipoActivoId: activo.tipoActivoId,
          tipoHabitacionId: activo.tipoHabitacionId || "",
          identificador: activo.identificador,
          descripcion: activo.descripcion || "",
          activo: Boolean(activo.activo),
        }}
        apartamentos={options.apartamentos}
        tiposActivos={options.tiposActivos}
        tiposHabitacion={options.tiposHabitacion}
      />
    </div>
  );
}
