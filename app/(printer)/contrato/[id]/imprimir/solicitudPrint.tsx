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
    <div className="print-wrap mx-auto max-w-4xl bg-white px-9 py-8 text-slate-900">
      <header className="pb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Documento legal</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Contrato de arrendamiento</h1>
            <p className="mt-1 text-sm text-slate-600">Código de contrato: #{contrato.id}</p>
          </div>
          <p className="status-chip shrink-0 text-xs font-semibold tracking-wide text-slate-700">
            {contrato.activo ? "ACTIVO" : "INACTIVO"}
          </p>
        </div>
      </header>

      <section className="section-block">
        <h2 className="section-title">Partes del contrato</h2>
        <div className="grid grid-cols-2 gap-8 text-sm leading-relaxed print:grid-cols-2">
          <dl className="space-y-1.5">
            <p className="meta-title">Parte arrendataria</p>
            <div className="flex gap-1">
              <dt className="font-semibold">Nombre:</dt>
              <dd className="min-w-0 break-words">{contrato.inquilino}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-semibold">Identidad:</dt>
              <dd className="min-w-0 break-words">{contrato.inquiliniIdentidad}</dd>
            </div>
          </dl>

          <dl className="space-y-1.5">
            <p className="meta-title">Inmueble arrendado</p>
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

      <section className="section-block">
        <h2 className="section-title">Términos económicos y vigencia</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="meta-title">Fecha de inicio</p>
            <p className="mt-1 text-base font-semibold">{formatDate(contrato.fechaInicio)}</p>
          </div>
          <div>
            <p className="meta-title">Fecha de fin</p>
            <p className="mt-1 text-base font-semibold">{formatDate(contrato.fechaFin)}</p>
          </div>
          <div>
            <p className="meta-title">Renta mensual</p>
            <p className="mt-1 text-lg font-bold text-slate-950">{formatCurrency(contrato.montoMensual)}</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Habitaciones incluidas</h2>
        <table className="print-table w-full">
          <thead>
            <tr>
              <th className="table-head text-left">Tipo de habitación</th>
              <th className="table-head w-28 text-center">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {contrato.apartamento.habitaciones.map((h, index) => (
              <tr key={index}>
                <td className="table-cell break-words">{h.tipoHabitacionNombre}</td>
                <td className="table-cell text-center">{h.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section-block">
        <h2 className="section-title">Servicios del apartamento</h2>
        <table className="print-table w-full">
          <thead>
            <tr>
              <th className="table-head text-left">Servicio</th>
              <th className="table-head w-24 text-center">Incluido</th>
              <th className="table-head w-44 text-right">Costo adicional</th>
            </tr>
          </thead>
          <tbody>
            {contrato.apartamento.servicios.map((s, index) => (
              <tr key={index}>
                <td className="table-cell break-words">{s.servicioNombre}</td>
                <td className="table-cell text-center">{s.incluido ? "Sí" : "No"}</td>
                <td className="table-cell text-right">{s.costoAdicional > 0 ? formatCurrency(s.costoAdicional) : "Sin costo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section-block">
        <h2 className="section-title">Cláusulas y reglas aplicables</h2>
        <ol className="list-decimal space-y-2 pl-4 text-[13px] leading-relaxed text-slate-800">
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

      <section className="mt-14">
        <div className="grid grid-cols-2 gap-20">
          <div className="text-center">
            <div className="signature-line mx-auto pt-2">
              <p className="text-sm font-semibold">Firma del arrendador</p>
            </div>
          </div>
          <div className="text-center">
            <div className="signature-line mx-auto pt-2">
              <p className="text-sm font-semibold">Firma del inquilino</p>
            </div>
          </div>
        </div>
        <div className="meta-note mt-6 text-center text-[11px]">Documento generado el: {fechayhora}</div>
      </section>

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
          background: #f1f5f9;
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

        .signature-line {
          width: 13rem;
          border-top: 1px solid #64748b;
        }

        .meta-note {
          color: #64748b;
          border-top: 1px solid #dbe2ea;
          padding-top: 0.5rem;
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
