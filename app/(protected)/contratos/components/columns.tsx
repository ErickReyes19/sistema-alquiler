"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatearFecha } from "@/lib/utils";

import { Contrato } from "../type";

const estadoOperacionVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  POR_INICIAR: "secondary",
  VIGENTE: "default",
  POR_VENCER: "secondary",
  VENCIDO: "destructive",
  DESOCUPADO: "outline",
  INACTIVO: "outline",
};

export const columns: ColumnDef<Contrato>[] = [
  {
    accessorKey: "inquilino",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Inquilino
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "apartamento",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Apartamento
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "fechaFin",
    header: "Vencimiento",
    cell: ({ row }) => {
      const fechaFin = row.original.fechaFin;
      return <span>{fechaFin ? formatearFecha(fechaFin) : "Sin fecha definida"}</span>;
    },
  },
  {
    accessorKey: "estadoOperacion",
    header: "Estado operativo",
    cell: ({ row }) => {
      const estado = row.original.estadoOperacion ?? "VIGENTE";
      return <Badge variant={estadoOperacionVariant[estado] ?? "outline"}>{estado.replaceAll("_", " ")}</Badge>;
    },
  },
  {
    accessorKey: "estadoRenovacion",
    header: "Renovación",
    cell: ({ row }) => {
      const contrato = row.original;
      return (
        <div className="space-y-1">
          <Badge variant="outline">{contrato.estadoRenovacion.replaceAll("_", " ")}</Badge>
          {contrato.diasParaVencer !== null && contrato.diasParaVencer !== undefined && (
            <p className="text-xs text-muted-foreground">
              {contrato.diasParaVencer >= 0
                ? `${contrato.diasParaVencer} día(s) para vencer`
                : `${Math.abs(contrato.diasParaVencer)} día(s) vencido`}
            </p>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const contrato = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <Link href={`/contratos/${contrato.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
            <Link href={`/contratos/${contrato.id}/view`}>
              <DropdownMenuItem>Operación del contrato</DropdownMenuItem>
            </Link>
            <Link href={`/contratos/${contrato.id}/recibos`}>
              <DropdownMenuItem>Recibos</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
