"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircleIcon, MoreHorizontal, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calcularEdad } from "@/lib/utils";

import { Inquilino } from "../type";

const decisionLabel = {
  PENDIENTE: "Pendiente",
  APROBADO: "Aprobado",
  RECHAZADO: "Rechazado",
} as const;

export const columns: ColumnDef<Inquilino>[] = [
  {
    accessorKey: "nombreCompleto",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Nombre<ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
  },
  {
    accessorKey: "dni",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>DNI<ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Teléfono<ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
  },
  {
    id: "ocupacion",
    header: "Ocupación",
    cell: ({ row }) => row.original.expedienteArrendamiento?.ocupacion || "Sin registrar",
  },
  {
    id: "ingresosMensuales",
    header: "Ingresos",
    cell: ({ row }) => {
      const value = row.original.expedienteArrendamiento?.ingresosMensuales
      return value ? `$${value.toLocaleString("es-DO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Sin registrar"
    },
  },
  {
    id: "decision",
    header: "Decisión",
    cell: ({ row }) => decisionLabel[row.original.expedienteArrendamiento.estadoDecision ?? "PENDIENTE"],
  },
  {
    accessorKey: "fechaNacimiento",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Edad<ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
    cell: ({ row }) => {
      const fn = row.original.fechaNacimiento;
      const fecha = typeof fn === "string" ? new Date(fn) : fn;
      const edad = calcularEdad(fecha);
      const fechaFormateada = fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
      return <div>{fechaFormateada} ({edad} años)</div>;
    },
  },
  {
    accessorKey: "activo",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Activo<ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
    cell: ({ row }) => row.getValue("activo") ? <div className="flex gap-2"><CheckCircleIcon color="green" />Activo</div> : <div className="flex gap-2"><XCircleIcon color="red" />Inactivo</div>,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir Menu</span><MoreHorizontal className="h-4 w-4" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <Link href={`/inquilinos/${row.original.id}/edit`}><DropdownMenuItem>Editar</DropdownMenuItem></Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
