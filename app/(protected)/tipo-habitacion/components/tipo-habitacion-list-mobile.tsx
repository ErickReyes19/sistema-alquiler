"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TipoHabitacion } from "../type"; // Asegúrate de importar el tipo correcto

interface TipoHabitacionListMobileProps {
  tiposHabitacion: TipoHabitacion[];
}

export default function TipoHabitacionListMobile({ tiposHabitacion }: TipoHabitacionListMobileProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTiposHabitacion = tiposHabitacion.filter(
    (tipo) =>
      tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tipo.activo ? "activo" : "inactivo").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo tipo de habitación */}
      <Link href="/tipo-habitacion/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo tipo de habitación
          <Plus />
        </Button>
      </Link>

      {/* Input de filtro */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar tipo de habitación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de tipos de habitación */}
      {filteredTiposHabitacion.map((tipo) => (
        <div key={tipo.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${tipo.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">{tipo.nombre}</h3>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/tipo-habitacion/${tipo.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredTiposHabitacion.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron tipos de habitación.</p>
      )}
      {filteredTiposHabitacion.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredTiposHabitacion.length} de {tiposHabitacion.length} tipos de habitación
        </p>
      )}
    </div>
  );
}
