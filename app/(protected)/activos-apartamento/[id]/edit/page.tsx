import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";

import { getTipoActivoApartamentoById } from "../../actions";
import { FormularioTipoActivo } from "../../components/Formulario";

export default async function EditTipoActivoPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_activo_apartamento")) {
    return <NoAcceso />;
  }

  const tipoActivo = await getTipoActivoApartamentoById(params.id);

  if (!tipoActivo) {
    redirect("/activos-apartamento");
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="Editar un tipo de activo."
        screenName="Editar tipo de activo"
      />
      <FormularioTipoActivo isUpdate initialData={tipoActivo} />
    </div>
  );
}
