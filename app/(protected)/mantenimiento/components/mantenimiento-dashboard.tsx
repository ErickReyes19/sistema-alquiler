"use client";

import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PencilLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import {
  createMaintenance,
  MaintenanceFormInput,
  MaintenanceListItem,
  MaintenanceModuleData,
  updateMaintenance,
} from "../actions";
import {
  maintenanceOriginOptions,
  maintenanceStatusOptions,
  maintenanceTypeOptions,
} from "../constants";

const currencyFormatter = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
  maximumFractionDigits: 2,
});

const defaultForm: MaintenanceFormInput = {
  apartamentoId: "",
  tipo: "TICKET",
  origen: "ADMINISTRACION",
  titulo: "",
  descripcion: "",
  proveedorAsignado: "",
  costoEstimado: 0,
  costoReal: undefined,
  fechaReporte: format(new Date(), "yyyy-MM-dd"),
  fechaAtencion: "",
  afectaDisponibilidad: false,
  estado: "REPORTADO",
};

const statusVariant: Record<MaintenanceListItem["estado"], "outline" | "default" | "secondary"> = {
  REPORTADO: "outline",
  EN_PROCESO: "default",
  RESUELTO: "secondary",
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

function MantenimientoFormDialog({
  apartamentos,
  canCreate,
  canEdit,
  editingItem,
}: {
  apartamentos: MaintenanceModuleData["apartamentos"];
  canCreate: boolean;
  canEdit: boolean;
  editingItem?: MaintenanceListItem | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const buildForm = (): MaintenanceFormInput =>
    editingItem
      ? {
          id: editingItem.id,
          apartamentoId: editingItem.apartamentoId,
          tipo: editingItem.tipo,
          origen: editingItem.origen,
          titulo: editingItem.titulo,
          descripcion: editingItem.descripcion,
          proveedorAsignado: editingItem.proveedorAsignado ?? "",
          costoEstimado: editingItem.costoEstimado,
          costoReal: editingItem.costoReal,
          fechaReporte: format(new Date(editingItem.fechaReporte), "yyyy-MM-dd"),
          fechaAtencion: editingItem.fechaAtencion ? format(new Date(editingItem.fechaAtencion), "yyyy-MM-dd") : "",
          afectaDisponibilidad: editingItem.afectaDisponibilidad,
          estado: editingItem.estado,
        }
      : defaultForm;

  const [form, setForm] = useState<MaintenanceFormInput>(buildForm);
  const isEditing = Boolean(editingItem);
  const allowed = isEditing ? canEdit : canCreate;

  const resetForm = () => setForm(buildForm());

  const submit = () => {
    if (!allowed) return;

    startTransition(async () => {
      try {
        const payload: MaintenanceFormInput = {
          ...form,
          costoEstimado: Number(form.costoEstimado ?? 0),
          costoReal:
            form.costoReal === undefined || form.costoReal === null || Number(form.costoReal) === 0
              ? form.costoReal === 0
                ? 0
                : undefined
              : Number(form.costoReal),
          fechaReporte: new Date(`${form.fechaReporte}T00:00:00`).toISOString(),
          fechaAtencion: form.fechaAtencion
            ? new Date(`${form.fechaAtencion}T00:00:00`).toISOString()
            : undefined,
        };

        if (isEditing) {
          await updateMaintenance(payload);
        } else {
          await createMaintenance(payload);
        }

        toast({
          title: isEditing ? "Incidencia actualizada" : "Incidencia registrada",
          description: isEditing
            ? "El mantenimiento quedó actualizado correctamente."
            : "La incidencia se guardó correctamente.",
        });
        setOpen(false);
        resetForm();
        router.refresh();
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "No se pudo guardar la incidencia.",
          variant: "destructive",
        });
      }
    });
  };

  if (!allowed) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant={isEditing ? "outline" : "default"} size={isEditing ? "sm" : "default"}>
          {isEditing ? (
            <>
              <PencilLine className="mr-2 h-4 w-4" />
              Editar
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Registrar incidencia
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar mantenimiento/incidencia" : "Registrar mantenimiento o incidencia"}</DialogTitle>
          <DialogDescription>
            Centralice tickets, daños, preventivos y correctivos por apartamento, sin perder trazabilidad del tenant.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Apartamento</Label>
              <Select value={form.apartamentoId} onValueChange={(value) => setForm((current) => ({ ...current, apartamentoId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un apartamento" />
                </SelectTrigger>
                <SelectContent>
                  {apartamentos.map((apartamento) => (
                    <SelectItem key={apartamento.id} value={apartamento.id}>
                      Apartamento {apartamento.numero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <Select value={form.estado} onValueChange={(value) => setForm((current) => ({ ...current, estado: value as MaintenanceFormInput["estado"] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Tipo</Label>
              <Select value={form.tipo} onValueChange={(value) => setForm((current) => ({ ...current, tipo: value as MaintenanceFormInput["tipo"] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Origen</Label>
              <Select value={form.origen} onValueChange={(value) => setForm((current) => ({ ...current, origen: value as MaintenanceFormInput["origen"] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un origen" />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceOriginOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Título del ticket</Label>
            <Input value={form.titulo} onChange={(e) => setForm((current) => ({ ...current, titulo: e.target.value }))} placeholder="Ej. fuga en baño principal" />
          </div>

          <div className="grid gap-2">
            <Label>Descripción</Label>
            <textarea
              className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              value={form.descripcion}
              onChange={(e) => setForm((current) => ({ ...current, descripcion: e.target.value }))}
              placeholder="Explique qué ocurrió, alcance, materiales, riesgos y seguimiento."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Proveedor asignado</Label>
              <Input value={form.proveedorAsignado ?? ""} onChange={(e) => setForm((current) => ({ ...current, proveedorAsignado: e.target.value }))} placeholder="Nombre del técnico o empresa" />
            </div>
            <div className="grid gap-2">
              <Label>Fecha de atención</Label>
              <Input type="date" value={form.fechaAtencion ?? ""} onChange={(e) => setForm((current) => ({ ...current, fechaAtencion: e.target.value }))} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Fecha de reporte</Label>
              <Input type="date" value={form.fechaReporte} onChange={(e) => setForm((current) => ({ ...current, fechaReporte: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Costo estimado</Label>
              <Input type="number" min="0" step="0.01" value={form.costoEstimado ?? ""} onChange={(e) => setForm((current) => ({ ...current, costoEstimado: Number(e.target.value) }))} />
            </div>
            <div className="grid gap-2">
              <Label>Costo real</Label>
              <Input type="number" min="0" step="0.01" value={form.costoReal ?? ""} onChange={(e) => setForm((current) => ({ ...current, costoReal: e.target.value ? Number(e.target.value) : undefined }))} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">¿Saca la unidad de servicio?</p>
              <p className="text-sm text-muted-foreground">Actívelo solo si el apartamento realmente no puede ocuparse o usarse por mantenimiento.</p>
            </div>
            <Switch checked={Boolean(form.afectaDisponibilidad)} onCheckedChange={(checked) => setForm((current) => ({ ...current, afectaDisponibilidad: checked }))} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isEditing ? "Guardar cambios" : "Registrar incidencia"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MantenimientoDashboard({
  data,
  canCreate,
  canEdit,
}: {
  data: MaintenanceModuleData;
  canCreate: boolean;
  canEdit: boolean;
}) {
  const topOpen = useMemo(
    () => data.incidencias.find((item) => item.estado !== "RESUELTO") ?? null,
    [data.incidencias]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Operación del activo y resolución de incidencias</h2>
          <p className="text-sm text-muted-foreground">
            Corte del mes de {data.metadata.mesActual}. Este módulo centraliza tickets, daños, preventivos, correctivos, proveedores y costos por propiedad.
          </p>
        </div>
        <MantenimientoFormDialog apartamentos={data.apartamentos} canCreate={canCreate} canEdit={canEdit} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Tickets reportados" value={data.resumen.abiertas.toString()} subtitle="Incidencias nuevas pendientes de atención." />
        <SummaryCard title="En proceso" value={data.resumen.enProceso.toString()} subtitle="Casos con proveedor o atención en curso." />
        <SummaryCard title="Resueltas en el mes" value={data.resumen.resueltasMes.toString()} subtitle="Trabajos cerrados durante el período actual." />
        <SummaryCard title="Fuera de servicio" value={data.resumen.unidadesFueraServicio.toString()} subtitle="Unidades realmente bloqueadas por mantenimiento." />
        <SummaryCard title="Preventivos" value={data.resumen.preventivos.toString()} subtitle="Acciones para evitar fallas futuras." />
        <SummaryCard title="Correctivos" value={data.resumen.correctivos.toString()} subtitle="Reparaciones y daños ya ocurridos." />
        <SummaryCard title="Costo estimado abierto" value={currencyFormatter.format(data.resumen.costoEstimadoAbierto)} subtitle="Compromiso económico aún no resuelto." />
        <SummaryCard title="Costo real del mes" value={currencyFormatter.format(data.resumen.costoRealMes)} subtitle="Dinero efectivamente consumido al atender casos." />
      </div>

      {topOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Caso operativo prioritario</CardTitle>
            <CardDescription>
              Apartamento {topOpen.apartamento} · {topOpen.titulo}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Estado</p>
              <p className="text-xl font-semibold">{topOpen.estadoLabel}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Proveedor</p>
              <p className="text-xl font-semibold">{topOpen.proveedorAsignado || "Pendiente"}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Costo estimado</p>
              <p className="text-xl font-semibold">{currencyFormatter.format(topOpen.costoEstimado)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bitácora de mantenimiento e incidencias</CardTitle>
          <CardDescription>
            Cada registro conserva apartamento, origen, tipo, proveedor, costos y fecha de atención.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.incidencias.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no hay incidencias registradas. Empiece cargando tickets, daños reportados, preventivos o correctivos por apartamento.
            </p>
          ) : (
            data.incidencias.map((item) => (
              <div key={item.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">Apartamento {item.apartamento}</p>
                      <Badge variant={statusVariant[item.estado]}>{item.estadoLabel}</Badge>
                      <Badge variant="outline">{item.tipoLabel}</Badge>
                      <Badge variant="outline">Origen: {item.origenLabel}</Badge>
                      {item.afectaDisponibilidad && item.estado !== "RESUELTO" && (
                        <Badge variant="destructive">Fuera de servicio</Badge>
                      )}
                    </div>
                    <p className="text-base font-medium">{item.titulo}</p>
                    <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Reportado: {format(new Date(item.fechaReporte), "dd 'de' MMM yyyy", { locale: es })}</span>
                      <span>Atención: {item.fechaAtencion ? format(new Date(item.fechaAtencion), "dd 'de' MMM yyyy", { locale: es }) : "Pendiente"}</span>
                      <span>Proveedor: {item.proveedorAsignado || "Sin asignar"}</span>
                      {item.inquilino && <span>Inquilino vinculado: {item.inquilino}</span>}
                      {item.direccion && <span>{item.direccion}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Estimado / real</p>
                      <p className="font-semibold">
                        {currencyFormatter.format(item.costoEstimado)} / {currencyFormatter.format(item.costoReal)}
                      </p>
                    </div>
                    <MantenimientoFormDialog apartamentos={data.apartamentos} canCreate={canCreate} canEdit={canEdit} editingItem={item} />
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Costo estimado</p>
                    <p className="font-semibold">{currencyFormatter.format(item.costoEstimado)}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Costo real</p>
                    <p className="font-semibold">{currencyFormatter.format(item.costoReal)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
