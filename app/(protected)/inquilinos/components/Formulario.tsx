"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2 } from "lucide-react"

import { InquilinoFormSchema } from "../schema"
import type { InquilinoForm, Acompanante } from "../schema"
import { postInquilino, putInquilino } from "../actions"
import { useToast } from "@/hooks/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function FormularioInquilino({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean
  initialData?: InquilinoForm
}) {
  const { toast } = useToast()
  const router = useRouter()

  // Configuramos useForm con InquilinoFormSchema
  const form = useForm<InquilinoForm>({
    resolver: zodResolver(InquilinoFormSchema),
    defaultValues: initialData ?? {
      id: undefined,
      nombreCompleto: "",
      dni: "",
      telefono: "",
      correo: "",
      fechaNacimiento: "",
      activo: true,
      acompanantes: [],
    },
  })

  const { control, handleSubmit, formState } = form

  // useFieldArray para acompanantes
  const { fields, append, remove } = useFieldArray({
    control,
    name: "acompanantes",
  })

  // Subform para agregar acompanantes
  const acompForm = useForm<Acompanante>({
    resolver: zodResolver(InquilinoFormSchema.shape.acompanantes.unwrap().element),
    defaultValues: { id: undefined, nombreCompleto: "", parentesco: "", activo: true },
  })

  const { control: controlA, handleSubmit: handleA, formState: stateA } = acompForm

  // Función para agregar
  const onAddAcompanante = (data: Acompanante, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault()
    append(data)
    acompForm.reset()
    setOpen(false)
  }

  const [open, setOpen] = React.useState(false)

  // Envío principal
  const onSubmit = async (data: InquilinoForm) => {
    try {
      if (isUpdate) await putInquilino({ inquilino: { ...data, acompanantes: data.acompanantes ?? [] } })
      else await postInquilino({ inquilino: { ...data, acompanantes: data.acompanantes ?? [] } })

      toast({
        title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
        description: isUpdate ? "El inquilino ha sido actualizado." : "El inquilino ha sido creado.",
      })
      router.push("/inquilinos")
      router.refresh()
    } catch {
      toast({ title: "Error", description: "Hubo un problema al guardar." })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-lg shadow-sm ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campos Inquilino */}
          <FormField
            control={control}
            name="nombreCompleto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Nombre Completo</FormLabel>
                <FormControl>
                  <Input className="rounded-md" placeholder="Nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">DNI</FormLabel>
                <FormControl>
                  <Input className="rounded-md" placeholder="Número de documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Teléfono</FormLabel>
                <FormControl>
                  <Input className="rounded-md" placeholder="Número de teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Correo</FormLabel>
                <FormControl>
                  <Input className="rounded-md" placeholder="Correo electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP",  { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString().split("T")[0])}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isUpdate && (
            <FormField
              control={control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 h-full justify-end">
                  <div className="flex items-center space-x-2 p-3 rounded-md">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium m-0">Inquilino Activo</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Acompañantes */}
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <FormLabel className="text-lg font-medium">Acompañantes</FormLabel>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-md">
                  + Agregar Acompañante
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Nuevo Acompañante</DialogTitle>
                  <DialogDescription>Complete los datos del acompañante</DialogDescription>
                </DialogHeader>
                <Form {...acompForm}>
                  <form className="space-y-4">
                    <FormField
                      control={controlA}
                      name="nombreCompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nombre Completo</FormLabel>
                          <FormControl>
                            <Input className="rounded-md" placeholder="Nombre del acompañante" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={controlA}
                      name="parentesco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Parentesco</FormLabel>
                          <FormControl>
                            <Input className="rounded-md" placeholder="Tipo de relación" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {isUpdate && (
                      <FormField
                        control={controlA}
                        name="activo"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(value) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-medium m-0">Acompañante Activo</FormLabel>
                          </FormItem>
                        )}
                      />
                    )}

                    <DialogFooter className="mt-6">
                      <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        disabled={stateA.isSubmitting}
                        onClick={acompForm.handleSubmit(onAddAcompanante)}
                      >
                        Guardar
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3 mb-4">
            {fields.length === 0 ? (
              <div className="text-center py-6  rounded-md text-gray-500">
                No hay acompañantes registrados
              </div>
            ) : (
              fields.map((f, idx) => (
                <div key={f.id} className="flex justify-between items-center p-3 border rounded-md ">
                  <div className="flex flex-col">
                    <span className="font-medium">{f.nombreCompleto}</span>
                    <span className="text-sm text-gray-500">{f.parentesco}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {isUpdate && f.activo !== undefined && (
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        {f.activo ? "Activo" : "Inactivo"}
                      </span>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => remove(idx)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" disabled={formState.isSubmitting} className="px-6">
            {formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Guardando...
              </>
            ) : isUpdate ? (
              "Actualizar Inquilino"
            ) : (
              "Crear Inquilino"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
