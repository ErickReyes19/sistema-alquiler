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
    <div className="mx-auto max-w-4xl bg-white p-8 text-slate-900">
      <header className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Documento legal</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Contrato de arrendamiento</h1>
            <p className="mt-1 text-sm text-slate-600">Código de contrato: #{contrato.id}</p>
          </div>
          <div className="rounded-lg border px-4 py-2 text-sm font-semibold">
            {contrato.activo ? "ACTIVO" : "INACTIVO"}
          </div>
        </div>
      </header>

      <section className="mb-8 grid grid-cols-2 gap-8">
        <div className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Parte arrendataria</h2>
          <p className="mb-1 text-sm">
            <span className="font-semibold">Nombre:</span> {contrato.inquilino}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Identidad:</span> {contrato.inquiliniIdentidad}
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Inmueble arrendado</h2>
          <p className="mb-1 text-sm">
            <span className="font-semibold">Apartamento:</span> {contrato.apartamento.numero}
          </p>
          {contrato.apartamento.direccion && (
            <p className="text-sm">
              <span className="font-semibold">Dirección:</span> {contrato.apartamento.direccion}
            </p>
          )}
        </div>
      </section>

      <section className="mb-8 rounded-lg border p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Términos económicos y vigencia</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Fecha de inicio</p>
            <p className="mt-1 text-lg font-semibold">{formatDate(contrato.fechaInicio)}</p>
          </div>
          <div className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Fecha de fin</p>
            <p className="mt-1 text-lg font-semibold">{formatDate(contrato.fechaFin)}</p>
          </div>
          <div className="rounded-md border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Renta mensual</p>
            <p className="mt-1 text-lg font-bold">{formatCurrency(contrato.montoMensual)}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Habitaciones incluidas</h2>
        <table className="w-full border-collapse overflow-hidden rounded-lg border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-2 text-left text-sm">Tipo de habitación</th>
              <th className="border p-2 text-center text-sm">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {contrato.apartamento.habitaciones.map((h, index) => (
              <tr key={index}>
                <td className="border p-2 text-sm">{h.tipoHabitacionNombre}</td>
                <td className="border p-2 text-center text-sm">{h.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Servicios del apartamento</h2>
        <table className="w-full border-collapse overflow-hidden rounded-lg border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-2 text-left text-sm">Servicio</th>
              <th className="border p-2 text-center text-sm">Incluido</th>
              <th className="border p-2 text-right text-sm">Costo adicional</th>
            </tr>
          </thead>
          <tbody>
            {contrato.apartamento.servicios.map((s, index) => (
              <tr key={index}>
                <td className="border p-2 text-sm">{s.servicioNombre}</td>
                <td className="border p-2 text-center text-sm">{s.incluido ? "Sí" : "No"}</td>
                <td className="border p-2 text-right text-sm">
                  {s.costoAdicional > 0 ? formatCurrency(s.costoAdicional) : "Sin costo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <div className="mx-auto w-52 border-t-2 pt-3">
              <p className="font-semibold">Firma del arrendador</p>
            </div>
          </div>
          <div className="text-center">
            <div className="mx-auto w-52 border-t-2 pt-3">
              <p className="font-semibold">Firma del inquilino</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-slate-600">
          Documento generado el: {fechayhora}
        </div>
      </section>

      <style jsx>{`
        @media print {
          html,
          body {
            margin: 0;
            padding: 0;
            font-size: 12pt;
          }

          @page {
            margin: 16mm;
            size: A4;
          }

          .max-w-4xl {
            max-width: none;
          }

          .bg-slate-100,
          .bg-slate-50 {
            background-color: #f1f5f9 !important;
            -webkit-print-color-adjust: exact;
          }

          .text-slate-600 {
            color: #475569 !important;
          }
        }
      `}</style>
    </div>
  )
}
