"use client"

import type { ContratoView } from "@/app/(protected)/contratos/type"
import { formatearFecha } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useEffect, useState } from "react"

interface ContratoPrintProps {
  contrato: ContratoView
}

export default function ContratoPrint({ contrato }: ContratoPrintProps) {
  const [fechayhora, setFechayhora] = useState<string>("")

  useEffect(() => {
    const now = new Date()
    setFechayhora(`${formatearFecha(now.toISOString())} ${now.toLocaleTimeString()}`)

    const onAfter = () => {
      if (window.history.length > 1) {
        window.history.back()
      }
    }

    window.addEventListener("afterprint", onAfter)
    setTimeout(() => window.print(), 100)
    return () => window.removeEventListener("afterprint", onAfter)
  }, [])

  const formatDate = (dateString: string | null) =>
    dateString ? format(new Date(dateString), "dd/MM/yyyy", { locale: es }) : "No definida"

  const formatCurrency = (amt: number) =>
    new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amt)

  return (
    <div className="print-wrap mx-auto max-w-4xl bg-white px-7 py-6 text-slate-900">
      <header className="doc-card doc-header mb-5 rounded-xl border border-slate-200 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">Documento legal</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Contrato de arrendamiento</h1>
            <p className="mt-1 text-sm text-slate-600">Código de contrato: #{contrato.id}</p>
          </div>
          <div className="shrink-0 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
            {contrato.activo ? "ACTIVO" : "INACTIVO"}
          </div>
        </div>
      </header>

      <section className="mb-5 grid grid-cols-2 gap-3 print:grid-cols-2">
        <div className="doc-card rounded-lg border border-slate-200 px-3 py-3">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Parte arrendataria</h2>
          <dl className="space-y-1 text-sm leading-relaxed">
            <div className="flex gap-1">
              <dt className="font-semibold">Nombre:</dt>
              <dd className="min-w-0 break-words">{contrato.inquilino}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-semibold">Identidad:</dt>
              <dd className="min-w-0 break-words">{contrato.inquiliniIdentidad}</dd>
            </div>
          </dl>
        </div>

        <div className="doc-card rounded-lg border border-slate-200 px-3 py-3">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Inmueble arrendado</h2>
          <dl className="space-y-1 text-sm leading-relaxed">
            <div className="flex gap-1">
              <dt className="font-semibold">Apartamento:</dt>
              <dd className="min-w-0 break-words">{contrato.apartamento.numero}</dd>
            </div>
            {contrato.apartamento.direccion && (
              <div className="flex gap-1">
                <dt className="font-semibold">Dirección:</dt>
                <dd className="min-w-0 break-words">{contrato.apartamento.direccion}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="doc-card mb-5 rounded-lg border border-slate-200 px-4 py-3">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Términos económicos y vigencia</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">Fecha de inicio</p>
            <p className="mt-0.5 text-base font-semibold">{formatDate(contrato.fechaInicio)}</p>
          </div>
          <div className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">Fecha de fin</p>
            <p className="mt-0.5 text-base font-semibold">{formatDate(contrato.fechaFin)}</p>
          </div>
          <div className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">Renta mensual</p>
            <p className="mt-0.5 text-base font-bold">{formatCurrency(contrato.montoMensual)}</p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Habitaciones incluidas</h2>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-slate-100/70">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Tipo de habitación
                </th>
                <th className="w-28 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {contrato.apartamento.habitaciones.map((h, index) => (
                <tr key={index} className="border-t border-slate-100 even:bg-slate-50/40">
                  <td className="px-3 py-1.5 text-sm break-words">{h.tipoHabitacionNombre}</td>
                  <td className="px-3 py-1.5 text-center text-sm">{h.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Servicios del apartamento</h2>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-slate-100/70">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Servicio</th>
                <th className="w-24 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Incluido</th>
                <th className="w-44 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Costo adicional
                </th>
              </tr>
            </thead>
            <tbody>
              {contrato.apartamento.servicios.map((s, index) => (
                <tr key={index} className="border-t border-slate-100 even:bg-slate-50/40">
                  <td className="px-3 py-1.5 text-sm break-words">{s.servicioNombre}</td>
                  <td className="px-3 py-1.5 text-center text-sm">{s.incluido ? "Sí" : "No"}</td>
                  <td className="px-3 py-1.5 text-right text-sm">{s.costoAdicional > 0 ? formatCurrency(s.costoAdicional) : "Sin costo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-card mb-4 rounded-lg border border-slate-200 px-4 py-3">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Cláusulas y reglas aplicables</h2>
        <ol className="list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-slate-800">
          <li>
            La parte arrendataria se obliga a pagar la renta mensual de <strong>{formatCurrency(contrato.montoMensual)}</strong>{" "}
            dentro de los primeros <strong>{contrato.diaPagoMensual}</strong> días de cada mes.
          </li>
          <li>
            El inmueble será destinado exclusivamente para uso habitacional. Se prohíbe subarrendar o ceder este
            contrato sin autorización escrita de la parte arrendadora.
          </li>
          <li>
            En caso de terminación anticipada, la parte arrendataria deberá notificar con un preaviso mínimo de{" "}
            <strong>{contrato.preavisoDias}</strong> días calendario.
          </li>
          {contrato.reglas.map((regla) => (
            <li key={regla.id}>
              <strong>{regla.nombre}.</strong> {regla.descripcion || "Regla aplicable de cumplimiento obligatorio."}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <div className="mx-auto w-52 border-t border-slate-500 pt-2">
              <p className="text-sm font-semibold">Firma del arrendador</p>
            </div>
          </div>
          <div className="text-center">
            <div className="mx-auto w-52 border-t border-slate-500 pt-2">
              <p className="text-sm font-semibold">Firma del inquilino</p>
            </div>
          </div>
        </div>
        <div className="mt-5 border-t border-slate-200 pt-2 text-center text-[11px] text-slate-600">
          Documento generado el: {fechayhora}
        </div>
      </section>

      <style jsx>{`
        .doc-card {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .doc-header {
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
        }

        .print-table {
          table-layout: fixed;
        }

        @media print {
          html,
          body {
            margin: 0;
            padding: 0;
            font-size: 10.5pt;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            margin: 12mm;
            size: A4;
          }

          .print-wrap {
            max-width: none;
            padding: 0;
          }

          .doc-card,
          .doc-header,
          .bg-slate-100\/70,
          .even\:bg-slate-50\/40 {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          section,
          table,
          tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
