'use client';

import { ArrowUpDown, CheckCircleIcon, XCircleIcon, MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Apartamento, Habitacion } from '../type';

// Columnas básicas para el modelo Apartamento
export const columns: ColumnDef<Apartamento & { habitaciones: Habitacion[] }>[] = [
  {
    accessorKey: 'numero',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-center"
      >
        Número
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `APT-${row.getValue('numero')}`,
  },
  {
    accessorKey: 'direccion',
    header: 'Dirección',
  },
  {
    accessorKey: 'disponible',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-left"
      >
        Disponible
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      row.getValue('disponible') ? (
        <div className="flex gap-2 text-green-500"><CheckCircleIcon /> Disponible</div>
      ) : (
        <div className="flex gap-2 text-red-500"><XCircleIcon /> No Disponible</div>
      )
    ),
  },
  {
    accessorKey: 'activo',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-left"
      >
        Activo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      row.getValue('activo') ? (
        <div className="flex gap-2 text-green-500"><CheckCircleIcon /> Activo</div>
      ) : (
        <div className="flex gap-2 text-red-500"><XCircleIcon /> Inactivo</div>
      )
    ),
  },

  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const apt = row.original;
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
            <Link href={`/apartamentos/${apt.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
            <Link href={`/apartamentos/${apt.id}/view`}>
              <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
