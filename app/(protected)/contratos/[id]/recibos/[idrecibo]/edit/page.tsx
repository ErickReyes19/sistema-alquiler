import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { File } from "lucide-react";
import NoAcceso from "@/components/noAccess";
import { redirect } from "next/navigation";

import { getDetallesParaNuevoRecibo, getReciboById } from "../../actions";
import FormularioRecibo from "../../components/Form";

export default async function Edit({ params }: { params: { idrecibo: string } }) {
  // 1) Verificar permisos
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_recibo")) {
    return <NoAcceso />;
  }
  
  // 2) Obtener el recibo por ID
  const recibo = await getReciboById(params.idrecibo);
  console.log("🚀 ~ Edit ~ recibo:", recibo);
  if (!recibo) {
    redirect("/contratos");
  }
  
  // 3) Obtener los detalles del contrato asociado
  const contratoData = await getDetallesParaNuevoRecibo(recibo.contratoId);
  if (!contratoData) {
    redirect("/contratos");
  }
  
  // 4) Verificar si el recibo contiene el "monto mensual"
  const tieneMontoMensual = recibo.detalles.some(
    
    (d) => d.descripcion.toLowerCase() === "monto mensual"
  );
  
  // 5) Preparar los detalles iniciales para el formulario
  const initialData = {
    id: recibo.id, // ID del recibo que estamos editando
    contratoId: recibo.contratoId, // ID del contrato asociado
    fechaPago: new Date(recibo.fechaPago).toISOString(), // Fecha de pago
    total: recibo.total, // Total del recibo
    detalles: [
      ...recibo.detalles, // Detalles del recibo

    ],
  };

  return (
    <div>
      <HeaderComponent
        Icon={File}
        description="En este apartado podrás editar un recibo existente"
        screenName="Recibos"
      />
      <FormularioRecibo
        isUpdate={true} // Indicamos que estamos actualizando un recibo existente
        initialData={initialData} // Pasamos los datos iniciales al formulario
        contratoId={recibo.contratoId} // ID del contrato
      />
    </div>
  );
}
