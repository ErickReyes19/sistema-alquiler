"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, UserRound } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

import { changeOwnPassword } from "../actions"

const profilePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Ingresa tu contraseña actual"),
    newPassword: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

type ProfilePasswordFormValues = z.infer<typeof profilePasswordSchema>

export function ProfilePasswordForm({ username }: { username: string }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm<ProfilePasswordFormValues>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: ProfilePasswordFormValues) => {
    startTransition(async () => {
      try {
        await changeOwnPassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })

        toast({
          title: "Contraseña actualizada",
          description: "Tu contraseña fue cambiada correctamente.",
        })
        form.reset()
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "No se pudo cambiar la contraseña.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <UserRound className="h-4 w-4" />
        <span>Usuario: {username}</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={showCurrent ? "text" : "password"} className="pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                    >
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={showNew ? "text" : "password"} className="pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowNew((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar nueva contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={showConfirm ? "text" : "password"} className="pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Cambiar contraseña"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
