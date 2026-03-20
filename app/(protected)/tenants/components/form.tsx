"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { createTenant } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function TenantForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  return (
    <form
      className="grid gap-4 rounded-md border p-4"
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(async () => {
          try {
            await createTenant({
              nombre: String(formData.get('nombre') ?? ''),
              slug: String(formData.get('slug') ?? ''),
            })
            toast({ title: 'Tenant creado', description: 'Se creó el tenant y su rol administrador base.' })
            ;(event.currentTarget as HTMLFormElement).reset()
            router.refresh()
          } catch (error) {
            toast({
              title: 'Error',
              description: error instanceof Error ? error.message : 'No se pudo crear el tenant.',
              variant: 'destructive',
            })
          }
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" placeholder="Tenant Demo" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" placeholder="tenant-demo" required />
      </div>
      <Button type="submit" disabled={isPending}>{isPending ? 'Creando...' : 'Crear tenant'}</Button>
    </form>
  )
}
