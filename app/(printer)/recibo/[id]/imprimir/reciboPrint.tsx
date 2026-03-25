"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Separator } from "@/components/ui/separator"
import { ReciboCompleto } from "@/app/(protected)/contratos/[id]/recibos/type"
import { useEffect } from "react"

interface ReciboImpresionProps {
  recibo: ReciboCompleto
}

export function ReciboImpresion({ recibo }: ReciboImpresionProps) {
  useEffect(() => {
    const onAfter = () => {
      if (window.history.length > 1) {
        window.history.back()
      }
    }

    window.addEventListener("afterprint", onAfter)
    setTimeout(() => window.print(), 100)
    return () => window.removeEventListener("afterprint", onAfter)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amount)
  }

  const totalExigible = recibo.total + recibo.cargoMora

  return (
    <div className="print-wrap mx-auto w-full max-w-4xl bg-white px-7 py-6 text-slate-900">
      <header className="doc-card doc-header mb-5 rounded-xl border border-slate-200 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Comprobante oficial</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Recibo de pago</h1>
            <p className="mt-1 text-sm text-slate-600">Número de recibo: #{recibo.id}</p>
          </div>
          <div className="shrink-0 rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {recibo.estado.replaceAll("_", " ")}
          </div>
        </div>
      </header>

      <section className="mb-4 grid grid-cols-2 gap-3">
        <div className="doc-card rounded-lg border border-slate-200 px-3 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha de pago</h3>
          <p className="mt-1 text-base font-semibold">
            {format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div className="doc-card rounded-lg border border-slate-200 px-3 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha de vencimiento</h3>
          <p className="mt-1 text-base font-semibold">
            {format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
      </section>

      <section className="mb-4 grid grid-cols-2 gap-4">
        <div className="doc-card rounded-lg border border-slate-200 px-3 py-3">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Inquilino</h3>
          <dl className="space-y-1 text-sm">
            <div className="flex gap-1">
              <dt className="font-semibold">Nombre:</dt>
              <dd className="min-w-0 break-words">{recibo.contrato.inquilino.nombre}</dd>
            </div>
            <div className="flex gap-1 text-slate-700">
              <dt className="font-semibold">Identidad:</dt>
              <dd className="min-w-0 break-words">{recibo.contrato.inquilino.identidad}</dd>
            </div>
            <div className="flex gap-1 text-slate-700">
              <dt className="font-semibold">Teléfono:</dt>
              <dd className="min-w-0 break-words">{recibo.contrato.inquilino.numero}</dd>
            </div>
            {recibo.contrato.inquilino.correo && (
              <div className="flex gap-1 text-slate-700">
                <dt className="font-semibold">Correo:</dt>
                <dd className="min-w-0 break-words">{recibo.contrato.inquilino.correo}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="doc-card rounded-lg border border-slate-200 px-3 py-3">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Inmueble</h3>
          <dl className="space-y-1 text-sm">
            <div className="flex gap-1">
              <dt className="font-semibold">Apartamento:</dt>
              <dd className="min-w-0 break-words">#{recibo.contrato.apartamento.numero}</dd>
            </div>
            <div className="flex gap-1 text-slate-700">
              <dt className="font-semibold">Dirección:</dt>
              <dd className="min-w-0 break-words">{recibo.contrato.apartamento.direccion}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mb-4 overflow-hidden rounded-lg border border-slate-200">
        <div className="doc-card border-b border-slate-200 px-4 py-2.5">
          <h3 className="font-semibold text-slate-900">Detalle de conceptos</h3>
        </div>
        <table className="print-table w-full border-collapse">
          <thead>
            <tr className="bg-slate-100/70">
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Descripción</th>
              <th className="w-48 px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Monto</th>
            </tr>
          </thead>
          <tbody>
            {recibo.detalles
              .sort((a, b) => b.monto - a.monto)
              .map((detalle) => (
                <tr key={detalle.id} className="border-t border-slate-100 even:bg-slate-50/40">
                  <td className="px-4 py-2 text-sm break-words">{detalle.descripcion}</td>
                  <td className="px-4 py-2 text-right text-sm font-medium">{formatCurrency(detalle.monto)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="doc-card mb-5 rounded-lg border border-slate-200 px-4 py-3">
        <h3 className="mb-3 font-semibold">Resumen financiero</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-700">
            <span>Total facturado</span>
            <span>{formatCurrency(recibo.total)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span>Recargo por mora</span>
            <span>{formatCurrency(recibo.cargoMora)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span>Pagado acumulado</span>
            <span>{formatCurrency(recibo.montoPagado)}</span>
          </div>
          <Separator className="my-1.5 bg-slate-200" />
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total exigible</span>
            <span>{formatCurrency(totalExigible)}</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-slate-100/80 px-2 py-1 text-base font-bold text-slate-900">
            <span>Saldo pendiente</span>
            <span>{formatCurrency(recibo.saldoPendiente)}</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 pt-4 text-center text-xs text-slate-600">
        <p>Este recibo certifica el estado de cuenta del arrendamiento correspondiente.</p>
        <p>Generado el {format(new Date(), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}</p>
      </footer>

      <style jsx>{`
        .doc-card {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .doc-header {
          background: linear-gradient(135deg, #f8fafc 0%, #ecfeff 100%);
        }

        .print-table {
          table-layout: fixed;
        }

        @media print {
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            font-size: 10.5pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            size: A4;
            margin: 12mm;
          }

          .print-wrap {
            max-width: none;
            padding: 0;
          }

          section,
          table,
          tr,
          footer {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
