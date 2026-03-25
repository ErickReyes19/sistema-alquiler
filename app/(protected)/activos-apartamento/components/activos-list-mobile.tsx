"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { TipoActivoApartamento } from "../type";

export default function ActivosListMobile({ tipos }: { tipos: TipoActivoApartamento[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = tipos.filter((tipo) =>
    [tipo.nombre, tipo.activo ? "activo" : "inactivo"]
      .some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <Link href="/activos-apartamento/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo tipo activo
          <Plus />
        </Button>
      </Link>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar tipo de activo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      {filtered.map((tipo) => (
        <div key={tipo.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div>
            <h3 className="text-sm font-medium">{tipo.nombre}</h3>
            <p className="text-xs text-muted-foreground">{tipo.activo ? "Activo" : "Inactivo"}</p>
          </div>
          <Link href={`/activos-apartamento/${tipo.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
