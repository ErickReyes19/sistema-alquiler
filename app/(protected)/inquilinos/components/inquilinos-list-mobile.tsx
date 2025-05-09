"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Inquilino } from "../type";

interface InquilinoListProps {
  inquilinos: Inquilino[];
}

export default function InquilinoListMobile({ inquilinos }: InquilinoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInquilinos = inquilinos.filter(
    (inquilino) =>
      inquilino.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquilino.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquilino.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo inquilino */}
      <Link href="/inquilinos/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo inquilino
          <Plus />
        </Button>
      </Link>

      {/* Input de filtro */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar inquilino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de inquilinos */}
      {filteredInquilinos.map((inquilino) => (
        <div key={inquilino.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${inquilino.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">{inquilino.nombreCompleto}</h3>
            </div>
            <p className="text-xs mt-1 truncate">DNI: {inquilino.dni}</p>
            <p className="text-xs truncate">Teléfono: {inquilino.telefono}</p>
            {inquilino.correo && <p className="text-xs truncate">Correo: {inquilino.correo}</p>}
            <p className="text-xs truncate">Fecha de Nacimiento: {inquilino.fechaNacimiento}</p>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/inquilinos/${inquilino.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredInquilinos.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron inquilinos.</p>
      )}
      {filteredInquilinos.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredInquilinos.length} de {inquilinos.length} inquilinos
        </p>
      )}
    </div>
  );
}
