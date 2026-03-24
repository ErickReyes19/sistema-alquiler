"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type";
import { useEffect } from "react";

interface ReciboImpresionProps {
  recibo: ReciboCompleto;
}

export function ReciboImpresion({ recibo }: ReciboImpresionProps) {
  useEffect(() => {
    const onAfter = () => {
      if (window.history.length > 1) {
        window.history.back();
      }
    };

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

  const totalExigible = recibo.total + recibo.cargoMora;

  return (
    <div className="mx-auto w-full max-w-4xl bg-white px-6 py-5 text-slate-900">
      <header className="mb-5 rounded-xl bg-slate-50/80 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Comprobante oficial</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Recibo de pago</h1>
            <p className="mt-1 text-sm text-slate-600">Número de recibo: #{recibo.id}</p>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {recibo.estado.replaceAll("_", " ")}
          </div>
        </div>
      </header>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50/70 px-3 py-2.5">
          <h3 className="text-sm font-medium text-slate-500">Fecha de pago</h3>
          <p className="mt-1 text-base font-semibold">
            {format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50/70 px-3 py-2.5">
          <h3 className="text-sm font-medium text-slate-500">Fecha de vencimiento</h3>
          <p className="mt-1 text-base font-semibold">
            {format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <section className="rounded-lg bg-slate-50/70 px-3 py-2.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Inquilino</h3>
          <div className="space-y-1.5">
            <p className="text-sm">{recibo.contrato.inquilino.nombre}</p>
            <p className="text-sm text-slate-600">Identidad: {recibo.contrato.inquilino.identidad}</p>
            <p className="text-sm text-slate-600">Teléfono: {recibo.contrato.inquilino.numero}</p>
            {recibo.contrato.inquilino.correo && (
              <p className="text-sm text-slate-600">Correo: {recibo.contrato.inquilino.correo}</p>
            )}
          </div>
        </section>
        <section className="rounded-lg bg-slate-50/70 px-3 py-2.5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Inmueble</h3>
          <div className="space-y-1.5">
            <p className="text-sm">Apartamento #{recibo.contrato.apartamento.numero}</p>
            <p className="text-sm text-slate-600">{recibo.contrato.apartamento.direccion}</p>
          </div>
        </section>
      </div>

      <section className="mb-4 rounded-lg bg-slate-50/60">
        <div className="px-4 py-2.5">
          <h3 className="font-semibold">Detalle de conceptos</h3>
        </div>
        <div className="space-y-1 px-4 pb-3">
          {recibo.detalles
            .sort((a, b) => b.monto - a.monto)
            .map((detalle) => (
              <div
                key={detalle.id}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm"
              >
                <span>{detalle.descripcion}</span>
                <span className="font-medium">{formatCurrency(detalle.monto)}</span>
              </div>
            ))}
        </div>
      </section>

      <section className="mb-5 rounded-lg bg-white px-4 py-3">
        <h3 className="mb-3 font-semibold">Resumen financiero</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span>Total facturado</span>
            <span>{formatCurrency(recibo.total)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Recargo por mora</span>
            <span>{formatCurrency(recibo.cargoMora)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Pagado acumulado</span>
            <span>{formatCurrency(recibo.montoPagado)}</span>
          </div>
          <Separator className="my-1.5 bg-slate-200" />
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total exigible</span>
            <span>{formatCurrency(totalExigible)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-bold text-slate-900">
            <span>Saldo pendiente</span>
            <span>{formatCurrency(recibo.saldoPendiente)}</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 pt-4 text-center text-xs text-slate-600">
        <p>Este recibo certifica el estado de cuenta del arrendamiento correspondiente.</p>
        <p>Generado el {format(new Date(), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}</p>
      </footer>

      <style jsx global>{`
        @media print {
          html, body {
            width: 100%;
            height: 100%;
          }

          @page {
            size: A4;
            margin: 16mm;
          }
        }
      `}</style>
    </div>
  );
}
