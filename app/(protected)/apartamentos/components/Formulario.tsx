'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';

import { postApartamentoConHabitaciones, putApartamento } from '../actions';
import { ApartamentoSchema } from '../schema';
import { Apartamento } from '../type';
import { TipoHabitacion } from '../../tipo-habitacion/type';
import { Switch } from '@/components/ui/switch';
import { toast, useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
  tipoHabitaciones: TipoHabitacion[];
  initialData?: Apartamento;
  isUpdate?: boolean;
}

export default function ApartamentoForm({ tipoHabitaciones, initialData, isUpdate }: Props) {

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof ApartamentoSchema>>({
    resolver: zodResolver(ApartamentoSchema),
    defaultValues: initialData || {
      numero: '',
      direccion: '',
      disponible: true,
      activo: true,
      habitaciones: [],
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'habitaciones' });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (values: Apartamento) => {
    let success = false;

    if (isUpdate && initialData?.id) {
      success = await putApartamento({ apartamento: values, habitaciones: values.habitaciones || [] });
    } else {
      success = await postApartamentoConHabitaciones({
        apartamento: {
          numero: values.numero,
          direccion: values.direccion,
          disponible: values.disponible,
          activo: values.activo,
        },
        habitaciones: values.habitaciones || [],
      });
    }

    if (!success) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
      description: isUpdate
        ? "El usuario ha sido actualizado."
        : "El usuario ha sido creado.",
    });

    router.push('/apartamentos');
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="Número del apartamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección del apartamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-6">
          <FormField
            control={control}
            name="disponible"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Disponible</FormLabel>
              </FormItem>
            )}
          />
          {isUpdate && (
            <FormField
              control={control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Activo</FormLabel>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Habitaciones</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border rounded-lg shadow-sm  space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`habitaciones.${index}.tipoHabitacionId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Habitación</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {tipoHabitaciones.map((tipo) => (
                              <SelectItem key={tipo.id} value={tipo.id || ''}>
                                {tipo.nombre}
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
                  control={control}
                  name={`habitaciones.${index}.cantidad`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Eliminar Habitación
                  </Button>
                </div>
              </div>

            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => append({ tipoHabitacionId: '', cantidad: 1, activo: true })}
            >
              Añadir Habitación
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">{isUpdate ? 'Actualizar Apartamento' : 'Crear Apartamento'}</Button>
        </div>
      </form>
    </Form>
  );
}
