"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ApartamentoActivoItem } from "../type";

export default function ActivosListMobile({ activos }: { activos: ApartamentoActivoItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = activos.filter((activo) =>
    [
      activo.apartamentoNumero,
      activo.tipoActivoNombre,
      activo.tipoHabitacionNombre,
      activo.identificador,
      activo.descripcion,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <Link href="/activos-apartamento/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo activo
          <Plus />
        </Button>
      </Link>

      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar activo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {filtered.map((activo) => (
        <div key={activo.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">
              Apto {activo.apartamentoNumero} · {activo.identificador}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {activo.tipoActivoNombre}
              {activo.tipoHabitacionNombre ? ` · ${activo.tipoHabitacionNombre}` : ""}
            </p>
          </div>
          <Link href={`/activos-apartamento/${activo.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
