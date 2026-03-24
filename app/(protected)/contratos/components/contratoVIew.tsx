"use client";

import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  AlertTriangle,
  CalendarIcon,
  CheckCircle,
  ClipboardList,
  DoorOpen,
  History,
  Loader2,
  Plus,
  PencilLine,
  RefreshCcw,
  Trash2,
  Wallet,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { formatLempiras } from "@/lib/utils";

import {
  registrarAjusteRentaContrato,
  registrarEntregaContrato,
  registrarInventarioContrato,
  registrarRenovacionContrato,
} from "../actions";
import { AjusteLiquidacionItem, ContratoView, EstadoRenovacionContrato, TipoInventarioContrato, TipoAjusteLiquidacion } from "../type";

interface ContratoViewProps {
  contrato: ContratoView;
}

const renewalStateOptions: Array<{ value: EstadoRenovacionContrato; label: string }> = [
  { value: "ALERTA_GENERADA", label: "Alerta generada" },
  { value: "EN_NEGOCIACION", label: "En negociación" },
  { value: "RENOVADO", label: "Renovado" },
  { value: "NO_RENOVADO", label: "No renovado" },
];

type RenewalFormState = {
  fechaGestion: string;
  fechaInicioRenovada: string;
  fechaFinRenovada: string;
  montoNuevo: string;
  estado: EstadoRenovacionContrato;
  notas: string;
};

const inventoryTypeLabels: Record<TipoInventarioContrato, string> = {
  ENTRADA: "Inventario de entrada",
  SALIDA: "Inventario de salida",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "No definida";
  return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es });
}

function formatInputDate(dateString: string | null | undefined) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().slice(0, 10);
}

