"use client"

import React from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { postInquilino, putInquilino } from "../actions"
import {
  Acompanante,
  GaranteArrendamiento,
  InquilinoFormSchema,
  ReferenciaArrendamiento,
} from "../schema"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const parentescoOptions = [
  "Cónyuge / pareja",
  "Hijo(a)",
  "Padre / madre",
  "Hermano(a)",
  "Abuelo(a)",
  "Nieto(a)",
  "Tío(a)",
  "Sobrino(a)",
  "Primo(a)",
  "Cuñado(a)",
  "Suegro(a)",
  "Yerno / nuera",
  "Tutor(a)",
  "Amigo(a)",
  "Compañero(a)",
] as const

const referenciaTipoLabels = {
  PERSONAL: "Personal",
  LABORAL: "Laboral",
  ARRENDADOR_ANTERIOR: "Arrendador anterior",
} as const

const decisionLabels = {
  PENDIENTE: "Pendiente",
  APROBADO: "Aprobado",
  RECHAZADO: "Rechazado",
} as const

const defaultReferencia = (): ReferenciaArrendamiento => ({
  tipo: "PERSONAL",
  nombreCompleto: "",
  telefono: "",
  correo: "",
  relacion: "",
  notas: "",
})

const defaultGarante = (): GaranteArrendamiento => ({
  nombreCompleto: "",
  dni: "",
  telefono: "",
  correo: "",
  empresa: "",
  notas: "",
})

const defaultAcompanante = (): Acompanante => ({
  nombreCompleto: "",
  parentesco: "",
  activo: true,
})

type InquilinoFormValues = z.input<typeof InquilinoFormSchema>

