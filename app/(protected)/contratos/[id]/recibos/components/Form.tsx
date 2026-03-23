"use client";

import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import { ReciboSchema } from "../schema";
import type { Recibo, ReciboDetalle } from "../type";
import { postReciboConDetalles, putReciboConDetalles } from "../actions";

interface FormularioReciboProps {
  isUpdate: boolean;
  initialData?: Partial<Recibo> & { detalles: ReciboDetalle[]; montoMensual?: number };
  contratoId: string;
}

function formatDateForInput(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export default function FormularioRecibo({
  isUpdate,
  contratoId,
  initialData,
}: FormularioReciboProps) {
  const { toast } = useToast();
  const router = useRouter();

  const fechaEmision = initialData?.fechaPago ? new Date(initialData.fechaPago) : new Date();
  const fechaVencimiento = initialData?.fechaVencimiento
    ? new Date(initialData.fechaVencimiento)
    : addDays(new Date(), 5);

  const form = useForm<z.infer<typeof ReciboSchema>>({
    resolver: zodResolver(ReciboSchema),
    defaultValues: {
      contratoId,
      fechaPago: fechaEmision,
      fechaVencimiento,
      total: initialData?.total ?? 0,
      cargoMora: initialData?.cargoMora ?? 0,
      saldoPendiente: initialData?.saldoPendiente ?? 0,
      estado: initialData?.estado ?? "PENDIENTE",
      observacionesCobranza: initialData?.observacionesCobranza ?? "",
      detalles: initialData?.detalles ?? [],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, setValue } = form;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "detalles",
  });

  useEffect(() => {
    if (!initialData) return;

    const baseReciboId = isUpdate ? initialData.id! : "";
    const detallesParsed = (initialData.detalles || []).map((d) => ({
      ...(d.id ? { id: d.id } : {}),
      descripcion: d.descripcion,
      monto: Number(d.monto),
      reciboId: baseReciboId,
    }));

    replace(detallesParsed);
  }, [initialData, isUpdate, replace]);

  const detalles = useWatch({ control, name: "detalles" });
  const cargoMora = useWatch({ control, name: "cargoMora" });

  useEffect(() => {
    const total = Array.isArray(detalles)
      ? detalles.reduce((sum, d) => sum + (Number(d.monto) || 0), 0)
      : 0;

    const saldoPendiente = total + (Number(cargoMora) || 0);

    setValue("total", total, { shouldValidate: true, shouldDirty: true });
    setValue("saldoPendiente", saldoPendiente, { shouldValidate: true, shouldDirty: true });
  }, [cargoMora, detalles, setValue]);

  const onSubmit = async (data: z.infer<typeof ReciboSchema>) => {
    try {
      const reciboPayload = {
        id: isUpdate ? initialData?.id ?? "" : data.id!,
        contratoId: data.contratoId,
        fechaPago: data.fechaPago.toISOString(),
        fechaVencimiento: data.fechaVencimiento.toISOString(),
        total: data.total,
        cargoMora: data.cargoMora,
        saldoPendiente: data.saldoPendiente,
        estado: data.estado,
        observacionesCobranza: data.observacionesCobranza,
      };

      const detallesPayload = data.detalles.map((d) => ({
        id: d.id,
        reciboId: isUpdate ? data.id! : "",
        descripcion: d.descripcion,
        monto: d.monto,
      }));

      const result = isUpdate
        ? await putReciboConDetalles({ recibo: reciboPayload, detalles: detallesPayload })
        : await postReciboConDetalles({ recibo: reciboPayload, detalles: detallesPayload });

      if (!result) {
        throw new Error("No fue posible guardar el recibo.");
      }

      toast({
        title: isUpdate ? "Recibo actualizado" : "Recibo creado",
        description: "La información de cobranza fue guardada correctamente.",
      });
      router.push(`/contratos/${contratoId}/recibos`);
      router.refresh();
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const totalPreview = form.watch("total") || 0;
  const saldoPreview = form.watch("saldoPendiente") || 0;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-md border p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="fechaPago"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de emisión</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? formatDateForInput(field.value) : ""}
                    onChange={(e) => field.onChange(new Date(`${e.target.value}T00:00:00`))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="fechaVencimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de vencimiento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? formatDateForInput(field.value) : ""}
                    onChange={(e) => field.onChange(new Date(`${e.target.value}T00:00:00`))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={control}
            name="cargoMora"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recargo por mora</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total facturado</FormLabel>
                <FormControl>
                  <Input readOnly value={Number(field.value || 0).toFixed(2)} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="saldoPendiente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saldo inicial</FormLabel>
                <FormControl>
                  <Input readOnly value={Number(field.value || 0).toFixed(2)} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span>Estado estimado al crear:</span>
            <Badge variant="outline">{saldoPreview <= 0 ? "PAGADO" : "PENDIENTE"}</Badge>
          </div>
          <p className="mt-2">Total facturado: L. {totalPreview.toFixed(2)} · Saldo con mora: L. {saldoPreview.toFixed(2)}</p>
        </div>

        <FormField
          control={control}
          name="observacionesCobranza"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones de cobranza</FormLabel>
              <FormControl>
                <textarea
                  className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="Notas internas de seguimiento, acuerdos o incidencias del cobro"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Conceptos del recibo</h3>
          {fields.map((item, idx) => (
            <div key={item.id} className="grid gap-4 md:grid-cols-[1.5fr_1fr_auto] md:items-end">
              <FormField
                control={control}
                name={`detalles.${idx}.descripcion`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Concepto" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`detalles.${idx}.monto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="destructive" onClick={() => remove(idx)} className="h-10">
                Eliminar
              </Button>
            </div>
          ))}
          <div className="text-right">
            <Button
              type="button"
              onClick={() => append({ reciboId: initialData?.id || "", descripcion: "", monto: 0 })}
            >
              Añadir concepto
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">{isUpdate ? "Actualizar recibo" : "Crear recibo"}</Button>
        </div>
      </form>
    </Form>
  );
}
