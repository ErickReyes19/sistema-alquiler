"use client";

import type { ContratoView } from "@/app/(protected)/contratos/type";
import { formatearFecha } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

interface ContratoPrintProps {
  contrato: ContratoView;
}

export default function ContratoPrint({ contrato }: ContratoPrintProps) {
  const [fechayhora, setFechayhora] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setFechayhora(`${formatearFecha(now.toISOString())} ${now.toLocaleTimeString()}`);
    const onAfter = () => window.close();
    window.addEventListener("afterprint", onAfter);
    setTimeout(() => window.print(), 100);
    return () => window.removeEventListener("afterprint", onAfter);
  }, []);

  const formatDate = (dateString: string | null) =>
    dateString ? format(new Date(dateString), "dd/MM/yyyy", { locale: es }) : "No definida";

  const formatCurrency = (amt: number) =>
    new Intl.NumberFormat("es", { style: "currency", currency: "HNL" }).format(amt);

  return (
    <div className="print-container mx-auto bg-white text-black text-sm">
      {/* ───────────── CUERPO PRINCIPAL ───────────── */}
      <div className="print-body flex-grow">
        {/* Encabezado */}
        <div className="text-center mb-2 border-b pb-1">
          <h1 className="text-lg font-bold">CONTRATO DE ARRENDAMIENTO</h1>
          <p className="text-base">Contrato ID: {contrato.id}</p>
          <p className="text-base">Estado: {contrato.activo ? "ACTIVO" : "INACTIVO"}</p>
        </div>

        {/* Información principal */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <h2 className="font-semibold mb-1 text-base">Inquilino</h2>
            <p className="text-base">
              <span className="font-semibold">Nombre:</span> {contrato.inquilino}
            </p>
            <p className="text-base">
              <span className="font-semibold">ID:</span> {contrato.inquilinoId}
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-1 text-base">Apartamento</h2>
            <p className="text-base">
              <span className="font-semibold">Número:</span> {contrato.apartamento.numero}
            </p>
            {contrato.apartamento.direccion && (
              <p className="text-base">
                <span className="font-semibold">Dirección:</span>{" "}
                {contrato.apartamento.direccion}
              </p>
            )}
          </div>
        </div>

        {/* Detalles del contrato */}
        <div className="mb-2">
          <h2 className="font-semibold mb-1 text-base">Detalles del Contrato</h2>
          <div className="grid grid-cols-2 gap-1">
            <p className="text-base">
              <span className="font-semibold">Inicio:</span>{" "}
              {formatDate(contrato.fechaInicio)}
            </p>
            <p className="text-base">
              <span className="font-semibold">Fin:</span>{" "}
              {formatDate(contrato.fechaFin)}
            </p>
            <p className="col-span-2 text-base">
              <span className="font-semibold">Monto mensual:</span>{" "}
              {formatCurrency(contrato.montoMensual)}
            </p>
          </div>
        </div>

        {/* Habitaciones */}
        <div className="mb-2">
          <h2 className="font-semibold mb-1 text-base">Habitaciones</h2>
          <table className="w-full border-collapse text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-left">Tipo</th>
                <th className="border p-1 text-center">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {contrato.apartamento.habitaciones.map((h) => (
                <tr key={h.id}>
                  <td className="border p-1">{h.tipoHabitacionNombre}</td>
                  <td className="border p-1 text-center">{h.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Servicios */}
        <div className="mb-2">
          <h2 className="font-semibold mb-1 text-base">Servicios</h2>
          <table className="w-full border-collapse text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-left">Servicio</th>
                <th className="border p-1 text-center">Incluido</th>
                <th className="border p-1 text-right">Costo Adicional</th>
              </tr>
            </thead>
            <tbody>
              {contrato.apartamento.servicios.map((s) => (
                <tr key={s.id}>
                  <td className="border p-1">{s.servicioNombre}</td>
                  <td className="border p-1 text-center">
                    {s.incluido ? "Sí" : "No"}
                  </td>
                  <td className="border p-1 text-right">
                    {s.costoAdicional > 0
                      ? formatCurrency(s.costoAdicional)
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────────── FIRMAS Y PIE ───────────── */}
      <div className="print-footer mt-auto">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="border-t border-black pt-1 mx-auto w-32">
              <p className="text-base">Firma del Arrendador</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-black pt-1 mx-auto w-32">
              <p className="text-base">Firma del Inquilino</p>
            </div>
          </div>
        </div>
        <div className="text-center text-base border-t pt-1">
          Documento generado el: {fechayhora}
        </div>
      </div>

      <style jsx>{`
        @media print {
          html,
          body {
            margin: 0;
            padding: 0;
            font-size: 12pt; /* Aumenta el tamaño base */
          }
          @page {
            margin: 0.5cm; /* Deja un pequeño margen alrededor */
          }
          .print-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            padding-top: 2cm;    /* baja el cuerpo un poco */
            padding-bottom: 2.5cm; /* sube el footer un poco */
            box-sizing: border-box;
          }
          .print-body {
            flex-grow: 1;
          }
          .print-footer {
            margin-top: auto;
          }
        }
      `}</style>
    </div>
  );
}
