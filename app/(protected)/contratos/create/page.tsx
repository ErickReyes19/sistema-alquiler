import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { FilePlus } from "lucide-react";

import { getApartamentosCompleto } from "../../apartamentos/actions";
import { getInquilinosActivosSinContrato } from "../../inquilinos/actions";
import { Formulario } from "../components/Form";

export default async function Create() {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_contrato")) {
    return <NoAcceso />;
  }

  const inquilinosActivos = await getInquilinosActivosSinContrato();
  const apartamentosActivos = await getApartamentosCompleto();

  const initialData = {
    inquilinoId: "",
    apartamentoId: "",
    fechaInicio: new Date().toISOString(),
    fechaFin: undefined,
    montoMensual: 0,
    preavisoDias: 30,
    activo: true,
    estadoRenovacion: "SIN_GESTION" as const,
  };

  return (
    <div>
      <HeaderComponent
        Icon={FilePlus}
        description="En este apartado podrás crear un nuevo contrato"
        screenName="Contrato"
      />

      <Formulario
        isUpdate={false}
        initialData={initialData}
        inquilinos={inquilinosActivos}
        apartamentos={apartamentosActivos}
      />
    </div>
  );
}
