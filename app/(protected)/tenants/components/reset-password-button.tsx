"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { resetTenantPassword } from "../actions"

export function ResetTenantPasswordButton({
  tenantId,
  tenantNombre,
}: {
  tenantId: string
  tenantNombre: string
}) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            const result = await resetTenantPassword(tenantId)
            toast({
              title: `Contraseña restablecida en ${tenantNombre}`,
              description: `Usuario: ${result.username} | Temporal: ${result.passwordTemporal}`,
            })
          } catch (error) {
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "No se pudo restablecer la contraseña.",
              variant: "destructive",
            })
          }
        })
      }}
    >
      {isPending ? "Restableciendo..." : "Restablecer contraseña"}
    </Button>
  )
}
