"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Apartamento } from "../../apartamentos/type";
import { Inquilino } from "../../inquilinos/type";
import { Regla } from "../../reglas/type";
import { postContrato, putContrato } from "../actions";
import { ContratoSchema } from "../schema";
import type { ContratoCreate, ContratoUpdate, EstadoRenovacionContrato } from "../type";

type FormValues = z.input<typeof ContratoSchema>;

export function Formulario({
  isUpdate,
  initialData,
  inquilinos,
  apartamentos,
  reglas,
}: {
  isUpdate: boolean;
  initialData?: {
    id?: string;
    inquilinoId: string;
    apartamentoId: string;
    fechaInicio: string;
    fechaFin?: string | null;
    montoMensual: number;
    diaPagoMensual: number;
    reglaIds: string[];
    depositoGarantiaMonto: number;
    fechaRecepcionDeposito?: string | null;
    preavisoDias?: number;
    activo?: boolean;
    estadoRenovacion?: EstadoRenovacionContrato;
    motivoCancelacion?: string | null;
    fechaDesocupacion?: string | null;
  };
  inquilinos: Inquilino[];
  apartamentos: Apartamento[];
  reglas: Regla[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const defaultValues: FormValues = initialData
    ? {
        inquilinoId: initialData.inquilinoId,
        apartamentoId: initialData.apartamentoId,
        fechaInicio: new Date(initialData.fechaInicio),
        fechaFin: initialData.fechaFin ? new Date(initialData.fechaFin) : undefined,
        montoMensual: initialData.montoMensual,
        diaPagoMensual: initialData.diaPagoMensual,
        reglaIds: initialData.reglaIds,
        depositoGarantiaMonto: initialData.depositoGarantiaMonto,
        fechaRecepcionDeposito: initialData.fechaRecepcionDeposito ? new Date(initialData.fechaRecepcionDeposito) : undefined,
        preavisoDias: initialData.preavisoDias ?? 30,
        activo: initialData.activo ?? true,
      }
    : {
        inquilinoId: "",
        apartamentoId: "",
        fechaInicio: new Date(),
        fechaFin: undefined,
        montoMensual: 0,
        diaPagoMensual: 1,
        reglaIds: [],
        depositoGarantiaMonto: 0,
        fechaRecepcionDeposito: undefined,
        preavisoDias: 30,
        activo: true,
      };

  const maxCalendarDate = new Date(new Date().getFullYear() + 10, 11, 31);

  const form = useForm<FormValues>({
    resolver: zodResolver(ContratoSchema),
    defaultValues,
  });

  async function onSubmit(values: FormValues) {
    try {
      if (isUpdate) {
        const dto: ContratoUpdate = {
          id: initialData!.id!,
          inquilinoId: values.inquilinoId,
          apartamentoId: values.apartamentoId,
          fechaInicio: values.fechaInicio.toISOString(),
          fechaFin: values.fechaFin ? values.fechaFin.toISOString() : undefined,
          montoMensual: values.montoMensual ?? 0,
          diaPagoMensual: values.diaPagoMensual ?? 1,
          reglaIds: values.reglaIds ?? [],
          depositoGarantiaMonto: values.depositoGarantiaMonto ?? 0,
          fechaRecepcionDeposito: values.fechaRecepcionDeposito ? values.fechaRecepcionDeposito.toISOString() : null,
          preavisoDias: values.preavisoDias ?? 30,
          activo: values.activo ?? true,
          estadoRenovacion: initialData?.estadoRenovacion ?? "SIN_GESTION",
          fechaDesocupacion: initialData?.fechaDesocupacion ?? null,
          motivoCancelacion: initialData?.motivoCancelacion ?? null,
        };
        await putContrato({ contrato: dto });
      } else {
        const dto: ContratoCreate = {
          inquilinoId: values.inquilinoId,
          apartamentoId: values.apartamentoId,
          fechaInicio: values.fechaInicio.toISOString(),
          fechaFin: values.fechaFin ? values.fechaFin.toISOString() : undefined,
          montoMensual: values.montoMensual ?? 0,
          diaPagoMensual: values.diaPagoMensual ?? 1,
          reglaIds: values.reglaIds ?? [],
          depositoGarantiaMonto: values.depositoGarantiaMonto ?? 0,
          fechaRecepcionDeposito: values.fechaRecepcionDeposito ? values.fechaRecepcionDeposito.toISOString() : null,
          preavisoDias: values.preavisoDias ?? 30,
          activo: values.activo ?? true,
          estadoRenovacion: values.fechaFin ? "ALERTA_GENERADA" : "SIN_GESTION",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-md border p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                      {inquilinos.map((inquilino) => (
                        <SelectItem key={inquilino.id} value={inquilino.id || ""}>
                          {inquilino.nombreCompleto}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      {apartamentos.map((apartamento) => (
                        <SelectItem key={apartamento.id} value={apartamento.id || ""}>
                          Apartamento {apartamento.numero}
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                      className={cn("w-full text-left", !field.value && "text-muted-foreground")}
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
                      startMonth={new Date("1900-01-01")}
                      endMonth={maxCalendarDate}
                      disabled={(date) => date < new Date("1900-01-01") || date > maxCalendarDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full text-left", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP", { locale: es }) : "No definida"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      startMonth={new Date("1900-01-01")}
                      endMonth={maxCalendarDate}
                      disabled={(date) => date < new Date("1900-01-01") || date > maxCalendarDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Si define fecha de fin, el sistema podrá generar alertas y gestionar renovaciones.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="montoMensual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto mensual</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={field.value?.toString() || ""}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diaPagoMensual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Día de pago mensual</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    value={field.value?.toString() || "1"}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Este día se usará para calcular automáticamente el vencimiento de los recibos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depositoGarantiaMonto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depósito de garantía</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={field.value?.toString() || ""}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Monto recibido en custodia para cubrir daños, saldos pendientes o devolución final.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reglaIds"
          render={({ field }) => (
            <FormItem className="space-y-3 rounded-md border p-4">
              <FormLabel>Reglas del contrato</FormLabel>
              <div className="grid gap-2 md:grid-cols-2">
                {reglas.map((regla) => {
                  const checked = field.value?.includes(regla.id || "");
                  return (
                    <label key={regla.id} className="flex items-start gap-2 rounded-md border p-2 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => {
                          const reglaId = regla.id || "";
                          if (value) {
                            field.onChange([...(field.value || []), reglaId]);
                          } else {
                            field.onChange((field.value || []).filter((id) => id !== reglaId));
                          }
                        }}
                      />
                      <span>{regla.nombre}</span>
                    </label>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fechaRecepcionDeposito"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de recepción del depósito</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full text-left", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP", { locale: es }) : "Pendiente por recibir"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      startMonth={new Date("1900-01-01")}
                      endMonth={maxCalendarDate}
                      disabled={(date) => date < new Date("1900-01-01") || date > maxCalendarDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Déjelo vacío si el depósito aún no fue cobrado; el ledger quedará en estado pendiente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preavisoDias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preaviso de renovación / salida (días)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    value={field.value?.toString() || "0"}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Determina cuántos días antes del vencimiento se activa la alerta operativa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">{isUpdate ? "Actualizar contrato" : "Crear contrato"}</Button>
        </div>
      </form>
    </Form>
  );
}
