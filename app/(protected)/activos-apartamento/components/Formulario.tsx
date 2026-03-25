"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { postApartamentoActivo, postTipoActivoApartamento, putApartamentoActivo } from "../actions";
import { ApartamentoActivoInput, ApartamentoActivoSchema } from "../schema";
import type { ApartamentoOption, TipoActivoOption, TipoHabitacionOption } from "../type";

export function FormularioActivoApartamento({
  isUpdate,
  initialData,
  apartamentos,
  tiposActivos,
  tiposHabitacion,
}: {
  isUpdate: boolean;
  initialData?: ApartamentoActivoInput;
  apartamentos: ApartamentoOption[];
  tiposActivos: TipoActivoOption[];
  tiposHabitacion: TipoHabitacionOption[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [tipoActivoList, setTipoActivoList] = useState(tiposActivos);
  const [isAddingTipo, setIsAddingTipo] = useState(false);

  const form = useForm<z.infer<typeof ApartamentoActivoSchema>>({
    resolver: zodResolver(ApartamentoActivoSchema),
    defaultValues: initialData || {
      apartamentoId: "",
      tipoActivoId: "",
      tipoHabitacionId: "",
      identificador: "",
      descripcion: "",
      activo: true,
    },
  });

  async function onSubmit(data: z.infer<typeof ApartamentoActivoSchema>) {
    const payload = {
      activo: {
        ...data,
        tipoHabitacionId: data.tipoHabitacionId || null,
      },
    };

    const success = isUpdate
      ? await putApartamentoActivo(payload)
      : await postApartamentoActivo(payload);

    if (success) {
      toast({
        title: isUpdate ? "Activo actualizado" : "Activo creado",
        description: "El activo quedó guardado correctamente.",
      });
      router.push("/activos-apartamento");
      router.refresh();
      return;
    }

    toast({
      title: "Error",
      description: `No se pudo ${isUpdate ? "actualizar" : "crear"} el activo.`,
      variant: "destructive",
    });
  }

  async function onAddTipoActivo() {
    if (!nuevoTipo.trim()) return;
    setIsAddingTipo(true);
    const result = await postTipoActivoApartamento(nuevoTipo);
    setIsAddingTipo(false);

    if (!result.ok || !result.id) {
      toast({ title: "Error", description: result.message || "No se pudo crear el tipo", variant: "destructive" });
      return;
    }

    const creado = { id: result.id, nombre: nuevoTipo.trim() };
    setTipoActivoList((current) => [...current, creado].sort((a, b) => a.nombre.localeCompare(b.nombre)));
    form.setValue("tipoActivoId", result.id);
    setNuevoTipo("");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6 border rounded-md p-4">
        {isUpdate && (
          <div className="absolute top-4 right-4">
            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormControl>
                  <Switch checked={Boolean(field.value)} onCheckedChange={(value) => field.onChange(value)} />
                </FormControl>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="apartamentoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartamento</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione apartamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {apartamentos.map((apartamento) => (
                    <SelectItem key={apartamento.id} value={apartamento.id}>
                      Apartamento {apartamento.numero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <Input
            value={nuevoTipo}
            onChange={(e) => setNuevoTipo(e.target.value)}
            placeholder="Nuevo tipo de activo (ej. Aire acondicionado)"
          />
          <Button type="button" variant="outline" onClick={onAddTipoActivo} disabled={isAddingTipo}>
            {isAddingTipo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Agregar tipo
          </Button>
        </div>

        <FormField
          control={form.control}
          name="tipoActivoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de activo</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione tipo de activo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tipoActivoList.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoHabitacionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de habitación (opcional)</FormLabel>
              <Select value={field.value || "none"} onValueChange={(value) => field.onChange(value === "none" ? "" : value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione tipo de habitación" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No aplica</SelectItem>
                  {tiposHabitacion.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identificador"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificador</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Aire acondicionado 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Marca, serie o ubicación exacta" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
              </>
            ) : isUpdate ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
