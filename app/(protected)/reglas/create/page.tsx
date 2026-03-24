import { Scale } from "lucide-react";

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";

import { FormularioRegla } from "../components/Formulario";

export default async function CreateReglaPage() {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_regla")) {
    return <NoAcceso />;
  }

  return (
    <div>
      <HeaderComponent Icon={Scale} description="Crea una nueva regla" screenName="Crear regla" />
      <FormularioRegla isUpdate={false} />
    </div>
  );
}
