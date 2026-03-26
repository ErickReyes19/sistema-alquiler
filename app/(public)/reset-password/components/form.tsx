"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { getSession, resetPassword } from "@/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaResetPassword, type TSchemaResetPassword } from "../schema";

export default function ResetPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [nextRoute, setNextRoute] = useState("/dashboard");

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session?.DebeCambiar) {
        router.replace("/");
        return;
      }
      setUsername(session.User);
      setNextRoute(session.tipoUsuario === "ROOT" ? "/tenants" : "/dashboard");
      setMounted(true);
    })();
  }, [router]);

  const form = useForm<TSchemaResetPassword>({
    resolver: zodResolver(schemaResetPassword),
    defaultValues: { nueva: "", confirmar: "" },
  });

  const onSubmit = (values: TSchemaResetPassword) => {
    startTransition(async () => {
      const { error } = await resetPassword(values, username);
      if (error) {
        form.setError("nueva", { message: error });
        return;
      }
      router.push(nextRoute);
    });
  };

  if (!mounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="nueva"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showNew ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isPending}
                    className="border-slate-700 bg-slate-950/70 pr-10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isPending}
                    className="border-slate-700 bg-slate-950/70 pr-10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full bg-cyan-500 font-semibold text-slate-950 hover:bg-cyan-400">
          {isPending ? "Guardando..." : "Cambiar contraseña"}
        </Button>
      </form>
    </Form>
  );
}
