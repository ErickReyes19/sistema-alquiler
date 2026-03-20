"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { createTenantAssignedUser, type TenantOption } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function TenantUserForm({ tenants }: { tenants: TenantOption[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [tenantId, setTenantId] = useState('')
  const [isPending, startTransition] = useTransition()

  return (
    <form
      className="grid gap-4 rounded-md border p-4"
      onSubmit={(event) => {
        event.preventDefault()
        const formElement = event.currentTarget
        const formData = new FormData(formElement)
        startTransition(async () => {
          try {
            const result = await createTenantAssignedUser({
              tenantId,
              nombre: String(formData.get('nombre') ?? ''),
              email: String(formData.get('email') ?? ''),
            })
            toast({ title: 'Usuario creado', description: `Usuario administrador asignado al tenant. Contraseña temporal: ${result.passwordTemporal}` })
            formElement.reset()
            setTenantId('')
            router.refresh()
          } catch (error) {
            toast({
              title: 'Error',
              description: error instanceof Error ? error.message : 'No se pudo crear el usuario.',
              variant: 'destructive',
            })
          }
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="tenantId">Tenant</Label>
        <Select value={tenantId} onValueChange={setTenantId}>
          <SelectTrigger id="tenantId">
            <SelectValue placeholder="Selecciona un tenant" />
          </SelectTrigger>
          <SelectContent>
            {tenants.map((tenant) => (
              <SelectItem key={tenant.id} value={tenant.id}>{tenant.nombre} ({tenant.slug})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nombre">Usuario</Label>
        <Input id="nombre" name="nombre" placeholder="admin.tenant" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="admin@tenant.com" required />
      </div>
      <Button type="submit" disabled={isPending || tenants.length === 0 || !tenantId}>
        {isPending ? 'Creando...' : 'Crear usuario para tenant'}
      </Button>
    </form>
  )
}
