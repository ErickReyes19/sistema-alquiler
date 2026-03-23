"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ReciboCompleto } from "../type";

interface ReciboDetalleProps {
  recibo: ReciboCompleto;
}

const estadoConfig: Record<ReciboCompleto["estado"], string> = {
  PENDIENTE: "border-slate-200 bg-slate-50 text-slate-700",
  PAGADO: "border-emerald-200 bg-emerald-50 text-emerald-700",
  VENCIDO: "border-red-200 bg-red-50 text-red-700",
  PARCIALMENTE_PAGADO: "border-amber-200 bg-amber-50 text-amber-700",
};

const estadoLabel: Record<ReciboCompleto["estado"], string> = {
  PENDIENTE: "Pendiente",
  PAGADO: "Pagado",
  VENCIDO: "Vencido",
  PARCIALMENTE_PAGADO: "Parcialmente pagado",
};

export function ReciboDetalle({ recibo }: ReciboDetalleProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amount);

  const handlePrint = () => {
    window.open(`/recibo/${recibo.id}/imprimir/`, "_blank");
  };

  return (
    <Card className="mx-auto w-full print:shadow-none">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Recibo de cobranza</CardTitle>
            <CardDescription>Recibo #{recibo.id}</CardDescription>
          </div>
          <div className="print:hidden flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Fecha de emisión</h3>
            <p className="text-base">{format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Vencimiento</h3>
            <p className="text-base">{format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
            <div className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estadoConfig[recibo.estado]}`}>
              {estadoLabel[recibo.estado]}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Saldo pendiente</h3>
            <p className="text-base font-semibold">{formatCurrency(recibo.saldoPendiente)}</p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium">Información del inquilino</h3>
            <div className="space-y-1">
              <p className="text-sm">{recibo.contrato.inquilino.nombre}</p>
              <p className="text-sm text-muted-foreground">ID: {recibo.contrato.inquilino.identidad}</p>
              <p className="text-sm text-muted-foreground">Tel: {recibo.contrato.inquilino.numero}</p>
              {recibo.contrato.inquilino.correo && (
                <p className="text-sm text-muted-foreground">Correo: {recibo.contrato.inquilino.correo}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Información del apartamento</h3>
            <div className="space-y-1">
              <p className="text-sm">Apartamento #{recibo.contrato.apartamento.numero}</p>
              <p className="text-sm text-muted-foreground">{recibo.contrato.apartamento.direccion}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Monto facturado</p>
            <p className="text-lg font-semibold">{formatCurrency(recibo.total)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Recargo por mora</p>
            <p className="text-lg font-semibold">{formatCurrency(recibo.cargoMora)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Pagado acumulado</p>
            <p className="text-lg font-semibold">{formatCurrency(recibo.montoPagado)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Exigible actual</p>
            <p className="text-lg font-semibold">{formatCurrency(recibo.total + recibo.cargoMora)}</p>
          </div>
        </div>

        {recibo.observacionesCobranza && (
          <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Observaciones de cobranza</p>
            <p className="mt-2">{recibo.observacionesCobranza}</p>
          </div>
        )}

        <div>
          <h3 className="mb-2 font-medium">Conceptos del recibo</h3>
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

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pagos parciales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recibo.pagosParciales.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aún no hay pagos parciales registrados.</p>
              ) : (
                recibo.pagosParciales.map((pago) => (
                  <div key={pago.id} className="rounded-lg border p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span>{format(new Date(pago.fechaPago), "dd/MM/yyyy")}</span>
                      <Badge variant="outline">{formatCurrency(pago.monto)}</Badge>
                    </div>
                    {pago.referencia && <p className="mt-2 text-muted-foreground">Ref: {pago.referencia}</p>}
                    {pago.nota && <p className="mt-1 text-muted-foreground">{pago.nota}</p>}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Promesas de pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recibo.promesasPago.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hay promesas de pago asociadas.</p>
              ) : (
                recibo.promesasPago.map((promesa) => (
                  <div key={promesa.id} className="rounded-lg border p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span>{format(new Date(promesa.fechaPrometida), "dd/MM/yyyy")}</span>
                      <Badge variant={promesa.cumplida ? "secondary" : "outline"}>
                        {promesa.cumplida ? "Cumplida" : formatCurrency(promesa.montoPrometido)}
                      </Badge>
                    </div>
                    {promesa.nota && <p className="mt-2 text-muted-foreground">{promesa.nota}</p>}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recordatorios enviados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recibo.recordatorios.length === 0 ? (
                <p className="text-sm text-muted-foreground">Todavía no se han registrado recordatorios.</p>
              ) : (
                recibo.recordatorios.map((recordatorio) => (
                  <div key={recordatorio.id} className="rounded-lg border p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline">{recordatorio.canal}</Badge>
                      <span className="text-muted-foreground">{format(new Date(recordatorio.enviadoAt), "dd/MM/yyyy HH:mm")}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{recordatorio.destinatario}</p>
                    <p className="mt-1 line-clamp-3 text-muted-foreground">{recordatorio.mensaje}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="border-t flex flex-col items-start pt-6">
        <p className="text-sm text-muted-foreground">
          Este documento consolida el seguimiento de cobranza del recibo, incluyendo mora, pagos parciales y compromisos del inquilino.
        </p>
      </CardFooter>
    </Card>
  );
}
