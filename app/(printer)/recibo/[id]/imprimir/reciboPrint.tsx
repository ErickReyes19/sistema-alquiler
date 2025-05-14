"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type";
import { useEffect } from "react";

interface ReciboImpresionProps {
  recibo: ReciboCompleto;
}

export function ReciboImpresion({ recibo }: ReciboImpresionProps) {
  useEffect(() => {
    const onAfter = () => window.close();
    window.addEventListener("afterprint", onAfter);
    setTimeout(() => window.print(), 100);
    return () => window.removeEventListener("afterprint", onAfter);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amount);
  };

  const calcularSubtotales = () => {
    const totalDetalles = recibo.detalles.reduce((sum, detalle) => sum + detalle.monto, 0);

    return {
      total: totalDetalles,
    };
  };

  const subtotales = calcularSubtotales();

  return (
    <div className="  mx-auto bg-white p-8 ">
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

      <div className="border border-dashed p-4 rounded-md mb-4">
        <h3 className="font-medium mb-4">Resumen de Totales</h3>
        <div className="space-y-2">
          {recibo.detalles
            .sort((a, b) => b.monto - a.monto)
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
            <span>Total</span>
            <span>{formatCurrency(subtotales.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Este recibo es un comprobante oficial de pago. Gracias por su puntualidad.</p>
        <p>Fecha de impresión: {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es })}</p>
      </div>

      <style jsx global>{`
        @media print {
          html, body {
            width: 100%;
            height: 100%;
          }

          @page {
            size: auto;
          }
        }
      `}</style>
    </div>
  );
}
