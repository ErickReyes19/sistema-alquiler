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
    <div className="print-wrap mx-auto w-full max-w-4xl bg-white px-9 py-8 text-slate-900">
      <header className="pb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Comprobante oficial</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight">Recibo de pago</h1>
            <p className="mt-1 text-sm text-slate-600">Número de recibo: #{recibo.id}</p>
          </div>
          <p className="status-chip shrink-0 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {recibo.estado.replaceAll("_", " ")}
          </p>
        </div>
      </header>

      <section className="section-block">
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="meta-title">Fecha de pago</p>
            <p className="mt-1 text-base font-semibold">
              {format(new Date(recibo.fechaPago), "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>
          <div>
            <p className="meta-title">Fecha de vencimiento</p>
            <p className="mt-1 text-base font-semibold">
              {format(new Date(recibo.fechaVencimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>
        </div>
      </section>

      <section className="section-block grid grid-cols-2 gap-8">
        <dl className="space-y-1 text-sm">
          <p className="meta-title">Inquilino</p>
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
        <dl className="space-y-1 text-sm">
          <p className="meta-title">Inmueble</p>
          <div className="flex gap-1">
            <dt className="font-semibold">Apartamento:</dt>
            <dd className="min-w-0 break-words">#{recibo.contrato.apartamento.numero}</dd>
          </div>
          <div className="flex gap-1 text-slate-700">
            <dt className="font-semibold">Dirección:</dt>
            <dd className="min-w-0 break-words">{recibo.contrato.apartamento.direccion}</dd>
          </div>
        </dl>
      </section>

      <section className="section-block">
        <h3 className="section-title">Detalle de conceptos</h3>
        <table className="print-table w-full">
          <thead>
            <tr>
              <th className="table-head text-left">Descripción</th>
              <th className="table-head w-48 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {recibo.detalles
              .sort((a, b) => b.monto - a.monto)
              .map((detalle) => (
                <tr key={detalle.id}>
                  <td className="table-cell break-words">{detalle.descripcion}</td>
                  <td className="table-cell text-right font-medium">{formatCurrency(detalle.monto)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="section-block">
        <h3 className="section-title">Resumen financiero</h3>
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
          <Separator className="my-1.5 bg-slate-300" />
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total exigible</span>
            <span>{formatCurrency(totalExigible)}</span>
          </div>
          <div className="flex items-center justify-between rounded-sm bg-slate-100 px-2 py-1 text-base font-bold text-slate-900">
            <span>Saldo pendiente</span>
            <span>{formatCurrency(recibo.saldoPendiente)}</span>
          </div>
        </div>
      </section>

      <footer className="section-block text-center text-xs text-slate-600">
        <p>Este recibo certifica el estado de cuenta del arrendamiento correspondiente.</p>
        <p>Generado el {format(new Date(), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}</p>
      </footer>

      <style jsx>{`
        .section-block {
          margin-bottom: 1.2rem;
          padding-top: 0.9rem;
          border-top: 1px solid #dbe2ea;
        }

        .section-title {
          margin-bottom: 0.65rem;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 700;
          color: #475569;
        }

        .meta-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #64748b;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .status-chip {
          background: #dcfce7;
          border-radius: 9999px;
          padding: 0.35rem 0.9rem;
        }

        .print-table {
          table-layout: fixed;
          border-collapse: collapse;
        }

        .table-head {
          padding: 0.48rem 0.35rem;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #64748b;
          font-weight: 700;
          border-bottom: 1px solid #cbd5e1;
        }

        .table-cell {
          padding: 0.52rem 0.35rem;
          font-size: 0.88rem;
          border-bottom: 1px solid #e2e8f0;
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
