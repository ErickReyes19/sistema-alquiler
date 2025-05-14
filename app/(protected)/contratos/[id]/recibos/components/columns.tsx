"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { formatearFecha } from "@/lib/utils"; // si tenés util para fechas
import { Recibo } from "../type"; // ajustá si tenés otro tipo (por ejemplo ReciboConContrato)

export const columns: ColumnDef<Recibo>[] = [
  {
    accessorKey: "fechaPago",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha de pago
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const fechaPago = row.getValue<string>("fechaPago");
      return <span>{new Date(fechaPago).toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const total = row.getValue<number>("total");
      return <span>L. {total.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.getValue("activo");
      return isActive ? (
        <div className="flex gap-2 items-center">
          <CheckCircleIcon className="text-green-600" size={16} /> Activo
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <XCircleIcon className="text-red-600" size={16} /> Inactivo
        </div>
      );
    },
  },
  // Opcional: mostrar info del contrato si lo tenés
  // {
  //   accessorKey: "contratoId",
  //   header: "Contrato",
  //   cell: ({ row }) => {
  //     const contratoId = row.getValue<string>("contratoId");
  //     return <span>{contratoId}</span>;
  //   },
  // },

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

            {/* Si vas a permitir editar recibos */}
            {/* <Link href={`/recibos/${recibo.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
