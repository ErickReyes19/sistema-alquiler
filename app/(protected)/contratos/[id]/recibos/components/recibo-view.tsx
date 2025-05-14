"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Download, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ReciboCompleto } from "../type"

interface ReciboDetalleProps {
  recibo: ReciboCompleto
}

export function ReciboDetalle({ recibo }: ReciboDetalleProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amount)
  }

  const calcularSubtotales = () => {
    const detalleRenta = recibo.detalles.find((detalle) => detalle.descripcion.toLowerCase().includes("renta mensual"))

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

  const handlePrint = () => {
    window.print()
  }

  return (
    <Card className="w-full mx-auto print:shadow-none">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Recibo de Pago</CardTitle>
            <CardDescription>Recibo #{recibo.id}</CardDescription>
          </div>
          <div className="print:hidden flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Fecha de Pago</h3>
            <p className="text-base">{format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200 mt-1">
              Pagado
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid md:grid-cols-2 gap-6">
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

        <div>
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

        <div>
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

        <Card className="mt-6 border-dashed">
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="border-t flex flex-col items-start pt-6">
        <p className="text-sm text-muted-foreground">
          Este recibo es un comprobante oficial de pago. Gracias por su puntualidad.
        </p>
      </CardFooter>
    </Card>
  )
}
