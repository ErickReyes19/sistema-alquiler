import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { HandCoins } from "lucide-react";

import { getCobranzaData } from "./actions";
import { CobranzaDashboard } from "./components/cobranza-dashboard";

export default async function CobranzaPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_cobranza")) {
    return <NoAcceso />;
  }

  const data = await getCobranzaData();

  return (
    <div className="container mx-auto space-y-6 py-4">
      <HeaderComponent
        Icon={HandCoins}
        screenName="Gestión de morosidad y cobranza"
        description="Controla estados de recibos, pagos parciales, mora, promesas de pago, saldo por contrato y recordatorios listos para WhatsApp o correo."
      />
      <CobranzaDashboard data={data} />
    </div>
  );
}
