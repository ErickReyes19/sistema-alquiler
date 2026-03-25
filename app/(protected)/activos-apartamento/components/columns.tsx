"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircleIcon, MoreHorizontal, XCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TipoActivoApartamento } from "../type";

export const columns: ColumnDef<TipoActivoApartamento>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nombre <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) =>
      row.original.activo ? (
        <div className="flex gap-2"><CheckCircleIcon className="text-green-600" /> Activo</div>
      ) : (
        <div className="flex gap-2"><XCircleIcon className="text-red-600" /> Inactivo</div>
      ),
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
