import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { File, PlusCircle } from "lucide-react";
import NoAcceso from "@/components/noAccess";
import { getApartamentosCompleto } from "@/app/(protected)/apartamentos/actions";
import { getInquilinosActivos } from "@/app/(protected)/inquilinos/actions";
import { Formulario } from "../../components/Form";
import { getContratoById } from "../../actions";
import { redirect } from "next/navigation";
import { id } from "date-fns/locale";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar permisos de sesión
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_contrato")) {
    return <NoAcceso />;
  }

  const contrato = await getContratoById(params.id);

  // Si no se encuentra el tipo de habitación, redirigir
  if (!contrato) {
    redirect("/constratos"); // Redirige si no encuentra el tipo de habitación
  }
  // Obtener inquilinos y apartamentos activos
  const inquilinosActivos = await getInquilinosActivos(); // Función para obtener inquilinos activos
  const apartamentosActivos = await getApartamentosCompleto(); // Función para obtener apartamentos activos

  // Definir datos iniciales para el formulario (en este caso para un nuevo usuario)
  const initialData = {
    id: contrato.id,
    inquilinoId: contrato.inquilinoId,
    apartamentoId: contrato.apartamentoId,
    fechaInicio: contrato.fechaInicio, // Convert Date to ISO string
    fechaFin: contrato.fechaFin ?? undefined, // Convert Date to ISO string or undefined
    montoMensual: contrato.montoMensual,
    activo : contrato.activo,
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
        inquilinos={inquilinosActivos} // Pasamos los inquilinos activos al formulario
        apartamentos={apartamentosActivos} // Pasamos los apartamentos activos al formulario
      />
    </div>
  );
}
