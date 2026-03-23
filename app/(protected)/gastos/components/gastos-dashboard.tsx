"use client";

import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowDownRight, ArrowUpRight, PencilLine, Plus } from "lucide-react";
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

import { createGasto, GastosModuleData, GastoFormInput, GastoListItem, updateGasto } from "../actions";
import { categoriaOptions } from "../constants";

const currencyFormatter = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
  maximumFractionDigits: 2,
});

const defaultForm: GastoFormInput = {
  apartamentoId: "",
  fecha: format(new Date(), "yyyy-MM-dd"),
  categoria: "MANTENIMIENTO",
  concepto: "",
  descripcion: "",
  monto: 0,
  extraordinario: false,
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

function GastoFormDialog({
  apartamentos,
  canCreate,
  canEdit,
  editingItem,
  onClose,
}: {
  apartamentos: GastosModuleData["apartamentos"];
  canCreate: boolean;
  canEdit: boolean;
  editingItem?: GastoListItem | null;
  onClose?: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<GastoFormInput>(() =>
    editingItem
      ? {
          id: editingItem.id,
          apartamentoId: editingItem.apartamentoId,
          fecha: format(new Date(editingItem.fecha), "yyyy-MM-dd"),
          categoria: editingItem.categoria,
          concepto: editingItem.concepto,
          descripcion: editingItem.descripcion ?? "",
          monto: editingItem.monto,
          extraordinario: editingItem.extraordinario,
        }
      : defaultForm
  );

  const isEditing = Boolean(editingItem);
  const allowed = isEditing ? canEdit : canCreate;

  const resetForm = () => {
    setForm(
      editingItem
        ? {
            id: editingItem.id,
            apartamentoId: editingItem.apartamentoId,
            fecha: format(new Date(editingItem.fecha), "yyyy-MM-dd"),
            categoria: editingItem.categoria,
            concepto: editingItem.concepto,
            descripcion: editingItem.descripcion ?? "",
            monto: editingItem.monto,
            extraordinario: editingItem.extraordinario,
          }
        : defaultForm
    );
  };

  const submit = () => {
    if (!allowed) return;

    startTransition(async () => {
      try {
        const payload = {
          ...form,
          fecha: new Date(`${form.fecha}T00:00:00`).toISOString(),
          monto: Number(form.monto),
        };

        if (isEditing) {
          await updateGasto(payload);
        } else {
          await createGasto(payload);
        }

        toast({
          title: isEditing ? "Gasto actualizado" : "Gasto registrado",
          description: isEditing
            ? "El egreso quedó actualizado correctamente."
            : "El egreso se guardó correctamente.",
        });
        setOpen(false);
        resetForm();
        onClose?.();
        router.refresh();
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "No se pudo guardar el gasto.",
          variant: "destructive",
        });
      }
    });
  };

  if (!allowed) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              Registrar gasto
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar gasto" : "Registrar egreso operativo"}</DialogTitle>
          <DialogDescription>
            Registre costos reales por propiedad para medir la utilidad neta de cada apartamento.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Fecha</Label>
              <Input type="date" value={form.fecha} onChange={(e) => setForm((current) => ({ ...current, fecha: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Categoría</Label>
              <Select value={form.categoria} onValueChange={(value) => setForm((current) => ({ ...current, categoria: value as GastoFormInput["categoria"] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoriaOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Concepto</Label>
            <Input value={form.concepto} onChange={(e) => setForm((current) => ({ ...current, concepto: e.target.value }))} placeholder="Ej. reparación de aire acondicionado" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Monto</Label>
              <Input type="number" min="0" step="0.01" value={form.monto || ""} onChange={(e) => setForm((current) => ({ ...current, monto: Number(e.target.value) }))} />
            </div>
            <div className="grid gap-2">
              <Label>Detalle / nota</Label>
              <Input value={form.descripcion ?? ""} onChange={(e) => setForm((current) => ({ ...current, descripcion: e.target.value }))} placeholder="Proveedor, factura o comentario" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">¿Es un gasto extraordinario?</p>
              <p className="text-sm text-muted-foreground">Útil para separar remodelaciones o eventos no recurrentes.</p>
            </div>
            <Switch checked={Boolean(form.extraordinario)} onCheckedChange={(checked) => setForm((current) => ({ ...current, extraordinario: checked }))} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => { setOpen(false); onClose?.(); }} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isEditing ? "Guardar cambios" : "Registrar gasto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function GastosDashboard({ data, canCreate, canEdit }: { data: GastosModuleData; canCreate: boolean; canEdit: boolean }) {
  const topConsumer = useMemo(
    () => data.rentabilidadPorApartamento.reduce<GastosModuleData["rentabilidadPorApartamento"][number] | null>((max, item) => {
      if (!max || item.gastosMes > max.gastosMes) return item;
      return max;
    }, null),
    [data.rentabilidadPorApartamento]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Rentabilidad real por propiedad</h2>
          <p className="text-sm text-muted-foreground">
            Corte del mes de {data.metadata.mesActual}. Aquí compara ingresos del mes contra egresos reales registrados por apartamento.
          </p>
        </div>
        <GastoFormDialog apartamentos={data.apartamentos} canCreate={canCreate} canEdit={canEdit} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard title="Ingresos del mes" value={currencyFormatter.format(data.resumen.ingresosMes)} subtitle="Facturación del mes asociada a contratos/recibos." />
        <SummaryCard title="Gastos del mes" value={currencyFormatter.format(data.resumen.gastosMes)} subtitle="Egresos operativos reales capturados en el módulo." />
        <SummaryCard title="Utilidad neta" value={currencyFormatter.format(data.resumen.utilidadMes)} subtitle="Ingresos menos egresos del período actual." />
        <SummaryCard title="Propiedades rentables" value={data.resumen.propiedadesRentables.toString()} subtitle="Apartamentos con utilidad positiva en el mes." />
        <SummaryCard title="Propiedades con pérdida" value={data.resumen.propiedadesConPerdida.toString()} subtitle="Unidades que consumen más de lo que generan." />
        <SummaryCard title="Gasto promedio" value={currencyFormatter.format(data.resumen.gastoPromedio)} subtitle="Promedio por registro de gasto del mes." />
      </div>

      {topConsumer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Propiedad que más consume dinero</CardTitle>
            <CardDescription>
              Apartamento {topConsumer.apartamento} acumula el mayor gasto del mes.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Gastos</p>
              <p className="text-xl font-semibold">{currencyFormatter.format(topConsumer.gastosMes)}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Ingresos</p>
              <p className="text-xl font-semibold">{currencyFormatter.format(topConsumer.ingresosMes)}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Utilidad</p>
              <p className="text-xl font-semibold">{currencyFormatter.format(topConsumer.utilidadMes)}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Registros</p>
              <p className="text-xl font-semibold">{topConsumer.gastoCount}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ranking de rentabilidad por apartamento</CardTitle>
          <CardDescription>
            Responde cuáles apartamentos dejan más utilidad y cuáles conviene revisar, remodelar o incluso desinvertir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.rentabilidadPorApartamento.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay apartamentos activos para calcular rentabilidad.</p>
          ) : (
            data.rentabilidadPorApartamento.map((item) => (
              <div key={item.apartamentoId} className="rounded-lg border p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">Apartamento {item.apartamento}</p>
                      <Badge variant={item.disponible ? "secondary" : "destructive"}>
                        {item.disponible ? "Operativo" : "No disponible"}
                      </Badge>
                      {item.gastosMes > item.ingresosMes && <Badge variant="destructive">Pérdida</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.inquilino}</p>
                    {item.direccion && <p className="text-xs text-muted-foreground">{item.direccion}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.utilidadMes >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-lg font-semibold">{currencyFormatter.format(item.utilidadMes)}</span>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Ingresos del mes</p>
                    <p className="font-semibold">{currencyFormatter.format(item.ingresosMes)}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Gastos del mes</p>
                    <p className="font-semibold">{currencyFormatter.format(item.gastosMes)}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Margen</p>
                    <p className="font-semibold">{item.margen.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Registros de gasto</p>
                    <p className="font-semibold">{item.gastoCount}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historial reciente de egresos</CardTitle>
          <CardDescription>
            Últimos registros cargados por propiedad para trazabilidad operativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.gastosRecientes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no hay gastos registrados. Empiece cargando mantenimiento, reparaciones, servicios, impuestos o comisiones.</p>
          ) : (
            data.gastosRecientes.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">Apartamento {item.apartamento}</p>
                    <Badge variant="outline">{item.categoriaLabel}</Badge>
                    {item.extraordinario && <Badge variant="destructive">Extraordinario</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.concepto}</p>
                  {item.descripcion && <p className="text-xs text-muted-foreground">{item.descripcion}</p>}
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(item.fecha), "dd 'de' MMMM yyyy", { locale: es })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{currencyFormatter.format(item.monto)}</span>
                  <GastoFormDialog
                    apartamentos={data.apartamentos}
                    canCreate={canCreate}
                    canEdit={canEdit}
                    editingItem={item}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
