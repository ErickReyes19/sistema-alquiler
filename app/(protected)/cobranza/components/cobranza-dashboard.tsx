"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Mail, MessageCircle, ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  CobranzaData,
  CobranzaReciboItem,
  registrarPagoParcial,
  registrarPromesaPago,
  registrarRecordatorio,
} from "../actions";

const currencyFormatter = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
  maximumFractionDigits: 2,
});

const estadoVariant: Record<CobranzaReciboItem["estado"], "default" | "secondary" | "destructive" | "outline"> = {
  PENDIENTE: "outline",
  PAGADO: "secondary",
  VENCIDO: "destructive",
  PARCIALMENTE_PAGADO: "default",
};

const estadoLabel: Record<CobranzaReciboItem["estado"], string> = {
  PENDIENTE: "Pendiente",
  PAGADO: "Pagado",
  VENCIDO: "Vencido",
  PARCIALMENTE_PAGADO: "Parcialmente pagado",
};

function SummaryCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function QuickForms({ recibo }: { recibo: CobranzaReciboItem }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [pagoMonto, setPagoMonto] = useState<string>(recibo.saldoPendiente.toFixed(2));
  const [pagoFecha, setPagoFecha] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [pagoReferencia, setPagoReferencia] = useState<string>("");
  const [pagoNota, setPagoNota] = useState<string>("");
  const [promesaMonto, setPromesaMonto] = useState<string>(recibo.saldoPendiente.toFixed(2));
  const [promesaFecha, setPromesaFecha] = useState<string>(format(new Date(recibo.fechaVencimiento), "yyyy-MM-dd"));
  const [promesaNota, setPromesaNota] = useState<string>("");

  const submitPago = () => {
    startTransition(async () => {
      try {
        await registrarPagoParcial({
          reciboId: recibo.id,
          monto: Number(pagoMonto),
          fechaPago: new Date(`${pagoFecha}T00:00:00`).toISOString(),
          referencia: pagoReferencia,
          nota: pagoNota,
        });
        toast({ title: "Pago parcial registrado", description: "La cobranza se actualizó correctamente." });
        router.refresh();
      } catch (error) {
        toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
      }
    });
  };

  const submitPromesa = () => {
    startTransition(async () => {
      try {
        await registrarPromesaPago({
          reciboId: recibo.id,
          fechaPrometida: new Date(`${promesaFecha}T00:00:00`).toISOString(),
          montoPrometido: Number(promesaMonto),
          nota: promesaNota,
        });
        toast({ title: "Promesa registrada", description: "Se guardó la promesa de pago del inquilino." });
        router.refresh();
      } catch (error) {
        toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
      }
    });
  };

  const triggerReminder = (canal: "WHATSAPP" | "EMAIL", url?: string) => {
    if (!url) {
      toast({
        title: "Contacto no disponible",
        description: canal === "WHATSAPP" ? "El inquilino no tiene teléfono válido." : "El inquilino no tiene correo registrado.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        await registrarRecordatorio({
          reciboId: recibo.id,
          canal,
          destinatario: canal === "WHATSAPP" ? recibo.telefono : recibo.correo,
          mensaje: recibo.mensajeCobranza,
        });
        window.open(url, "_blank", "noopener,noreferrer");
        toast({ title: "Recordatorio listo", description: `Se registró el recordatorio por ${canal}.` });
        router.refresh();
      } catch (error) {
        toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
      <div className="rounded-lg border p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium">Recordatorios</p>
          <Badge variant="outline">{recibo.recordatoriosEnviados} enviados</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => triggerReminder("WHATSAPP", recibo.whatsappUrl)} disabled={isPending}>
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button size="sm" variant="outline" onClick={() => triggerReminder("EMAIL", recibo.emailUrl)} disabled={isPending}>
            <Mail className="mr-2 h-4 w-4" />
            Correo
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">No se usa API externa: el sistema registra el intento y abre WhatsApp o correo con el mensaje preparado.</p>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <p className="font-medium">Registrar pago parcial</p>
        <Input type="number" step="0.01" value={pagoMonto} onChange={(e) => setPagoMonto(e.target.value)} placeholder="Monto" />
        <Input type="date" value={pagoFecha} onChange={(e) => setPagoFecha(e.target.value)} />
        <Input value={pagoReferencia} onChange={(e) => setPagoReferencia(e.target.value)} placeholder="Referencia" />
        <Input value={pagoNota} onChange={(e) => setPagoNota(e.target.value)} placeholder="Nota" />
        <Button className="w-full" onClick={submitPago} disabled={isPending}>
          Registrar pago
        </Button>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <p className="font-medium">Registrar promesa de pago</p>
        <Input type="number" step="0.01" value={promesaMonto} onChange={(e) => setPromesaMonto(e.target.value)} placeholder="Monto prometido" />
        <Input type="date" value={promesaFecha} onChange={(e) => setPromesaFecha(e.target.value)} />
        <Input value={promesaNota} onChange={(e) => setPromesaNota(e.target.value)} placeholder="Nota de acuerdo" />
        <Button className="w-full" variant="secondary" onClick={submitPromesa} disabled={isPending}>
          Guardar promesa
        </Button>
      </div>
    </div>
  );
}

