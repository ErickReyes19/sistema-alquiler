import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import { File } from "lucide-react";
import NoAcceso from "@/components/noAccess";
import { redirect } from "next/navigation";// Asegúrate de que el formulario esté preparado para manejar recibos
import { getReciboById } from "../../actions";
import { getContratoById } from "@/app/(protected)/contratos/actions";
import FormularioRecibo from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar permisos de sesión
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_recibo")) {
    return <NoAcceso />;
  }

  // Obtener recibo por ID
  const recibo = await getReciboById(params.id);

  // Si no se encuentra el recibo, redirigir a la lista de recibos
  if (!recibo) {
    redirect("/contratos"); // Redirige si no encuentra el recibo
  }

  // Obtener el contrato asociado al recibo (si es necesario)
  const contrato = await getContratoById(recibo.contratoId);

  // Definir datos iniciales para el formulario
  const initialData = {
    id: recibo.id,
    contratoId: recibo.contratoId,
    fechaPago: new Date(recibo.fechaPago).toISOString(), // Convertir a ISO string
    total: recibo.total,
    detalles: recibo.detalles.map(d => ({
      descripcion: d.descripcion,
      monto: d.monto,
    })),
  };

  return (
    <div>
      <HeaderComponent
        Icon={File}
        description="En este apartado podrás editar un recibo existente"
        screenName="Recibos"
      />

      <FormularioRecibo
        isUpdate={true} 
        initialData={initialData}  // Pasamos los datos iniciales para el recibo
        contratoId={params.id}  // Puedes pasar el contrato si es necesario mostrarlo o asociarlo
      />
    </div>
  );
}
