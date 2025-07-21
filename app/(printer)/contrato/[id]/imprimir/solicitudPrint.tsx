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
    const onAfter = () => window.close()
    window.addEventListener("afterprint", onAfter)
    setTimeout(() => window.print(), 100)
    return () => window.removeEventListener("afterprint", onAfter)
  }, [])

  const formatDate = (dateString: string | null) =>
    dateString ? format(new Date(dateString), "dd/MM/yyyy", { locale: es }) : "No definida"

  const formatCurrency = (amt: number) =>
    new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amt)

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8">
      {/* Encabezado */}
      <div className="text-center mb-8 pb-4 ">
        <h1 className="text-2xl font-bold mb-2">CONTRATO DE ARRENDAMIENTO</h1>
        <p className="text-lg">
          Estado: <span className="font-semibold">{contrato.activo ? "ACTIVO" : "INACTIVO"}</span>
        </p>
      </div>

      {/* Información de las partes */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-bold mb-4  pb-2">INQUILINO</h2>
          <p className="mb-2">
            <span className="font-semibold">Nombre:</span> {contrato.inquilino}
          </p>
          <p>
            <span className="font-semibold">Identidad:</span> {contrato.inquiliniIdentidad}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4  pb-2">INMUEBLE</h2>
          <p className="mb-2">
            <span className="font-semibold">Apartamento:</span> {contrato.apartamento.numero}
          </p>
          {contrato.apartamento.direccion && (
            <p>
              <span className="font-semibold">Dirección:</span> {contrato.apartamento.direccion}
            </p>
          )}
        </div>
      </div>

      {/* Términos del contrato */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4  pb-2">TÉRMINOS DEL CONTRATO</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="font-semibold">Fecha de Inicio:</p>
            <p className="text-lg">{formatDate(contrato.fechaInicio)}</p>
          </div>
          <div>
            <p className="font-semibold">Fecha de Fin:</p>
            <p className="text-lg">{formatDate(contrato.fechaFin)}</p>
          </div>
          <div>
            <p className="font-semibold">Renta Mensual:</p>
            <p className="text-lg font-bold">{formatCurrency(contrato.montoMensual)}</p>
          </div>
        </div>
      </div>

      {/* Habitaciones */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4  pb-2">HABITACIONES</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1 text-left">Tipo de Habitación</th>
              <th className="border p-1 text-center">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {contrato.apartamento.habitaciones.map((h, index) => (
              <tr key={index}>
                <td className="border p-1">{h.tipoHabitacionNombre}</td>
                <td className="border p-1 text-center">{h.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Servicios */}
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-4  pb-2">SERVICIOS</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1 text-left">Servicio</th>
              <th className="border p-1 text-center">Incluido</th>
              <th className="border p-1 text-right">Costo Adicional</th>
            </tr>
          </thead>
          <tbody>
            {contrato.apartamento.servicios.map((s, index) => (
              <tr key={index}>
                <td className="border p-1">{s.servicioNombre}</td>
                <td className="border p-1 text-center">{s.incluido ? "Sí" : "No"}</td>
                <td className="border p-1 text-right">
                  {s.costoAdicional > 0 ? formatCurrency(s.costoAdicional) : "Sin costo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Firmas */}
      <div className="mt-16">
        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <div className="border-t-2 lack pt-3 mx-auto w-48">
              <p className="font-semibold">Firma del Arrendador</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t-2 lack pt-3 mx-auto w-48">
              <p className="font-semibold">Firma del Inquilino</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-4 border-t text-sm text-gray-600">Documento generado el: {fechayhora}</div>
      </div>

      <style jsx>{`
        @media print {
          html, body {
            margin: 0;
            padding: 0;
            font-size: 12pt;
          }
          
          @page {
            margin: 2cm;
            size: A4;
          }
          
          .max-w-4xl {
            max-width: none;
          }
          
          .bg-gray-100 {
            background-color: #f5f5f5 !important;
            -webkit-print-color-adjust: exact;
          }
          
          .text-gray-600 {
            color: #666 !important;
          }
        }
      `}</style>
    </div>
  )
}
