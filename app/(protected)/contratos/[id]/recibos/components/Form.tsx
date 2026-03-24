"use client";

import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
import type { UploadedAsset } from "@/lib/uploaded-asset";

interface FormularioReciboProps {
  isUpdate: boolean;
  initialData?: Partial<Recibo> & { detalles: ReciboDetalle[]; montoMensual?: number };
  contratoId: string;
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
    : new Date();

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
      evidencias: initialData?.evidencias ?? [],
      detalles: initialData?.detalles ?? [],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, setValue } = form;
  const evidencias = form.watch("evidencias") ?? [];
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

  const uploadEvidencias = async (files: File[]) => {
    const body = new FormData();
    files.forEach((file) => body.append("files", file));
    body.append("purpose", "recibos");

    const response = await fetch("/api/uploads/cloudinary", {
      method: "POST",
      body,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error ?? "No se pudieron subir las evidencias.");
    }

    const assets = (data.assets ?? []) as UploadedAsset[];
    setValue("evidencias", [...evidencias, ...assets], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

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
        evidencias: data.evidencias ?? [],
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
        <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
          <p>La fecha de emisión y vencimiento se calculan automáticamente según el contrato.</p>
          <p>
            Emisión estimada: {format(form.watch("fechaPago"), "PPP", { locale: es })} · Vencimiento estimado:{" "}
            {format(form.watch("fechaVencimiento"), "PPP", { locale: es })}
          </p>
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
        <FormItem>
          <FormLabel>Evidencias de transacción</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={async (event) => {
                const selected = Array.from(event.target.files ?? []);
                if (!selected.length) return;
                try {
                  await uploadEvidencias(selected);
                } catch (error) {
                  toast({
                    title: "Error subiendo evidencias",
                    description:
                      error instanceof Error
                        ? error.message
                        : "No fue posible subir las evidencias.",
                    variant: "destructive",
                  });
                } finally {
                  event.target.value = "";
                }
              }}
            />
          </FormControl>
        </FormItem>

        {evidencias.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {evidencias.map((evidencia, index) => (
              <div key={`${evidencia.publicId}-${index}`} className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={evidencia.url}
                  alt={`Evidencia ${index + 1}`}
                  className="h-24 w-full rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setValue(
                      "evidencias",
                      evidencias.filter((_, evidenceIndex) => evidenceIndex !== index),
                      { shouldDirty: true, shouldValidate: true },
                    )
                  }
                >
                  Quitar
                </Button>
              </div>
            ))}
          </div>
        )}

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
