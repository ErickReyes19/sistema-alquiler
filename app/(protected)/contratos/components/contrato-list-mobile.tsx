"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Contrato } from "../type";  // Cambié Usuario por Contrato

interface ContratoListProps {
  contratos: Contrato[];  // Cambié usuarios por contratos
}

export default function ContratoListMobile({ contratos }: ContratoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContratos = contratos.filter((contrato) =>
    contrato.inquilino?.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Filtrado por inquilino
    contrato.apartamento?.toLowerCase().includes(searchTerm.toLowerCase())  // Filtrado por apartamento
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo contrato */}
      <Link href="/contratos/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo contrato
          <Plus />
        </Button>
      </Link>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar contrato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de contratos */}
      {filteredContratos.map((contrato) => (
        <div key={contrato.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${contrato.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">Inquilino: {contrato.inquilino}</h3>
            </div>
            <p className="text-xs mt-1 truncate">Apartamento: {contrato.apartamento}</p>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/contratos/${contrato.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {filteredContratos.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron contratos.</p>
      )}
      {filteredContratos.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredContratos.length} de {contratos.length} contratos
        </p>
      )}
    </div>
  );
}
