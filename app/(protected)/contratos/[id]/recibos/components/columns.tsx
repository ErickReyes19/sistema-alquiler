"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Recibo } from "../type";

const estadoLabels: Record<string, string> = {
  PENDIENTE: "Pendiente",
  PAGADO: "Pagado",
  VENCIDO: "Vencido",
  PARCIALMENTE_PAGADO: "Parcialmente pagado",
};

const estadoVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDIENTE: "outline",
  PAGADO: "secondary",
  VENCIDO: "destructive",
  PARCIALMENTE_PAGADO: "default",
};

export const columns: ColumnDef<Recibo>[] = [
  {
    accessorKey: "fechaVencimiento",
    header: ({ column }) => (
      <Button variant="ghost" className="text-left" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Vencimiento
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{new Date(row.getValue<string>("fechaVencimiento")).toLocaleDateString()}</span>,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue<string>("estado");
      return <Badge variant={estadoVariant[estado] ?? "outline"}>{estadoLabels[estado] ?? estado}</Badge>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button variant="ghost" className="text-left" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>L. {row.getValue<number>("total").toFixed(2)}</span>,
  },
  {
    accessorKey: "saldoPendiente",
    header: "Saldo pendiente",
    cell: ({ row }) => <span className="font-medium">L. {row.getValue<number>("saldoPendiente").toFixed(2)}</span>,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const recibo = row.original;

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
            <Link href={`recibos/${recibo.id}/view`}>
              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            </Link>
            <Link href={`recibos/${recibo.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
