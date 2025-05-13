"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { postContrato, putContrato } from "../actions";
import { ContratoSchema } from "../schema";
import type { ContratoCreate, ContratoUpdate } from "../type";
import { Inquilino } from "../../inquilinos/type";
import { Apartamento } from "../../apartamentos/type";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

export function Formulario({
  isUpdate,
  initialData,
  inquilinos,
  apartamentos,
}: {
  isUpdate: boolean;
  initialData?: {
    id?: string;
    inquilinoId: string;
    apartamentoId: string;
    fechaInicio: string;
    fechaFin?: string;
    montoMensual: number;
    activo?: boolean;
  };
  inquilinos: Inquilino[];
  apartamentos: Apartamento[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  // Convertir initialData de strings a Date para el calendario
  const defaultValues = initialData
    ? {
        ...initialData,
        fechaInicio: new Date(initialData.fechaInicio),
        fechaFin: initialData.fechaFin ? new Date(initialData.fechaFin) : undefined,
      }
    : { inquilinoId: "", apartamentoId: "", fechaInicio: undefined, fechaFin: undefined, montoMensual: 0, activo: true };

  const form = useForm<{
    inquilinoId: string;
    apartamentoId: string;
    fechaInicio: Date;
    fechaFin?: Date;
    montoMensual: number;
    activo?: boolean;
  }>({
    resolver: zodResolver(ContratoSchema),
    defaultValues,
  });

  async function onSubmit(values: typeof defaultValues) {
    try {
      if (isUpdate) {
        const dto: ContratoUpdate = {
          id: initialData!.id!,
          inquilinoId: values.inquilinoId,
          apartamentoId: values.apartamentoId,
          fechaInicio: values.fechaInicio!.toISOString(),
          fechaFin: values.fechaFin ? values.fechaFin.toISOString() : undefined,
          montoMensual: values.montoMensual,
          activo: values.activo!,
        };
        await putContrato({ contrato: dto });
      } else {
        const dto: ContratoCreate = {
          inquilinoId: values.inquilinoId,
          apartamentoId: values.apartamentoId,
          fechaInicio: values.fechaInicio!.toISOString(),
          fechaFin: values.fechaFin ? values.fechaFin.toISOString() : undefined,
          montoMensual: values.montoMensual,
          activo: values.activo!,
        };
        await postContrato({ contrato: dto });
      }

      toast({
        title: isUpdate ? "Contrato actualizado" : "Contrato creado",
        description: "Operación exitosa.",
      });
      router.push("/contratos");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Ocurrió un problema.", variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-md">
        {/* Información principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inquilino */}
          <FormField
            control={form.control}
            name="inquilinoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inquilino</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un inquilino" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquilinos.map((i) => (
                        <SelectItem key={i.id} value={i.id || ""}>
                          {i.nombreCompleto}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Apartamento */}
          <FormField
            control={form.control}
            name="apartamentoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apartamento</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un apartamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {apartamentos.map((a) => (
                        <SelectItem key={a.id} value={a.id || ""}>
                          Apartamento {a.numero}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de inicio */}
          <FormField
            control={form.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full text-left",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP", { locale: es }) : "Selecciona fecha"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha de fin */}
          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de fin (opcional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full text-left",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP", { locale: es }) : "No aplica"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Monto mensual */}
        <FormField
          control={form.control}
          name="montoMensual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto Mensual</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={field.value?.toString() || ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Estado (solo en actualización) */}
        {isUpdate && (
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(v) => field.onChange(v === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Botón de envío */}
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : isUpdate ? (
              "Actualizar"
            ) : (
              "Crear"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
