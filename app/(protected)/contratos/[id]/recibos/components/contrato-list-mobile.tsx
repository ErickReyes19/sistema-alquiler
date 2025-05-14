"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil } from "lucide-react";
import { ReciboView } from "../type";

interface ReciboListMobileProps {
  recibos: ReciboView[];
  contratoId: string;
}

export default function ReciboListMobile({
  recibos,
  contratoId,
}: ReciboListMobileProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar por fechaPago (dd/MM/yyyy) o por total
  const filtered = recibos.filter((r) => {
    const fecha = new Date(r.fechaPago)
      .toLocaleDateString("es-ES");
    const totalStr = r.total.toFixed(2);
    return (
      fecha.includes(searchTerm) ||
      totalStr.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo recibo */}
      <Link
        href={`/contratos/${contratoId}/recibos/create`}
        className="w-full md:w-auto"
      >
        <Button className="w-full flex items-center gap-2">
          <Plus /> Nuevo recibo
        </Button>
      </Link>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar por fecha o total..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de recibos */}
      {filtered.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="text-sm font-medium truncate">
                {new Date(r.fechaPago).toLocaleDateString("es-ES")}
              </h3>
            </div>
            <p className="text-xs mt-1 truncate">
              Total: {r.total.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center ml-4 space-x-2">
            <Link href={`/contratos/${contratoId}/recibos/${r.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/contratos/${contratoId}/recibos/${r.id}/print`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4 rotate-45" /> {/* reuse icon for print */}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron recibos.
        </p>
      )}
      {filtered.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filtered.length} de {recibos.length} recibos
        </p>
      )}
    </div>
  );
}
