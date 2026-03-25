"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { postTipoActivoApartamento, putTipoActivoApartamento } from "../actions";
import { TipoActivoApartamentoSchema } from "../schema";

export function FormularioTipoActivo({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData?: z.infer<typeof TipoActivoApartamentoSchema>;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof TipoActivoApartamentoSchema>>({
    resolver: zodResolver(TipoActivoApartamentoSchema),
    defaultValues: initialData || { nombre: "", activo: true },
  });

  async function onSubmit(data: z.infer<typeof TipoActivoApartamentoSchema>) {
    const success = isUpdate
      ? await putTipoActivoApartamento({ tipoActivo: data })
      : await postTipoActivoApartamento({ tipoActivo: data });

    if (!success) {
      toast({
        title: "Error",
        description: `No se pudo ${isUpdate ? "actualizar" : "crear"} el tipo de activo.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isUpdate ? "Tipo actualizado" : "Tipo creado",
      description: "Operación exitosa.",
    });
    router.push("/activos-apartamento");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-8 border rounded-md p-4">
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
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del tipo de activo</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Aire acondicionado" {...field} />
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
