'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { postApartamentoCompleto, putApartamentoCompleto } from '../actions';
import { ApartamentoSchema } from '../schema';
import { Apartamento } from '../type';
import { TipoHabitacion } from '../../tipo-habitacion/type';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Servicio } from '../../servicios/type';

interface Props {
  tipoHabitaciones: TipoHabitacion[];
  serviciosDisponibles: Servicio[];
  initialData?: Apartamento;
  isUpdate?: boolean;
}

export default function ApartamentoForm({
  tipoHabitaciones,
  serviciosDisponibles,
  initialData,
  isUpdate,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ApartamentoSchema>>({
    resolver: zodResolver(ApartamentoSchema),
    defaultValues: {
      numero: '',
      direccion: '',
      disponible: true,
      activo: true,
      habitaciones: [],
      servicios: [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields: habFields, append: appendHab, remove: removeHab } = useFieldArray({
    control,
    name: 'habitaciones',
  });

  const { fields: servFields, append: appendServ, remove: removeServ } = useFieldArray({
    control,
    name: 'servicios',
  });

  useEffect(() => {
    if (initialData) reset(initialData as any);
  }, [initialData, reset]);

  const onSubmit = async (values: z.infer<typeof ApartamentoSchema>) => {
    try {
      if (isUpdate && initialData?.id) {
        await putApartamentoCompleto({
          apartamento: values,
          habitaciones: values.habitaciones || [],
          servicios: values.servicios!,
        });
      } else {
        await postApartamentoCompleto({
          apartamento: values,
          habitaciones: values.habitaciones || [],
          servicios: values.servicios!,
        });
      }
      toast({
        title: isUpdate ? 'Apartamento actualizado' : 'Apartamento creado',
        description: 'Operación exitosa.',
      });
      router.push('/apartamentos');
      router.refresh();
    } catch {
      toast({
        title: 'Error',
        description: 'Algo falló.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Datos del Apartamento */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Datos del Apartamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Número del apartamento" />
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
                    <Input {...field} placeholder="Dirección del apartamento" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
        </div>

        {/* Habitaciones */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Habitaciones</h2>
          {habFields.map((field, idx) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`habitaciones.${idx}.tipoHabitacionId`}
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
                  name={`habitaciones.${idx}.cantidad`}
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
                    onClick={() => removeHab(idx)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                appendHab({ tipoHabitacionId: '', cantidad: 1, activo: true })
              }
            >
              Añadir Habitación
            </Button>
          </div>
        </div>

        {/* Servicios */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Servicios</h2>
          {servFields.map((field, idx) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`servicios.${idx}.servicioId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicio</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviciosDisponibles.map((s) => (
                              <SelectItem key={s.id} value={s.id || ''}>
                                {s.nombre}
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
                  name={`servicios.${idx}.incluido`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Incluido</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`servicios.${idx}.costoAdicional`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Costo Adicional</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeServ(idx)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                appendServ({ servicioId: '', incluido: false, costoAdicional: 0 })
              }
            >
              Añadir Servicio
            </Button>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end">
          <Button type="submit">
            {isUpdate ? 'Actualizar Apartamento' : 'Crear Apartamento'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
