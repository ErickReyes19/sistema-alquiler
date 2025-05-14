"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ReciboSchema } from "../schema";
import type { Recibo, ReciboDetalle } from "../type";
import { postReciboConDetalles, putReciboConDetalles } from "../actions";

interface FormularioReciboProps {
  isUpdate: boolean;
  initialData?: Recibo & { detalles: ReciboDetalle[]; montoMensual?: number };
  contratoId: string;
}

export default function FormularioRecibo({
  isUpdate,
  contratoId,
  initialData,
}: FormularioReciboProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ReciboSchema>>({
    resolver: zodResolver(ReciboSchema),
    defaultValues: {
      contratoId,
      fechaPago: initialData ? new Date(initialData.fechaPago) : new Date(),
      total: initialData?.total ?? 0,
      detalles: initialData?.detalles ?? [],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, setValue } = form;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "detalles",
  });

  // Función para inicializar los detalles
  const initializeDetalles = () => {
    if (!initialData) return;

    const baseReciboId = isUpdate ? initialData.id! : "";
    const detallesParsed = (initialData.detalles || []).map((d) => ({
      ...(d.id ? { id: d.id } : {}),
      descripcion: d.descripcion,
      monto: Number(d.monto),
      reciboId: baseReciboId,
    }));

    const detallesFinal = !isUpdate
      ? [
          {
            descripcion: "Monto Mensual",
            monto: initialData.total,
            reciboId: baseReciboId || "",
          },
          ...detallesParsed,
        ]
      : detallesParsed;

    replace(detallesFinal);
  };

  // Inicializar detalles al cargar el componente
  useEffect(() => {
    initializeDetalles();
  }, [initialData, isUpdate, replace]);

  // Recalcular el total automáticamente
  const detalles = useWatch({ control, name: "detalles" });
  useEffect(() => {
    const total = Array.isArray(detalles)
      ? detalles.reduce((sum, d) => sum + (Number(d.monto) || 0), 0)
      : 0;
    setValue("total", total, { shouldValidate: true, shouldDirty: true });
  }, [detalles, setValue]);

  // Manejo del submit
  const onSubmit = async (data: z.infer<typeof ReciboSchema>) => {
    try {
      const reciboPayload = {
        id: isUpdate ? initialData?.id ?? "" : data.id!,
        contratoId: data.contratoId,
        fechaPago: data.fechaPago.toISOString(),
        total: data.total,
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

      toast({
        title: isUpdate ? "Recibo actualizado" : "Recibo creado",
        description: "Operación exitosa",
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-md">
        {/* Fecha de pago */}
        <FormField
          control={control}
          name="fechaPago"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Pago</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full text-left",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? format(field.value, "PPP", { locale: es })
                        : "Selecciona fecha"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total calculado */}
        <FormField
          control={control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input readOnly value={field.value.toFixed(2)} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Detalles dinámicos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Conceptos</h3>
          {fields.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-3 gap-4 items-end">
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
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(idx)}
                className="h-10"
              >
                Eliminar
              </Button>
            </div>
          ))}
          <div className="text-right">
            <Button
              type="button"
              onClick={() =>
                append({ reciboId: initialData?.id || "", descripcion: "", monto: 0 })
              }
            >
              Añadir Concepto
            </Button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit">{isUpdate ? "Actualizar Recibo" : "Crear Recibo"}</Button>
        </div>
      </form>
    </Form>
  );
}