import { getSession } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const modules = [
  {
    title: "Gestión de apartamentos e inmuebles",
    description:
      "Centraliza inventario, disponibilidad, características y estado de cada unidad en segundos.",
    icon: Building2,
  },
  {
    title: "Contratos y expediente digital",
    description:
      "Crea contratos, adjunta documentación clave y sigue todo el ciclo de arrendamiento sin papeleo.",
    icon: FileText,
  },
  {
    title: "Cobranza y recibos automáticos",
    description:
      "Controla pagos pendientes, genera recibos PDF y mejora tu flujo de caja con recordatorios claros.",
    icon: CreditCard,
  },
  {
    title: "Mantenimiento e incidencias",
    description:
      "Registra incidencias, asigna responsables y da seguimiento completo a cada ticket de mantenimiento.",
    icon: Wrench,
  },
  {
    title: "Reglas operativas y permisos",
    description:
      "Define políticas por rol y protege la operación con accesos por módulos y niveles de usuario.",
    icon: ShieldCheck,
  },
  {
    title: "Reportes para decidir mejor",
    description:
      "Visualiza indicadores clave de ocupación, cobranza y gastos para escalar con control.",
    icon: BarChart3,
  },
];

const benefits = [
  "Reduce tareas manuales y errores administrativos.",
  "Acelera cobros y mejora la experiencia del inquilino.",
  "Mantén toda la información de tu operación en un solo lugar.",
  "Escala tu negocio con procesos estandarizados y auditables.",
];

export default async function LandingPage() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-10 md:py-24">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
            <ClipboardList className="h-4 w-4" />
            Plataforma de alquileres todo en uno
          </p>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                Vende, administra y cobra tus alquileres con una operación profesional.
              </h1>
              <p className="max-w-xl text-slate-300 md:text-lg">
                Convierte la gestión diaria de propiedades en un proceso simple, claro y escalable. Desde la captación del
                inquilino hasta la cobranza mensual, este sistema te ayuda a crecer con orden.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                  <Link href={session ? "/dashboard" : "/login"}>{session ? "Ir a mi panel" : "Solicitar demo"}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-slate-600 bg-transparent hover:bg-slate-800">
                  <Link href="#modulos">Ver módulos</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-900/30">
              <h2 className="mb-4 text-xl font-bold">¿Qué ganas al implementarlo?</h2>
              <ul className="space-y-3 text-sm text-slate-200 md:text-base">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="modulos" className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Módulos clave</p>
          <h3 className="text-3xl font-bold">Todo lo que necesitas para operar y vender más.</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <Icon className="mb-4 h-8 w-8 text-cyan-300" />
                <h4 className="mb-2 text-lg font-semibold">{module.title}</h4>
                <p className="text-sm text-slate-300">{module.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-5 px-6 py-12 md:flex-row md:items-center md:px-10">
          <div>
            <h4 className="text-2xl font-bold">Haz que cada inmueble sea más rentable.</h4>
            <p className="text-slate-300">Empieza hoy y transforma tu gestión de alquileres en una ventaja competitiva.</p>
          </div>
          <Button asChild size="lg" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            <Link href={session ? "/dashboard" : "/login"}>{session ? "Entrar al sistema" : "Comenzar ahora"}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
