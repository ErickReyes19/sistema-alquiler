import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { getApartamentosCompleto } from "@/app/(protected)/apartamentos/actions";
import { getInquilinosActivosSinContrato } from "@/app/(protected)/inquilinos/actions";

import { getContratoById } from "../../actions";
import { Formulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_contrato")) {
    return <NoAcceso />;
  }

  const contrato = await getContratoById(params.id);

  if (!contrato) {
    redirect("/contratos");
  }

  const inquilinosActivos = await getInquilinosActivosSinContrato();
  const apartamentosActivos = await getApartamentosCompleto();

  const initialData = {
    id: contrato.id,
    inquilinoId: contrato.inquilinoId,
    apartamentoId: contrato.apartamentoId,
    fechaInicio: contrato.fechaInicio,
    fechaFin: contrato.fechaFin ?? undefined,
    montoMensual: contrato.montoMensual,
    preavisoDias: contrato.preavisoDias,
    activo: contrato.activo,
    estadoRenovacion: contrato.estadoRenovacion,
    motivoCancelacion: contrato.motivoCancelacion ?? undefined,
    fechaDesocupacion: contrato.fechaDesocupacion ?? undefined,
  };

  return (
    <div>
      <HeaderComponent
        Icon={File}
        description="En este apartado podrás editar un contrato existente"
        screenName="Contratos"
      />

      <Formulario
        isUpdate={true}
        initialData={initialData}
        inquilinos={inquilinosActivos}
        apartamentos={apartamentosActivos}
      />
    </div>
  );
}
