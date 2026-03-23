"use client";

import Link from "next/link";
import { Pencil, Plus, ReceiptText, Search, View } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Contrato } from "../type";

interface ContratoListProps {
  contratos: Contrato[];
}

export default function ContratoListMobile({ contratos }: ContratoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContratos = contratos.filter(
    (contrato) =>
      contrato.inquilino?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.apartamento?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <Link href="/contratos/create" className="w-full md:w-auto">
        <Button className="flex w-full items-center gap-2 md:w-auto">
          Nuevo contrato
          <Plus />
        </Button>
      </Link>

      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar contrato..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      </div>

      {filteredContratos.map((contrato) => (
        <div key={contrato.id} className="space-y-3 rounded-lg border p-4 shadow">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium">{contrato.inquilino}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Apartamento: {contrato.apartamento}</p>
              <p className="text-xs text-muted-foreground">
                {contrato.diasParaVencer !== null && contrato.diasParaVencer !== undefined
                  ? contrato.diasParaVencer >= 0
                    ? `${contrato.diasParaVencer} día(s) para vencimiento`
                    : `${Math.abs(contrato.diasParaVencer)} día(s) vencido`
                  : "Sin fecha de vencimiento definida"}
              </p>
            </div>
            <Badge variant={contrato.alertaVencimiento ? "secondary" : "outline"}>
              {(contrato.estadoOperacion ?? "VIGENTE").replaceAll("_", " ")}
            </Badge>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline">{contrato.estadoRenovacion.replaceAll("_", " ")}</Badge>
            <div className="flex items-center gap-1">
              <Link href={`/contratos/${contrato.id}/edit`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/contratos/${contrato.id}/view`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <View className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/contratos/${contrato.id}/recibos`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ReceiptText className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {filteredContratos.length === 0 && <p className="text-center text-gray-500">No se encontraron contratos.</p>}
      {filteredContratos.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Mostrando {filteredContratos.length} de {contratos.length} contratos
        </p>
      )}
    </div>
  );
}