function toSafeNumber(value: string | number) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function ContratoViewComponent({ contrato }: ContratoViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const inventoryByType = useMemo(
    () =>
      contrato.inventarios.reduce(
        (accumulator, inventory) => {
          accumulator[inventory.tipo] = inventory;
          return accumulator;
        },
        {} as Partial<Record<TipoInventarioContrato, ContratoView["inventarios"][number]>>,
      ),
    [contrato.inventarios],
  );

  const [renewalForm, setRenewalForm] = useState<RenewalFormState>({
    fechaGestion: formatInputDate(new Date().toISOString()),
    fechaInicioRenovada: formatInputDate(contrato.fechaFin ?? contrato.fechaInicio),
    fechaFinRenovada: formatInputDate(contrato.fechaFin),
    montoNuevo: contrato.montoMensual.toString(),
    estado: contrato.estadoRenovacion === "SIN_GESTION" ? "EN_NEGOCIACION" : contrato.estadoRenovacion,
    notas: "",
  });

  const [rentForm, setRentForm] = useState({
    fechaAplicacion: formatInputDate(new Date().toISOString()),
    montoNuevo: contrato.montoMensual.toString(),
    motivo: "",
  });

  const [inventoryForm, setInventoryForm] = useState<Record<TipoInventarioContrato, { fechaRegistro: string; observaciones: string; itemsText: string }>>({
    ENTRADA: {
      fechaRegistro: formatInputDate(inventoryByType.ENTRADA?.fechaRegistro ?? contrato.fechaInicio),
      observaciones: inventoryByType.ENTRADA?.observaciones ?? "",
      itemsText: inventoryByType.ENTRADA?.items.join("\n") ?? "",
    },
    SALIDA: {
      fechaRegistro: formatInputDate(inventoryByType.SALIDA?.fechaRegistro ?? contrato.fechaDesocupacion ?? new Date().toISOString()),
      observaciones: inventoryByType.SALIDA?.observaciones ?? "",
      itemsText: inventoryByType.SALIDA?.items.join("\n") ?? "",
    },
  });

  const [handoverForm, setHandoverForm] = useState({
    fechaEntrega: formatInputDate(contrato.entrega?.fechaEntrega ?? contrato.fechaFin ?? new Date().toISOString()),
    estadoInmueble: contrato.entrega?.estadoInmueble ?? "Bueno",
    saldoPendiente: contrato.entrega?.saldoPendiente.toString() ?? "0",
    depositoDevuelto: contrato.depositoGarantia?.montoDevuelto?.toString() ?? "0",
    reciboLiquidacion: contrato.depositoGarantia?.reciboLiquidacion ?? "",
    observacionDeposito: contrato.depositoGarantia?.observaciones ?? "",
    motivoCancelacion: contrato.entrega?.motivoCancelacion ?? contrato.motivoCancelacion ?? "",
    observaciones: contrato.entrega?.observaciones ?? contrato.notasCierre ?? "",
  });

  const [ajustesLiquidacion, setAjustesLiquidacion] = useState<Array<{ concepto: string; monto: string; tipo: TipoAjusteLiquidacion }>>(
    contrato.entrega?.ajustesLiquidacion?.length
      ? contrato.entrega.ajustesLiquidacion.map((item) => ({
          concepto: item.concepto,
          monto: item.monto.toString(),
          tipo: item.tipo,
        }))
      : [{ concepto: "", monto: "0", tipo: "RESTA" }],
  );

  const ajustesNormalizados = useMemo<AjusteLiquidacionItem[]>(
    () =>
      ajustesLiquidacion
        .map((item) => ({
          concepto: item.concepto.trim(),
          monto: toSafeNumber(item.monto),
          tipo: item.tipo,
        }))
        .filter((item) => item.concepto && item.monto > 0),
    [ajustesLiquidacion],
  );

  const totalRestas = useMemo(() => ajustesNormalizados.filter((item) => item.tipo === "RESTA").reduce((accumulator, item) => accumulator + item.monto, 0), [ajustesNormalizados]);
  const totalSumas = useMemo(() => ajustesNormalizados.filter((item) => item.tipo === "SUMA").reduce((accumulator, item) => accumulator + item.monto, 0), [ajustesNormalizados]);
  const netoAjustes = totalSumas - totalRestas;

  const depositoCustodiado = contrato.depositoGarantia?.monto ?? contrato.depositoGarantiaMonto ?? 0;
  const saldoPendiente = toSafeNumber(handoverForm.saldoPendiente);
  const maximoAplicableRestas = Math.min(totalRestas, depositoCustodiado);
  const restanteTrasRestas = Math.max(depositoCustodiado - maximoAplicableRestas, 0);
  const maximoAplicableSaldo = Math.min(saldoPendiente, restanteTrasRestas);
  const devolucionSugeridaDeposito = Math.max(restanteTrasRestas - maximoAplicableSaldo, 0);
  const totalSugeridoPagarInquilino = devolucionSugeridaDeposito + totalSumas;

  const runAction = (action: () => Promise<void>, successMessage: string) => {
    startTransition(async () => {
      try {
        await action();
        toast({ title: "Operación realizada", description: successMessage });
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "No se pudo completar la operación del contrato.",
          variant: "destructive",
        });
      }
    });
  };

  const handlePrint = () => {
    window.location.href = `/contrato/${contrato.id}/imprimir`;
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Contrato #{contrato.id}</CardTitle>
            <CardDescription>Gestione renovaciones, cierre y rotación del alquiler.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={contrato.activo ? "default" : "outline"}>{contrato.activo ? "Activo" : "Inactivo"}</Badge>
            <Badge variant={contrato.alertaVencimiento ? "secondary" : "outline"}>
              {contrato.estadoOperacion.replaceAll("_", " ")}
            </Badge>
            <Badge variant="outline">{contrato.estadoRenovacion.replaceAll("_", " ")}</Badge>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              Imprimir
            </Button>
          </div>
        </div>

        {contrato.requiereRenovacion && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Alerta operativa de vencimiento</p>
                <p className="text-sm">
                  {contrato.diasParaVencer !== null && contrato.diasParaVencer >= 0
                    ? `El contrato vence en ${contrato.diasParaVencer} día(s) y ya está dentro del preaviso de ${contrato.preavisoDias} días.`
                    : "El contrato ya superó su fecha fin y necesita renovación o cierre formal."}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Inquilino</CardDescription>
              <CardTitle className="text-lg">{contrato.inquilino}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Identidad: {contrato.inquiliniIdentidad}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Apartamento</CardDescription>
              <CardTitle className="text-lg">#{contrato.apartamento.numero}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{contrato.apartamento.direccion ?? "Sin dirección registrada"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Período contractual</CardDescription>
              <CardTitle className="text-lg">{formatDate(contrato.fechaInicio)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Fin: {formatDate(contrato.fechaFin)}</p>
              <p className="text-sm text-muted-foreground">Preaviso: {contrato.preavisoDias} día(s)</p>
              <p className="text-sm text-muted-foreground">Día de pago: {contrato.diaPagoMensual} de cada mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Renta actual</CardDescription>
              <CardTitle className="text-lg">{formatLempiras(contrato.montoMensual)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Última renovación: {formatDate(contrato.fechaUltimaRenovacion)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <Tabs defaultValue="operacion" className="space-y-4">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 md:grid-cols-5">
            <TabsTrigger value="operacion">Operación</TabsTrigger>
            <TabsTrigger value="renovacion">Renovación</TabsTrigger>
            <TabsTrigger value="inventario">Inventario</TabsTrigger>
            <TabsTrigger value="salida">Salida</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="operacion" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardList className="h-5 w-5" />
                    Habitaciones incluidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contrato.apartamento.habitaciones.map((habitacion) => (
                        <TableRow key={habitacion.id}>
                          <TableCell className="font-medium">{habitacion.tipoHabitacionNombre}</TableCell>
                          <TableCell>{habitacion.cantidad}</TableCell>
                          <TableCell>{habitacion.activo ? "Activa" : "Inactiva"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wallet className="h-5 w-5" />
                    Servicios y cargos operativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Incluido</TableHead>
                        <TableHead>Costo adicional</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contrato.apartamento.servicios.map((servicio) => (
                        <TableRow key={servicio.id}>
                          <TableCell className="font-medium">{servicio.servicioNombre}</TableCell>
                          <TableCell>{servicio.incluido ? "Sí" : "No"}</TableCell>
                          <TableCell>
                            {servicio.costoAdicional > 0 ? formatLempiras(servicio.costoAdicional) : "Sin costo adicional"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reglas del contrato</CardTitle>
              </CardHeader>
              <CardContent>
                {contrato.reglas.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hay reglas asociadas.</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {contrato.reglas.map((regla) => (
                      <li key={regla.id} className="rounded-md border p-2">
                        <p className="font-medium">{regla.nombre}</p>
                        {regla.descripcion && <p className="text-muted-foreground">{regla.descripcion}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-5 w-5" />
                  Depósito de garantía custodiado
                </CardTitle>
                <CardDescription>
                  Ledger del dinero retenido, sus aplicaciones y la evidencia de recepción o liquidación.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <div className="rounded-md border p-3">
                    <p className="text-sm text-muted-foreground">Monto retenido</p>
                    <p className="text-lg font-semibold">{formatLempiras(contrato.depositoGarantia?.monto ?? contrato.depositoGarantiaMonto ?? 0)}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <p className="text-lg font-semibold">{contrato.depositoGarantia?.estado?.replaceAll("_", " ") ?? "PENDIENTE"}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-sm text-muted-foreground">Fecha recepción</p>
                    <p className="text-lg font-semibold">{formatDate(contrato.depositoGarantia?.fechaRecepcion ?? contrato.fechaRecepcionDeposito ?? null)}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-sm text-muted-foreground">Saldo retenido</p>
                    <p className="text-lg font-semibold">{formatLempiras(contrato.depositoGarantia?.saldoRetenido ?? 0)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-md border p-3 text-sm">
                    <p className="text-muted-foreground">Aplicado a daños</p>
                    <p className="font-medium">{formatLempiras(contrato.depositoGarantia?.montoAplicadoDanos ?? 0)}</p>
                  </div>
                  <div className="rounded-md border p-3 text-sm">
                    <p className="text-muted-foreground">Aplicado a saldo pendiente</p>
                    <p className="font-medium">{formatLempiras(contrato.depositoGarantia?.montoAplicadoSaldo ?? 0)}</p>
                  </div>
                  <div className="rounded-md border p-3 text-sm">
                    <p className="text-muted-foreground">Monto devuelto</p>
                    <p className="font-medium">{formatLempiras(contrato.depositoGarantia?.montoDevuelto ?? 0)}</p>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Movimiento</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Descripción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contrato.depositoGarantia?.movimientos.length ? (
                        contrato.depositoGarantia.movimientos.map((movimiento) => (
                          <TableRow key={movimiento.id}>
                            <TableCell>{formatDate(movimiento.fecha)}</TableCell>
                            <TableCell>{movimiento.tipo.replaceAll("_", " ")}</TableCell>
                            <TableCell>{formatLempiras(movimiento.monto)}</TableCell>
                            <TableCell>{movimiento.descripcion ?? "Sin detalle"}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            Aún no hay movimientos registrados para el depósito.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renovacion" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <RefreshCcw className="h-5 w-5" />
                    Flujo de renovación
                  </CardTitle>
                  <CardDescription>
                    Registre alertas, negociación o cierre de la renovación con nuevo período.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fecha de gestión</label>
                      <Input
                        type="date"
                        value={renewalForm.fechaGestion}
                        onChange={(event) => setRenewalForm((current) => ({ ...current, fechaGestion: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estado</label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={renewalForm.estado}
                        onChange={(event) =>
                          setRenewalForm((current) => ({
                            ...current,
                            estado: event.target.value as EstadoRenovacionContrato,
                          }))
                        }
                      >
                        {renewalStateOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Inicio renovado</label>
                      <Input
                        type="date"
                        value={renewalForm.fechaInicioRenovada}
                        onChange={(event) =>
                          setRenewalForm((current) => ({ ...current, fechaInicioRenovada: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fin renovado</label>
                      <Input
                        type="date"
                        value={renewalForm.fechaFinRenovada}
                        onChange={(event) => setRenewalForm((current) => ({ ...current, fechaFinRenovada: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Nuevo monto mensual</label>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={renewalForm.montoNuevo}
                        onChange={(event) => setRenewalForm((current) => ({ ...current, montoNuevo: event.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notas</label>
                    <textarea
                      className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Condiciones negociadas, observaciones, motivo de no renovación, etc."
                      value={renewalForm.notas}
                      onChange={(event) => setRenewalForm((current) => ({ ...current, notas: event.target.value }))}
                    />
                  </div>
                  <Button
                    onClick={() =>
                      runAction(
                        () =>
                          registrarRenovacionContrato({
                            contratoId: contrato.id,
                            fechaGestion: renewalForm.fechaGestion,
                            fechaInicioRenovada: renewalForm.fechaInicioRenovada,
                            fechaFinRenovada: renewalForm.fechaFinRenovada || undefined,
                            montoNuevo: Number(renewalForm.montoNuevo),
                            estado: renewalForm.estado,
                            notas: renewalForm.notas,
                          }),
                        "La gestión de renovación se registró correctamente.",
                      )
                    }
                    disabled={isPending}
                  >
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                    Guardar renovación
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PencilLine className="h-5 w-5" />
                    Ajuste de renta
                  </CardTitle>
                  <CardDescription>Registre incrementos o descuentos sin necesidad de renovar aún.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha de aplicación</label>
                    <Input
                      type="date"
                      value={rentForm.fechaAplicacion}
                      onChange={(event) => setRentForm((current) => ({ ...current, fechaAplicacion: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nuevo monto mensual</label>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={rentForm.montoNuevo}
                      onChange={(event) => setRentForm((current) => ({ ...current, montoNuevo: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Motivo</label>
                    <textarea
                      className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="IPC, mercado, mejora del inmueble, descuento temporal, etc."
                      value={rentForm.motivo}
                      onChange={(event) => setRentForm((current) => ({ ...current, motivo: event.target.value }))}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      runAction(
                        () =>
                          registrarAjusteRentaContrato({
                            contratoId: contrato.id,
                            fechaAplicacion: rentForm.fechaAplicacion,
                            montoNuevo: Number(rentForm.montoNuevo),
                            motivo: rentForm.motivo,
                          }),
                        "El ajuste de renta fue registrado.",
                      )
                    }
                    disabled={isPending}
                  >
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-4 w-4" />}
                    Guardar ajuste
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historial de renovaciones y ajustes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Renovaciones</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Nuevo fin</TableHead>
                        <TableHead>Monto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contrato.renovaciones.length > 0 ? (
                        contrato.renovaciones.map((renovacion) => (
                          <TableRow key={renovacion.id}>
                            <TableCell>{formatDate(renovacion.fechaGestion)}</TableCell>
                            <TableCell>{renovacion.estado.replaceAll("_", " ")}</TableCell>
                            <TableCell>{formatDate(renovacion.fechaFinRenovada)}</TableCell>
                            <TableCell>{formatLempiras(renovacion.montoNuevo)}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4}>Sin renovaciones registradas.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Ajustes de renta</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aplicación</TableHead>
                        <TableHead>Anterior</TableHead>
                        <TableHead>Nuevo</TableHead>
                        <TableHead>%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contrato.ajustesRenta.length > 0 ? (
                        contrato.ajustesRenta.map((ajuste) => (
                          <TableRow key={ajuste.id}>
                            <TableCell>{formatDate(ajuste.fechaAplicacion)}</TableCell>
                            <TableCell>{formatLempiras(ajuste.montoAnterior)}</TableCell>
                            <TableCell>{formatLempiras(ajuste.montoNuevo)}</TableCell>
                            <TableCell>{ajuste.porcentajeAjuste.toFixed(2)}%</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4}>Sin ajustes de renta registrados.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventario" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {(["ENTRADA", "SALIDA"] as TipoInventarioContrato[]).map((type) => (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle>{inventoryTypeLabels[type]}</CardTitle>
                    <CardDescription>
                      Registre en una línea por ítem el estado de entrega y devolución del inmueble.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fecha de registro</label>
                      <Input
                        type="date"
                        value={inventoryForm[type].fechaRegistro}
                        onChange={(event) =>
                          setInventoryForm((current) => ({
                            ...current,
                            [type]: { ...current[type], fechaRegistro: event.target.value },
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ítems</label>
                      <textarea
                        className="min-h-40 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Ej: Juego de llaves completo&#10;Pared sin humedad&#10;Medidor de agua funcionando"
                        value={inventoryForm[type].itemsText}
                        onChange={(event) =>
                          setInventoryForm((current) => ({
                            ...current,
                            [type]: { ...current[type], itemsText: event.target.value },
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Observaciones</label>
                      <textarea
                        className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={inventoryForm[type].observaciones}
                        onChange={(event) =>
                          setInventoryForm((current) => ({
                            ...current,
                            [type]: { ...current[type], observaciones: event.target.value },
                          }))
                        }
                      />
                    </div>
                    <Button
                      variant="outline"
                      disabled={isPending}
                      onClick={() =>
                        runAction(
                          () =>
                            registrarInventarioContrato({
                              contratoId: contrato.id,
                              tipo: type,
                              fechaRegistro: inventoryForm[type].fechaRegistro,
                              observaciones: inventoryForm[type].observaciones,
                              items: inventoryForm[type].itemsText.split("\n"),
                            }),
                          `${inventoryTypeLabels[type]} guardado correctamente.`,
                        )
                      }
                    >
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ClipboardList className="mr-2 h-4 w-4" />}
                      Guardar inventario
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="salida" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DoorOpen className="h-5 w-5" />
                    Entrega del inmueble y cierre
                  </CardTitle>
                  <CardDescription>
                    Cerrar la ocupación libera el apartamento, registra daños y conserva el motivo de cancelación.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fecha de entrega</label>
                      <Input
                        type="date"
                        value={handoverForm.fechaEntrega}
                        onChange={(event) => setHandoverForm((current) => ({ ...current, fechaEntrega: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estado del inmueble</label>
                      <Input
                        value={handoverForm.estadoInmueble}
                        onChange={(event) => setHandoverForm((current) => ({ ...current, estadoInmueble: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Saldo pendiente</label>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={handoverForm.saldoPendiente}
                        onChange={(event) => setHandoverForm((current) => ({ ...current, saldoPendiente: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Depósito devuelto</label>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={handoverForm.depositoDevuelto}
                        onChange={(event) => setHandoverForm((current) => ({ ...current, depositoDevuelto: event.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Devolución sugerida de depósito: {formatLempiras(devolucionSugeridaDeposito)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total sugerido a pagar al inquilino: {formatLempiras(totalSugeridoPagarInquilino)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recibo de liquidación</label>
                      <Input
                        value={handoverForm.reciboLiquidacion}
                        onChange={(event) => setHandoverForm((current) => ({ ...current, reciboLiquidacion: event.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Ítems de liquidación (suma / resta)</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAjustesLiquidacion((current) => [...current, { concepto: "", monto: "0", tipo: "RESTA" }])}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar ítem
                      </Button>
                    </div>
                    {ajustesLiquidacion.map((item, index) => (
                      <div key={`deduccion-${index}`} className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_auto]">
                        <Input
                          placeholder="Ej: Pintura (resta) / Reintegro por días no usados (suma)"
                          value={item.concepto}
                          onChange={(event) =>
                            setAjustesLiquidacion((current) =>
                              current.map((currentItem, currentIndex) =>
                                currentIndex === index ? { ...currentItem, concepto: event.target.value } : currentItem,
                              ),
                            )
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                            value={item.tipo}
                            onChange={(event) =>
                              setAjustesLiquidacion((current) =>
                                current.map((currentItem, currentIndex) =>
                                  currentIndex === index ? { ...currentItem, tipo: event.target.value as TipoAjusteLiquidacion } : currentItem,
                                ),
                              )
                            }
                          >
                            <option value="RESTA">Resta</option>
                            <option value="SUMA">Suma</option>
                          </select>
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={item.monto}
                            onChange={(event) =>
                              setAjustesLiquidacion((current) =>
                                current.map((currentItem, currentIndex) =>
                                  currentIndex === index ? { ...currentItem, monto: event.target.value } : currentItem,
                                ),
                              )
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={ajustesLiquidacion.length <= 1}
                          onClick={() =>
                            setAjustesLiquidacion((current) => current.filter((_, currentIndex) => currentIndex !== index))
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">Total restas</p>
                        <p className="font-semibold">{formatLempiras(totalRestas)}</p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">Total sumas</p>
                        <p className="font-semibold">{formatLempiras(totalSumas)}</p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">Neto ajustes (suma - resta)</p>
                        <p className="font-semibold">{formatLempiras(netoAjustes)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Observación del depósito</label>
                    <textarea
                      className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Conciliación final: daños, saldos, devolución y soporte legal."
                      value={handoverForm.observacionDeposito}
                      onChange={(event) =>
                        setHandoverForm((current) => ({ ...current, observacionDeposito: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Motivo de cancelación</label>
                    <textarea
                      className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Mudanza, mora, venta de unidad, decisión del inquilino, etc."
                      value={handoverForm.motivoCancelacion}
                      onChange={(event) =>
                        setHandoverForm((current) => ({ ...current, motivoCancelacion: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Observaciones de entrega</label>
                    <textarea
                      className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={handoverForm.observaciones}
                      onChange={(event) => setHandoverForm((current) => ({ ...current, observaciones: event.target.value }))}
                    />
                  </div>
                  <Button
                    disabled={isPending}
                    onClick={() =>
                      runAction(
                        () =>
                          registrarEntregaContrato({
                            contratoId: contrato.id,
                            fechaEntrega: handoverForm.fechaEntrega,
                            estadoInmueble: handoverForm.estadoInmueble,
                            cargosDanos: totalRestas,
                            saldoPendiente: Number(handoverForm.saldoPendiente),
                            ajustesLiquidacion: ajustesNormalizados,
                            depositoDevuelto: Number(handoverForm.depositoDevuelto),
                            reciboLiquidacion: handoverForm.reciboLiquidacion,
                            observacionDeposito: handoverForm.observacionDeposito,
                            motivoCancelacion: handoverForm.motivoCancelacion,
                            observaciones: handoverForm.observaciones,
                          }),
                        "La entrega del inmueble fue registrada y el apartamento quedó liberado.",
                      )
                    }
                  >
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DoorOpen className="mr-2 h-4 w-4" />}
                    Registrar entrega
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumen de cierre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Fecha de desocupación</span>
                    <span className="font-medium">{formatDate(contrato.fechaDesocupacion)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Motivo de cancelación</span>
                    <span className="font-medium">{contrato.entrega?.motivoCancelacion ?? contrato.motivoCancelacion ?? "Sin registrar"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Cargos por daños</span>
                    <span className="font-medium">{formatLempiras(contrato.entrega?.cargosDanos ?? 0)}</span>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="mb-2 text-muted-foreground">Desglose de liquidación</p>
                    {contrato.entrega?.ajustesLiquidacion?.length ? (
                      <div className="space-y-1">
                        {contrato.entrega.ajustesLiquidacion.map((item, index) => (
                          <div key={`${item.concepto}-${index}`} className="flex items-center justify-between text-sm">
                            <span>{item.tipo === "SUMA" ? "Suma" : "Resta"} · {item.concepto}</span>
                            <span className="font-medium">{formatLempiras(item.monto)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">Sin ítems detallados.</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Saldo pendiente</span>
                    <span className="font-medium">{formatLempiras(contrato.entrega?.saldoPendiente ?? 0)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Depósito custodiado</span>
                    <span className="font-medium">{formatLempiras(contrato.depositoGarantia?.monto ?? contrato.depositoGarantiaMonto ?? 0)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Devolución de depósito</span>
                    <span className="font-medium">{formatLempiras(contrato.depositoGarantia?.montoDevuelto ?? 0)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-muted-foreground">Retención pendiente</span>
                    <span className="font-medium">{formatLempiras(contrato.depositoGarantia?.saldoRetenido ?? 0)}</span>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="mb-1 text-muted-foreground">Recibos legales de depósito</p>
                    <p>Recepción: {contrato.depositoGarantia?.reciboRecepcion ?? "Sin recibo"}</p>
                    <p>Liquidación: {contrato.depositoGarantia?.reciboLiquidacion ?? "Sin recibo"}</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="mb-1 text-muted-foreground">Observaciones</p>
                    <p>{contrato.entrega?.observaciones ?? contrato.notasCierre ?? "Sin observaciones registradas."}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="h-5 w-5" />
                  Historial de ocupación por apartamento
                </CardTitle>
                <CardDescription>
                  Traza completa de quién ocupó la unidad, duración, cierre y rentas administradas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Inquilino</TableHead>
                      <TableHead>Inicio</TableHead>
                      <TableHead>Fin</TableHead>
                      <TableHead>Desocupación</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Renta</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contrato.apartamento.historialOcupacion.map((item) => (
                      <TableRow key={item.contratoId}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.inquilino}</p>
                            <p className="text-xs text-muted-foreground">{item.motivoCancelacion ?? "Sin motivo de cancelación"}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(item.fechaInicio)}</TableCell>
                        <TableCell>{formatDate(item.fechaFin)}</TableCell>
                        <TableCell>{formatDate(item.fechaDesocupacion)}</TableCell>
                        <TableCell>
                          <Badge variant={item.estadoOperacion === "VENCIDO" ? "destructive" : "outline"}>
                            {item.estadoOperacion.replaceAll("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatLempiras(item.montoMensual)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
