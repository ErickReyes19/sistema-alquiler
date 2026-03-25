import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";

import { FormularioTipoActivo } from "../components/Formulario";

export default async function CreateTipoActivoPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("crear_activo_apartamento")) {
    return <NoAcceso />;
  }

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="Crear tipos de activos reutilizables para apartamentos."
        screenName="Crear tipo de activo"
      />
      <FormularioTipoActivo isUpdate={false} />
    </div>
  );
}
