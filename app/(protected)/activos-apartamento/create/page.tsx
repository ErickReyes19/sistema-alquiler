import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";

import { getActivosFormOptions } from "../actions";
import { FormularioActivoApartamento } from "../components/Formulario";

export default async function CreateActivoApartamentoPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("crear_activo_apartamento")) {
    return <NoAcceso />;
  }

  const options = await getActivosFormOptions();

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="Registre activos concretos del apartamento (ej. Aire acondicionado 1)."
        screenName="Crear activo de apartamento"
      />
      <FormularioActivoApartamento
        isUpdate={false}
        apartamentos={options.apartamentos}
        tiposActivos={options.tiposActivos}
        tiposHabitacion={options.tiposHabitacion}
      />
    </div>
  );
}
