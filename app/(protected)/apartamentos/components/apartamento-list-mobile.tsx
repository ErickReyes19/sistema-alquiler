"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Apartamento } from "../type"; // Asegúrate de importar el tipo correcto

interface ApartamentoListMobileProps {
  apartamentos: Apartamento[];
}

export default function ApartamentoListMobile({ apartamentos }: ApartamentoListMobileProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApartamentos = apartamentos.filter(
    (apartamento) =>
      apartamento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apartamento.activo ? "activo" : "inactivo").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo apartamento */}
      <Link href="/apartamento/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo apartamento
          <Plus />
        </Button>
      </Link>

      {/* Input de filtro */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar apartamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de apartamentos */}
      {filteredApartamentos.map((apartamento) => (
        <div key={apartamento.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${apartamento.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">Numero de apartamento: {apartamento.numero}</h3>
            </div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium truncate">Ubicación: {apartamento.direccion}</h3>
            </div>
            <div className="flex items-center">
                <h3 className="text-sm font-medium truncate">
                Disponible: {apartamento.disponible ? "Sí" : "No"}
                </h3>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/apartamento/${apartamento.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredApartamentos.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron apartamentos.</p>
      )}
      {filteredApartamentos.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredApartamentos.length} de {apartamentos.length} apartamentos
        </p>
      )}
    </div>
  );
}
