import { redirect } from "next/navigation";
import { Scale } from "lucide-react";

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";

import { getReglaById } from "../../actions";
import { FormularioRegla } from "../../components/Formulario";

export default async function EditReglaPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_regla")) {
    return <NoAcceso />;
  }

  const regla = await getReglaById(params.id);
  if (!regla) {
    redirect("/reglas");
  }

  return (
    <div>
      <HeaderComponent Icon={Scale} description="Edita una regla existente" screenName="Editar regla" />
      <FormularioRegla isUpdate initialData={regla} />
    </div>
  );
}
