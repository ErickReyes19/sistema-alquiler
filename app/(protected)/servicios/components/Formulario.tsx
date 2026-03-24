"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Importamos useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Usamos el resolutor de Zod
import { z } from "zod";
import {  ServiciosSchema } from "../schema"; // Tu esquema de Zod para tipo de habitación
import { postservicio, putServicio } from "../actions"; // Funciones para enviar datos
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
import { TipoHabitacion } from "../../tipo-habitacion/schema";

export function FormularioServicio({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData?: TipoHabitacion;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ServiciosSchema>>({
    resolver: zodResolver(ServiciosSchema),
    defaultValues: initialData || { nombre: "", activo: false },
  });

  async function onSubmit(data: z.infer<typeof ServiciosSchema>) {
    const servicioData = {
      servicio: data,
    };

    try {
      let success = false;

      if (isUpdate) {
        success = await putServicio(servicioData);
      } else {
        success = await postservicio(servicioData);
      }

      if (success) {
        // Notificación de éxito
        toast({
          title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
          description: isUpdate
            ? "El tipo de habitación ha sido actualizado."
            : "El tipo de habitación ha sido creado.",
        });

        router.push("/servicios"); // Redirige después de la acción
        router.refresh();
      } else {
        throw new Error("Operación fallida");
      }
    } catch (error) {
      // Manejo de error
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: `Hubo un problema al ${isUpdate ? "actualizar" : "crear"} el tipo de habitación.`,
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

        {/* Nombre del servicio */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del servicio</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre del servicio" {...field} />
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
