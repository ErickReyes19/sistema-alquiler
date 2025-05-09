"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Rol, RolSchema } from "../schema";
import { postRol, putRol } from "../actions";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch"; // Importamos Switch
import { CheckboxPermisos } from "./checkboxForm";
import { Loader2 } from "lucide-react";
import { PermisosRol } from "../type";

export function FormularioRol({
  isUpdate,
  initialData,
  permisos,
}: {
  isUpdate: boolean;
  initialData?: Rol;
  permisos: PermisosRol[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof RolSchema>>({
    resolver: zodResolver(RolSchema),
    defaultValues: initialData || { permisos: [], activo: true },
  });

  async function onSubmit(data: z.infer<typeof RolSchema>) {
    const rolData = {
      rol: data,
      permisosRol: data.permisos.map((permiso: PermisosRol) => permiso.id),
    };

    try {
      if (isUpdate) {
        await putRol(rolData);
      } else {
        await postRol(rolData);
      }

      toast({
        title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
        description: isUpdate
          ? "El rol ha sido actualizado."
          : "El rol ha sido creado.",
      });

      router.push("/roles");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: `Hubo un problema: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4 relative"
      >
        {/* Switch Activo */}
        <div className="absolute top-4 right-4">
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Nombre del Rol */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Rol</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre del rol" {...field} />
              </FormControl>
              <FormDescription>
                Por favor ingresa el nombre del rol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción del Rol */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la descripción" {...field} />
              </FormControl>
              <FormDescription>
                Proporciona una breve descripción del rol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox de permisos */}
        <FormField
          control={form.control}
          name="permisos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permisos del Rol</FormLabel>
              <FormControl>
                <CheckboxPermisos
                  permisos={permisos}
                  selectedPermisos={
                    field.value?.map((permiso: PermisosRol) => permiso.id) || []
                  }
                  onChange={(selected) => {
                    const selectedPermisosRol = permisos.filter((permiso) =>
                      selected.includes(permiso.id)
                    );
                    field.onChange(selectedPermisosRol);
                  }}
                />
              </FormControl>
              <FormDescription>
                Selecciona los permisos asociados a este rol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de Enviar */}
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