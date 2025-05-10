"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Servicio } from "../type"; // Asegúrate de importar el tipo correcto

interface TipoHabitacionListMobileProps {
  servicio: Servicio[];
}

export default function ServiciosListMobile({ servicio: servicio }: TipoHabitacionListMobileProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServicio = servicio.filter(
    (servicio) =>
      servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (servicio.activo ? "activo" : "inactivo").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo tipo de habitación */}
      <Link href="/servicios/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo servicio
          <Plus />
        </Button>
      </Link>

      {/* Input de filtro */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar  servicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de tipos de habitación */}
      {filteredServicio.map((servicio) => (
        <div key={servicio.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${servicio.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">{servicio.nombre}</h3>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/servicios/${servicio.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredServicio.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron servicio.</p>
      )}
      {filteredServicio.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredServicio.length} de {servicio.length} servicio
        </p>
      )}
    </div>
  );
}
