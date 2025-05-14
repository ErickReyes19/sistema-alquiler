import { getSessionPermisos } from "@/auth";
import NoAcceso from "@/components/noAccess";
import { getDetallesParaNuevoRecibo } from "../actions";
import { ReciboCreate } from "../type";
import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import FormularioRecibo from "../components/Form";

interface CreateReciboPageProps {
  params: { id: string };
}

export default async function CreateReciboPage({ params }: CreateReciboPageProps) {
  // 1) Comprobar permisos en servidor
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_recibo")) {
    return <NoAcceso />;
  }

  // 2) Obtener detalles para el recibo
  const detalles = await getDetallesParaNuevoRecibo(params.id);
  if (!detalles) {
    return <p>Contrato no encontrado o sin datos suficientes.</p>;
  }

  // 3) Preparar detalles iniciales con los servicios del apartamento
  const detallesIniciales = detalles.servicios.map((servicio) => ({
    descripcion: servicio.nombre,
    monto: parseFloat(servicio.costoAdicional),
  }));

  // 4) Datos para el formulario
  const initialData: ReciboCreate & { detalles: { descripcion: string; monto: number }[] } = {
    contratoId: detalles.contratoId,
    total: parseFloat(detalles.montoMensual),
    fechaPago: new Date().toISOString(),
    detalles: detallesIniciales,
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="Aquí podrás crear un nuevo recibo para este contrato"
        screenName="Crear Recibo"
      />

      <FormularioRecibo
        isUpdate={false}
        initialData={initialData}
        contratoId={detalles.contratoId}
      />
    </div>
  );
}
