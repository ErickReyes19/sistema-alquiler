"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type"

// Asumiendo que este tipo es similar al que tienes en tu aplicación


interface ReciboImpresionProps {
  recibo: ReciboCompleto
}

export function ReciboImpresion({ recibo }: ReciboImpresionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amount)
  }

  const calcularSubtotales = () => {
    const detalleRenta = recibo.detalles.find((detalle) => 
      detalle.descripcion.toLowerCase().includes("renta mensual")
    )

    const montoRenta = detalleRenta ? detalleRenta.monto : recibo.contrato.montoMensual

    const montosAdicionales = recibo.detalles
      .filter((detalle) => !detalle.descripcion.toLowerCase().includes("renta mensual"))
      .reduce((sum, detalle) => sum + detalle.monto, 0)

    return {
      montoRenta,
      montosAdicionales,
      total: montoRenta + montosAdicionales,
    }
  }

  const subtotales = calcularSubtotales()

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 print:p-0">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">RECIBO DE PAGO</h1>
        <p className="text-muted-foreground">#{recibo.id}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Fecha de Pago</h3>
          <p className="text-base">
            {format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200 mt-1">
            Pagado
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="font-medium mb-2">Información del Inquilino</h3>
          <div className="space-y-1">
            <p className="text-sm">{recibo.contrato.inquilino.nombre}</p>
            <p className="text-sm text-muted-foreground">ID: {recibo.contrato.inquilino.identidad}</p>
            <p className="text-sm text-muted-foreground">Tel: {recibo.contrato.inquilino.numero}</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Información del Apartamento</h3>
          <div className="space-y-1">
            <p className="text-sm">Apartamento #{recibo.contrato.apartamento.numero}</p>
            <p className="text-sm text-muted-foreground">{recibo.contrato.apartamento.direccion}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Información del Contrato</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Fecha de Inicio</p>
            <p className="text-sm">{format(new Date(recibo.contrato.fechaInicio), "dd/MM/yyyy")}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fecha de Fin</p>
            <p className="text-sm">
              {recibo.contrato.fechaFin
                ? format(new Date(recibo.contrato.fechaFin), "dd/MM/yyyy")
                : "Contrato vigente"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monto Mensual</p>
            <p className="text-sm">{formatCurrency(recibo.contrato.montoMensual)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <div
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                recibo.contrato.activo
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              } mt-1`}
            >
              {recibo.contrato.activo ? "Activo" : "Inactivo"}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Detalles del Pago</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recibo.detalles.map((detalle) => (
              <TableRow key={detalle.id}>
                <TableCell>{detalle.descripcion}</TableCell>
                <TableCell className="text-right">{formatCurrency(detalle.monto)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="border border-dashed p-4 rounded-md mb-4">
        <h3 className="font-medium mb-4">Resumen de Totales</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Renta mensual base</span>
            <span>{formatCurrency(subtotales.montoRenta)}</span>
          </div>

          {subtotales.montosAdicionales > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm">Cargos adicionales</span>
              <span>{formatCurrency(subtotales.montosAdicionales)}</span>
            </div>
          )}

          {recibo.detalles
            .filter((detalle) => !detalle.descripcion.toLowerCase().includes("renta mensual"))
            .map((detalle) => (
              <div
                key={detalle.id}
                className="flex justify-between items-center pl-4 text-xs text-muted-foreground"
              >
                <span>{detalle.descripcion}</span>
                <span>{formatCurrency(detalle.monto)}</span>
              </div>
            ))}

          <Separator className="my-2" />

          <div className="flex justify-between items-center font-medium">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotales.total)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 text-lg font-bold">
            <span>Total a pagar</span>
            <span className="text-primary">{formatCurrency(subtotales.total)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="text-center">
          <div className="border-t border-gray-300 pt-2">
            <p className="font-medium">Firma del Arrendador</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-gray-300 pt-2">
            <p className="font-medium">Firma del Inquilino</p>
            <p className="text-sm text-muted-foreground">{recibo.contrato.inquilino.nombre}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Este recibo es un comprobante oficial de pago. Gracias por su puntualidad.</p>
        <p>Fecha de impresión: {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es })}</p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            font-size: 12pt;
            color: black;
          }
          
          .print-hidden {
            display: none !important;
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  )
}
