import { getSession } from "@/auth";
import ToggleThemeButton from "@/components/button-theme";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Handshake,
  ShieldCheck,
  Sparkles,
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

const quickFacts = [
  "Onboarding guiado para empezar en menos tiempo.",
  "Pantallas pensadas para equipos administrativos y comerciales.",
  "Flujo completo desde captación hasta renovación de contrato.",
];

const steps = [
  {
    title: "Configura tu operación",
    description: "Carga apartamentos, reglas y servicios en un flujo rápido y ordenado.",
  },
  {
    title: "Digitaliza contratos y cobros",
    description: "Activa expedientes digitales, recibos y seguimiento de pagos sin planillas sueltas.",
  },
  {
    title: "Mide y mejora cada mes",
    description: "Usa reportes para detectar oportunidades y tomar decisiones con datos.",
  },
];

export default async function LandingPage() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold md:text-base">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            Sistema de Alquileres
          </Link>
          <div className="flex items-center gap-2">
            <ToggleThemeButton />
            <Button asChild variant="outline" className="border-slate-300 dark:border-slate-700">
              <Link href={session ? "/dashboard" : "/login"}>{session ? "Mi panel" : "Iniciar sesión"}</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.18),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-10 md:py-24">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300">
            <ClipboardList className="h-4 w-4" />
            Plataforma de alquileres todo en uno
          </p>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl dark:text-slate-100">
                Vende, administra y cobra tus alquileres con una operación profesional.
              </h1>
              <p className="max-w-xl text-slate-700 md:text-lg dark:text-slate-300">
                Convierte la gestión diaria de propiedades en un proceso simple, claro y escalable. Desde la captación del
                inquilino hasta la cobranza mensual, este sistema te ayuda a crecer con orden y tranquilidad.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                  <Link href={session ? "/dashboard" : "/login"}>{session ? "Ir a mi panel" : "Solicitar demo"}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-300 bg-transparent hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                >
                  <Link href="#modulos">Ver módulos</Link>
                </Button>
              </div>
              <div className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                {quickFacts.map((fact) => (
                  <p key={fact} className="flex items-start gap-2">
                    <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                    <span>{fact}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-cyan-900/30">
              <h2 className="mb-4 text-xl font-bold">¿Qué ganas al implementarlo?</h2>
              <ul className="space-y-3 text-sm text-slate-700 md:text-base dark:text-slate-200">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
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
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-300">Módulos clave</p>
          <h3 className="text-3xl font-bold">Todo lo que necesitas para operar, ordenar y vender más.</h3>
          <p className="max-w-3xl text-slate-600 dark:text-slate-300">
            Diseñado para inmobiliarias, equipos administrativos y gestores independientes que necesitan una plataforma más
            humana, simple de usar y lista para crecer con su negocio.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-cyan-400/40 dark:border-slate-800 dark:bg-slate-900"
              >
                <Icon className="mb-4 h-8 w-8 text-cyan-600 dark:text-cyan-300" />
                <h4 className="mb-2 text-lg font-semibold">{module.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{module.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-300">Cómo funciona</p>
          <h4 className="mb-8 text-2xl font-bold">Empieza en 3 pasos simples</h4>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="mb-3 text-sm font-bold text-cyan-600 dark:text-cyan-300">Paso {index + 1}</p>
                <h5 className="mb-2 text-lg font-semibold">{step.title}</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-5 px-6 py-12 md:flex-row md:items-center md:px-10">
          <div>
            <h4 className="text-2xl font-bold">Haz que cada inmueble sea más rentable.</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Empieza hoy y transforma tu gestión de alquileres en una ventaja competitiva.
            </p>
          </div>
          <Button asChild size="lg" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            <Link href={session ? "/dashboard" : "/login"}>{session ? "Entrar al sistema" : "Comenzar ahora"}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
