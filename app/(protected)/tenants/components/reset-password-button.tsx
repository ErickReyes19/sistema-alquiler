"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { resetTenantPassword } from "../actions"

export function ResetTenantPasswordButton({
  tenantId,
}: {
  tenantId: string
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
              title: "Contraseña restablecida",
              description: (
                <div className="space-y-1 text-sm">
                  <p>Credenciales temporales (copiar):</p>
                  <p>
                    Usuario: <span className="font-mono">{result.username}</span>
                  </p>
                  <p>
                    Clave: <span className="font-mono">{result.passwordTemporal}</span>
                  </p>
                </div>
              ),
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
