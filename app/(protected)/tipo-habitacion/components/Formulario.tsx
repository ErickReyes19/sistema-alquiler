"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Importamos useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Usamos el resolutor de Zod
import { z } from "zod";
import { TipoHabitacion, TipoHabitacionSchema } from "../schema"; // Tu esquema de Zod para tipo de habitación
import { postTipoHabitacion, putTipoHabitacion } from "../actions"; // Funciones para enviar datos
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch"; // Importamos el Switch de Shadcn
import { Loader2 } from "lucide-react";

export function FormularioTipoHabitacion({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData?: TipoHabitacion;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof TipoHabitacionSchema>>({
    resolver: zodResolver(TipoHabitacionSchema),
    defaultValues: initialData || { nombre: "", activo: false },
  });

  async function onSubmit(data: z.infer<typeof TipoHabitacionSchema>) {
    const tipoHabitacionData = {
      tipoHabitacion: data,
    };

    try {
      if (isUpdate) {
        await putTipoHabitacion(tipoHabitacionData);
      } else {
        await postTipoHabitacion(tipoHabitacionData);
      }

      // Notificación de éxito
      toast({
        title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
        description: isUpdate
          ? "El tipo de habitación ha sido actualizado."
          : "El tipo de habitación ha sido creado.",
      });

      router.push("/tipo-habitacion"); // Redirige después de la acción
      router.refresh();
    } catch (error) {
      // Manejo de error
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: `Hubo un problema:`,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8 border rounded-md p-4"
      >
        {/* Switch arriba a la derecha */}
        {isUpdate && (
          <div className="absolute top-4 right-4">
            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => field.onChange(value)}
                  />
                </FormControl>
              )}
            />
          </div>
        )}

        {/* Nombre del Tipo de Habitación */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Tipo de Habitación</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre del tipo de habitación" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Enviar */}
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
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