function ReciboCard({ recibo }: { recibo: CobranzaReciboItem }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-lg">Apartamento {recibo.apartamento}</CardTitle>
            <CardDescription>
              {recibo.inquilino} · Vence el {format(new Date(recibo.fechaVencimiento), "dd 'de' MMM yyyy", { locale: es })}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={estadoVariant[recibo.estado]}>{estadoLabel[recibo.estado]}</Badge>
            <Badge variant="outline">Saldo {currencyFormatter.format(recibo.saldoPendiente)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Facturado</p>
            <p className="font-semibold">{currencyFormatter.format(recibo.total)}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Mora</p>
            <p className="font-semibold">{currencyFormatter.format(recibo.cargoMora)}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Pagado</p>
            <p className="font-semibold">{currencyFormatter.format(recibo.montoPagado)}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Promesas activas</p>
            <p className="font-semibold">{recibo.promesasPendientes}</p>
          </div>
        </div>

        {recibo.observacionesCobranza && (
          <div className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            {recibo.observacionesCobranza}
          </div>
        )}

        <QuickForms recibo={recibo} />
      </CardContent>
    </Card>
  );
}

export function CobranzaDashboard({ data }: { data: CobranzaData }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard title="Saldo pendiente total" value={currencyFormatter.format(data.resumen.saldoPendienteTotal)} subtitle="Exposición actual de cobranza sobre recibos abiertos." />
        <SummaryCard title="Recibos vencidos" value={data.resumen.recibosVencidos.toString()} subtitle="Morosos que requieren acción inmediata." />
        <SummaryCard title="Recibos parcialmente pagados" value={data.resumen.recibosParciales.toString()} subtitle="Casos con abonos pero saldo aún abierto." />
        <SummaryCard title="Recibos pendientes" value={data.resumen.recibosPendientes.toString()} subtitle="Pendientes aún dentro de fecha o por vencer." />
        <SummaryCard title="Contratos con saldo" value={data.resumen.contratosConSaldo.toString()} subtitle="Cartera activa que necesita seguimiento." />
        <SummaryCard title="Promesas activas" value={data.resumen.promesasPendientes.toString()} subtitle="Compromisos de pago aún no cumplidos." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Reporte de morosos</CardTitle>
            <CardDescription>Recibos vencidos ordenados por fecha de vencimiento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.reporteMorosos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay morosos en este momento.</p>
            ) : (
              data.reporteMorosos.map((recibo) => (
                <div key={recibo.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">{recibo.inquilino} · Apartamento {recibo.apartamento}</p>
                      <p className="text-sm text-muted-foreground">Venció el {format(new Date(recibo.fechaVencimiento), "dd/MM/yyyy")} · {currencyFormatter.format(recibo.saldoPendiente)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <a href={`/contratos/${recibo.contratoId}/recibos/${recibo.id}/view`}>
                          <ReceiptText className="mr-2 h-4 w-4" />
                          Ver recibo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saldo pendiente por contrato</CardTitle>
            <CardDescription>Consolidado para priorizar la cobranza.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.saldosPorContrato.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay contratos con saldo pendiente.</p>
            ) : (
              data.saldosPorContrato.map((contrato) => (
                <div key={contrato.contratoId} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{contrato.inquilino}</p>
                      <p className="text-sm text-muted-foreground">Apartamento {contrato.apartamento}</p>
                    </div>
                    <Badge variant={contrato.montoVencido > 0 ? "destructive" : "outline"}>
                      {currencyFormatter.format(contrato.saldoPendiente)}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {contrato.recibosAbiertos} recibo(s) abierto(s) · vencido {currencyFormatter.format(contrato.montoVencido)}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Seguimiento operativo</h3>
          <p className="text-sm text-muted-foreground">Desde aquí puedes registrar abonos, promesas y recordatorios sin salir del flujo de cobranza.</p>
        </div>
        {data.recibosAbiertos.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">No hay recibos abiertos para gestionar.</CardContent>
          </Card>
        ) : (
          data.recibosAbiertos.map((recibo) => <ReciboCard key={recibo.id} recibo={recibo} />)
        )}
      </div>
    </div>
  );
}
