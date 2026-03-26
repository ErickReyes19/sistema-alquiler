import { getSession } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Login from "../components/formLogin";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="relative flex h-full flex-col justify-end p-10 text-white">
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
            <Building2 className="h-4 w-4" />
            Sistema de alquileres
          </p>
          <h1 className="max-w-md text-4xl font-black leading-tight">
            Control total de tus propiedades desde un solo panel.
          </h1>
          <p className="mt-3 max-w-md text-white/85">
            Gestiona inmuebles, inquilinos, contratos y cobros con una experiencia ágil para tu equipo.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-slate-950 p-6">
        <Card className="w-full max-w-md border-slate-800 bg-slate-900 text-white shadow-2xl shadow-cyan-950/30">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-slate-300">
              Ingresa con tus credenciales para acceder al panel de administración.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-sm text-slate-400">Cargando formulario…</div>}>
              <Login />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
