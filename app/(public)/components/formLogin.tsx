"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, User2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { getSession, login } from "../../../auth";
import { schemaSignIn, type TSchemaSignIn } from "../../../lib/shemas";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const redirectTo = searchParams.get("from") ?? searchParams.get("redirect") ?? "/dashboard";

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<TSchemaSignIn>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: { slug: "", usuario: "", contrasena: "" },
  });

  const onSubmit = (values: TSchemaSignIn) => {
    startTransition(async () => {
      const response = await login(values, redirectTo);
      if (response.error) {
        form.setError("contrasena", { message: response.error });
        return;
      }

      const session = await getSession();
      if (session?.DebeCambiar) {
        router.replace("/reset-password");
      } else {
        router.replace(session?.tipoUsuario === "ROOT" ? "/tenants" : response.redirect!);
      }
    });
  };

  if (!mounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenant</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    {...field}
                    placeholder="mi-tenant"
                    disabled={isPending}
                    className="border-slate-700 bg-slate-950/70 pl-9 text-white"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <div className="relative">
                  <User2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    {...field}
                    placeholder="usuario"
                    disabled={isPending}
                    className="border-slate-700 bg-slate-950/70 pl-9 text-white"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contrasena"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isPending}
                    className="border-slate-700 bg-slate-950/70 pr-10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-cyan-500 font-semibold text-slate-950 hover:bg-cyan-400">
          {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </Form>
  );
}
