'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { Servicio } from '../../servicios/type';
import { TipoHabitacion } from '../../tipo-habitacion/type';
import { postApartamentoCompleto, putApartamentoCompleto } from '../actions';
import { ApartamentoSchema } from '../schema';
import type { UploadedAsset } from '@/lib/uploaded-asset';

type ApartamentoFormValues = z.infer<typeof ApartamentoSchema>;

interface Props {
  tipoHabitaciones: TipoHabitacion[];
  serviciosDisponibles: Servicio[];
  initialData?: ApartamentoFormValues;
  isUpdate?: boolean;
}

const defaultValues: ApartamentoFormValues = {
  numero: '',
  direccion: '',
  imagenes: [],
  disponible: true,
  activo: true,
  habitaciones: [],
  servicios: [],
};

const normalizeInitialData = (
  initialData?: ApartamentoFormValues,
): ApartamentoFormValues => ({
  ...defaultValues,
  ...initialData,
  direccion: initialData?.direccion ?? '',
  disponible: initialData?.disponible ?? true,
  activo: initialData?.activo ?? true,
  habitaciones: initialData?.habitaciones ?? [],
  servicios: initialData?.servicios ?? [],
  imagenes: initialData?.imagenes ?? [],
});

export default function ApartamentoForm({
  tipoHabitaciones,
  serviciosDisponibles,
  initialData,
  isUpdate,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ApartamentoFormValues>({
    resolver: zodResolver(ApartamentoSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = form;
  const imagenes = form.watch('imagenes') ?? [];

  const uploadImages = async (files: File[]) => {
    const body = new FormData();
    files.forEach((file) => body.append('files', file));
    body.append('purpose', 'apartamentos');

    const response = await fetch('/api/uploads/cloudinary', {
      method: 'POST',
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error ?? 'No se pudieron subir las imágenes.');
    }

    const assets = (data.assets ?? []) as UploadedAsset[];
    form.setValue('imagenes', [...imagenes, ...assets], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const { fields: habFields, append: appendHab, remove: removeHab } = useFieldArray({
    control,
    name: 'habitaciones',
  });

  const { fields: servFields, append: appendServ, remove: removeServ } = useFieldArray({
    control,
    name: 'servicios',
  });

  useEffect(() => {
    reset(normalizeInitialData(initialData));
  }, [initialData, reset]);

  const saveApartamento = async (values: ApartamentoFormValues) => {
    const payload = {
      apartamento: values,
      habitaciones: values.habitaciones,
      servicios: values.servicios ?? [],
    };

    if (isUpdate && initialData?.id) {
      return putApartamentoCompleto(payload);
    }

    return postApartamentoCompleto(payload);
  };

  const onSubmit = async (values: ApartamentoFormValues) => {
    try {
      await saveApartamento(values);

      toast({
        title: isUpdate ? 'Apartamento actualizado' : 'Apartamento creado',
        description: 'Operación exitosa.',
      });
      router.push('/apartamentos');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'No se pudo guardar el apartamento.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Datos del Apartamento</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <FormItem className="md:col-span-2">
              <FormLabel>Imágenes del apartamento</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (event) => {
                    const selected = Array.from(event.target.files ?? []);
                    if (!selected.length) return;
                    try {
                      await uploadImages(selected);
                    } catch (error) {
                      toast({
                        title: 'Error subiendo imágenes',
                        description:
                          error instanceof Error
                            ? error.message
                            : 'No se pudieron subir las imágenes.',
                        variant: 'destructive',
                      });
                    } finally {
                      event.target.value = '';
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            {imagenes.length > 0 && (
              <div className="md:col-span-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                {imagenes.map((imagen, index) => (
                  <div key={`${imagen.publicId}-${index}`} className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagen.url}
                      alt={`Apartamento ${index + 1}`}
                      className="h-24 w-full rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        form.setValue(
                          'imagenes',
                          imagenes.filter((_, imageIndex) => imageIndex !== index),
                          { shouldDirty: true, shouldValidate: true },
                        )
                      }
                    >
                      Quitar
                    </Button>
                  </div>
                ))}
              </div>
            )}
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

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Habitaciones</h2>
          {habFields.map((field, idx) => (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
              onClick={() => appendHab({ tipoHabitacionId: '', cantidad: 1, activo: true })}
            >
              Añadir Habitación
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Servicios</h2>
          {servFields.map((field, idx) => (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                            {serviciosDisponibles.map((servicio) => (
                              <SelectItem key={servicio.id} value={servicio.id || ''}>
                                {servicio.nombre}
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
                  name={`servicios.${idx}.clave`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clave del servicio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Clave para este apartamento"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
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
                appendServ({ servicioId: '', clave: '', incluido: false, costoAdicional: 0 })
              }
            >
              Añadir Servicio
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {isUpdate ? 'Actualizar Apartamento' : 'Crear Apartamento'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
