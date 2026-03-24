import Link from "next/link";
import { Scale } from "lucide-react";

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Button } from "@/components/ui/button";

import { getReglas } from "./actions";

export default async function ReglasPage() {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_reglas")) {
    return <NoAcceso />;
  }

  const reglas = await getReglas();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent Icon={Scale} description="Administra reglas para amarrarlas a contratos" screenName="Reglas" />

      <div className="mb-4 flex justify-end">
        <Link href="/reglas/create">
          <Button>Nueva regla</Button>
        </Link>
      </div>

      <div className="space-y-3 rounded-md border p-4">
        {reglas.length === 0 && <p className="text-sm text-muted-foreground">Aún no hay reglas creadas.</p>}
        {reglas.map((regla) => (
          <div key={regla.id} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="font-semibold">{regla.nombre}</p>
              {regla.descripcion && <p className="text-sm text-muted-foreground">{regla.descripcion}</p>}
            </div>
            <Link href={`/reglas/${regla.id}/edit`}>
              <Button variant="outline">Editar</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