export function FormularioInquilino({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean
  initialData?: InquilinoFormValues
}) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<InquilinoFormValues>({
    resolver: zodResolver(InquilinoFormSchema),
    defaultValues: initialData ?? {
      id: undefined,
      nombreCompleto: "",
      dni: "",
      telefono: "",
      correo: "",
      fechaNacimiento: new Date(),
      activo: true,
      acompanantes: [],
      expedienteArrendamiento: {
        ocupacion: "",
        empresa: "",
        historialAlquiler: "",
        motivoSolicitud: "",
        estadoDecision: "PENDIENTE",
        decisionTomadaPor: "",
        fechaDecision: null,
        motivoDecision: "",
        referencias: [],
        garantes: [],
      },
    },
  })

  const { control, handleSubmit, formState } = form
  const acompanantes = useFieldArray({ control, name: "acompanantes" })
  const referencias = useFieldArray({ control, name: "expedienteArrendamiento.referencias" })
  const garantes = useFieldArray({ control, name: "expedienteArrendamiento.garantes" })

  const onSubmit = async (data: InquilinoFormValues) => {
    try {
      const payload = {
        ...data,
        acompanantes: data.acompanantes ?? [],
        expedienteArrendamiento: {
          ...data.expedienteArrendamiento,
          estadoDecision: data.expedienteArrendamiento.estadoDecision ?? "PENDIENTE",
          referencias: data.expedienteArrendamiento.referencias ?? [],
          garantes: data.expedienteArrendamiento.garantes ?? [],
        },
      }

      if (isUpdate) await putInquilino({ inquilino: payload })
      else await postInquilino({ inquilino: payload })

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-lg border p-6 shadow-sm">
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Datos básicos</h2>
            <p className="text-sm text-muted-foreground">Identificación y contacto del inquilino.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField control={control} name="nombreCompleto" render={({ field }) => (
              <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input placeholder="Nombre completo" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="dni" render={({ field }) => (
              <FormItem><FormLabel>DNI</FormLabel><FormControl><Input placeholder="Número de documento" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="telefono" render={({ field }) => (
              <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="8 dígitos" inputMode="numeric" maxLength={8} value={field.value} onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 8))} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="correo" render={({ field }) => (
              <FormItem><FormLabel>Correo</FormLabel><FormControl><Input placeholder="Correo electrónico" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="fechaNacimiento" render={({ field }) => (
              <FormItem className="flex flex-col"><FormLabel>Fecha de nacimiento</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} /></PopoverContent></Popover><FormDescription>Fecha de nacimiento del inquilino.</FormDescription><FormMessage /></FormItem>
            )} />
            {isUpdate && <FormField control={control} name="activo" render={({ field }) => (
              <FormItem className="flex items-center justify-end rounded-md p-3"><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="ml-2">Inquilino activo</FormLabel></FormItem>
            )} />}
          </div>
        </section>

        <section className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Acompañantes</h2>
              <p className="text-sm text-muted-foreground">Registra las personas adicionales que residirán con el inquilino.</p>
            </div>
            <Button type="button" variant="outline" onClick={() => acompanantes.append(defaultAcompanante())}><Plus className="mr-2 h-4 w-4" />Agregar acompañante</Button>
          </div>
          <div className="space-y-4">
            {acompanantes.fields.length === 0 && <p className="text-sm text-muted-foreground">No hay acompañantes registrados.</p>}
            {acompanantes.fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
                <FormField control={control} name={`acompanantes.${index}.nombreCompleto`} render={({ field }) => (
                  <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input placeholder="Nombre del acompañante" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`acompanantes.${index}.parentesco`} render={({ field }) => (
                  <FormItem><FormLabel>Parentesco</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un parentesco" /></SelectTrigger></FormControl><SelectContent>{parentescoOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <div className="md:col-span-2 flex justify-end"><Button type="button" variant="ghost" onClick={() => acompanantes.remove(index)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</Button></div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t pt-6">
          <div>
            <h2 className="text-lg font-semibold">Expediente de arrendamiento</h2>
            <p className="text-sm text-muted-foreground">Información para evaluar riesgo, capacidad de pago y trazabilidad de la decisión.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField control={control} name="expedienteArrendamiento.ocupacion" render={({ field }) => (
              <FormItem><FormLabel>Ocupación o empleo</FormLabel><FormControl><Input placeholder="Ej. Administrador, independiente" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.empresa" render={({ field }) => (
              <FormItem><FormLabel>Empresa donde trabaja</FormLabel><FormControl><Input placeholder="Empresa actual" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.ingresosMensuales" render={({ field }) => (
              <FormItem><FormLabel>Ingresos mensuales</FormLabel><FormControl><Input type="number" min="0" step="0.01" placeholder="0.00" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.estadoDecision" render={({ field }) => (
              <FormItem><FormLabel>Decisión</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un estado" /></SelectTrigger></FormControl><SelectContent>{Object.entries(decisionLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.decisionTomadaPor" render={({ field }) => (
              <FormItem><FormLabel>Aprobado/Revisado por</FormLabel><FormControl><Input placeholder="Nombre del responsable" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.fechaDecision" render={({ field }) => (
              <FormItem className="flex flex-col"><FormLabel>Fecha de decisión</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value ?? undefined} onSelect={field.onChange} disabled={(date) => date > new Date()} /></PopoverContent></Popover><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.historialAlquiler" render={({ field }) => (
              <FormItem className="md:col-span-2"><FormLabel>Historial de alquiler</FormLabel><FormControl><textarea className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Describe contratos previos, incidencias o comportamiento de pago" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.motivoSolicitud" render={({ field }) => (
              <FormItem className="md:col-span-2"><FormLabel>Motivo de la solicitud</FormLabel><FormControl><textarea className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Razón por la que desea alquilar" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name="expedienteArrendamiento.motivoDecision" render={({ field }) => (
              <FormItem className="md:col-span-2"><FormLabel>Justificación de la decisión</FormLabel><FormControl><textarea className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Fundamentos para aprobar o rechazar" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </section>

        <section className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Referencias</h2>
              <p className="text-sm text-muted-foreground">Incluye referencias personales, laborales y de arrendadores previos.</p>
            </div>
            <Button type="button" variant="outline" onClick={() => referencias.append(defaultReferencia())}><Plus className="mr-2 h-4 w-4" />Agregar referencia</Button>
          </div>
          <div className="space-y-4">
            {referencias.fields.length === 0 && <p className="text-sm text-muted-foreground">No hay referencias registradas.</p>}
            {referencias.fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
                <FormField control={control} name={`expedienteArrendamiento.referencias.${index}.tipo`} render={({ field }) => (
                  <FormItem><FormLabel>Tipo</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{Object.entries(referenciaTipoLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.referencias.${index}.nombreCompleto`} render={({ field }) => (
                  <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input placeholder="Nombre de referencia" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.referencias.${index}.telefono`} render={({ field }) => (
                  <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="Contacto" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.referencias.${index}.correo`} render={({ field }) => (
                  <FormItem><FormLabel>Correo</FormLabel><FormControl><Input placeholder="Correo de referencia" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.referencias.${index}.relacion`} render={({ field }) => (
                  <FormItem><FormLabel>Relación</FormLabel><FormControl><Input placeholder="Ej. Supervisor, amigo, arrendador" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.referencias.${index}.notas`} render={({ field }) => (
                  <FormItem><FormLabel>Notas</FormLabel><FormControl><Input placeholder="Observaciones" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="md:col-span-2 flex justify-end"><Button type="button" variant="ghost" onClick={() => referencias.remove(index)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</Button></div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Garantes</h2>
              <p className="text-sm text-muted-foreground">Registra garantes o fiadores con datos de respaldo económico.</p>
            </div>
            <Button type="button" variant="outline" onClick={() => garantes.append(defaultGarante())}><Plus className="mr-2 h-4 w-4" />Agregar garante</Button>
          </div>
          <div className="space-y-4">
            {garantes.fields.length === 0 && <p className="text-sm text-muted-foreground">No hay garantes registrados.</p>}
            {garantes.fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.nombreCompleto`} render={({ field }) => (
                  <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input placeholder="Nombre del garante" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.dni`} render={({ field }) => (
                  <FormItem><FormLabel>DNI</FormLabel><FormControl><Input placeholder="Documento" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.telefono`} render={({ field }) => (
                  <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="Contacto" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.correo`} render={({ field }) => (
                  <FormItem><FormLabel>Correo</FormLabel><FormControl><Input placeholder="Correo" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.empresa`} render={({ field }) => (
                  <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input placeholder="Empresa del garante" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.ingresosMensuales`} render={({ field }) => (
                  <FormItem><FormLabel>Ingresos mensuales</FormLabel><FormControl><Input type="number" min="0" step="0.01" placeholder="0.00" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`expedienteArrendamiento.garantes.${index}.notas`} render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Notas</FormLabel><FormControl><Input placeholder="Observaciones del garante" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="md:col-span-2 flex justify-end"><Button type="button" variant="ghost" onClick={() => garantes.remove(index)}><Trash2 className="mr-2 h-4 w-4" />Eliminar</Button></div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isUpdate ? "Guardar cambios" : "Crear inquilino"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
