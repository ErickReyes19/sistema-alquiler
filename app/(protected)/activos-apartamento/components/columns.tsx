"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ApartamentoActivoItem } from "../type";

export const columns: ColumnDef<ApartamentoActivoItem>[] = [
  {
    accessorKey: "apartamentoNumero",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Apartamento <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "tipoActivoNombre", header: "Tipo activo" },
  { accessorKey: "tipoHabitacionNombre", header: "Tipo habitación" },
  { accessorKey: "identificador", header: "Identificador" },
  { accessorKey: "descripcion", header: "Descripción" },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => (row.original.activo ? "Activo" : "Inactivo"),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <Link href={`/activos-apartamento/${row.original.id}/edit`}>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
