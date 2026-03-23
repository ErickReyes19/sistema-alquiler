import { getSession, getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building,
  CalendarClock,
  Coins,
  LayoutDashboard,
  Receipt,
  Wallet,
  Wrench,
} from "lucide-react";
import { redirect } from "next/navigation";

import {
  getDashboardData,
  type DashboardAlertItem,
  type DashboardMetricCard,
  type DashboardRentabilidadItem,
} from "./actions";

const currencyFormatter = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
  maximumFractionDigits: 2,
});

function formatMetricValue(metric: DashboardMetricCard) {
  if (metric.title.includes("Monto") || metric.title.includes("Gastos")) {
    return currencyFormatter.format(metric.value);
  }

  return metric.value.toLocaleString("es-HN");
}

function SummaryCard({
  metric,
  icon: Icon,
}: {
  metric: DashboardMetricCard;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardDescription>{metric.title}</CardDescription>
          <CardTitle className="text-2xl">{formatMetricValue(metric)}</CardTitle>
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
      </CardContent>
    </Card>
  );
}

function AlertList({
  title,
  description,
  items,
  emptyMessage,
}: {
  title: string;
  description: string;
  items: DashboardAlertItem[];
  emptyMessage: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {item.apartamento ? `Apartamento ${item.apartamento}` : "Registro"}
                  </p>
                  {item.inquilino && <p className="text-sm text-muted-foreground">{item.inquilino}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {typeof item.dias === "number" && <Badge variant="outline">{item.dias} días</Badge>}
                  {typeof item.monto === "number" && <Badge variant="destructive">{currencyFormatter.format(item.monto)}</Badge>}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.detalle}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function RentabilidadTable({ items }: { items: DashboardRentabilidadItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rentabilidad por apartamento</CardTitle>
        <CardDescription>
          Ranking mensual basado en renta activa menos costos adicionales configurados en servicios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay contratos activos para calcular rentabilidad.</p>
        ) : (
          items.map((item) => (
            <div key={item.apartamentoId} className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Apartamento {item.apartamento}</p>
                    <Badge variant={item.disponible ? "secondary" : "destructive"}>
                      {item.disponible ? "Operativo" : "Mantenimiento"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Inquilino: {item.inquilino}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.rentabilidad >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-lg font-semibold">{currencyFormatter.format(item.rentabilidad)}</span>
                </div>
              </div>
              <div className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">Ingreso mensual</p>
                  <p className="font-medium">{currencyFormatter.format(item.ingresoMensual)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Gasto estimado</p>
                  <p className="font-medium">{currencyFormatter.format(item.gastoEstimado)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Margen</p>
                  <p className="font-medium">{item.margen.toFixed(1)}%</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Margen operativo</span>
                  <span>{item.margen.toFixed(1)}%</span>
                </div>
                <Progress value={Math.max(0, Math.min(item.margen, 100))} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const session = await getSession();
  const permisos = await getSessionPermisos();

  if (session?.tipoUsuario === "ROOT") {
    redirect("/tenants");
  }

  if (!permisos || permisos.length === 0) {
    return <NoAcceso />;
  }

  const dashboard = await getDashboardData();

  return (
    <div className="container mx-auto space-y-6 py-4">
      <HeaderComponent
        Icon={LayoutDashboard}
        screenName="Dashboard gerencial"
        description="Vista ejecutiva para entender ocupación, cobranza, alertas y rentabilidad del negocio en un solo lugar."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard metric={dashboard.resumen.apartamentosOcupados} icon={Building} />
        <SummaryCard metric={dashboard.resumen.apartamentosVacios} icon={Building} />
        <SummaryCard metric={dashboard.resumen.contratosPorVencer} icon={CalendarClock} />
        <SummaryCard metric={dashboard.resumen.inquilinosConAtraso} icon={AlertTriangle} />
        <SummaryCard metric={dashboard.resumen.montoCobradoMes} icon={Receipt} />
        <SummaryCard metric={dashboard.resumen.montoPendienteMes} icon={Wallet} />
        <SummaryCard metric={dashboard.resumen.gastosMes} icon={Coins} />
        <SummaryCard metric={dashboard.resumen.fueraServicio} icon={Wrench} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ocupación general</CardTitle>
            <CardDescription>
              {dashboard.ocupacion.ocupados} de {dashboard.ocupacion.total} apartamentos activos tienen contrato vigente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>Porcentaje de ocupación</span>
                <span>{dashboard.ocupacion.porcentaje.toFixed(1)}%</span>
              </div>
              <Progress value={dashboard.ocupacion.porcentaje} />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-semibold">{dashboard.ocupacion.total}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Ocupados</p>
                <p className="text-xl font-semibold">{dashboard.ocupacion.ocupados}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Vacíos</p>
                <p className="text-xl font-semibold">{dashboard.ocupacion.vacios}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lectura financiera del mes</CardTitle>
            <CardDescription>Corte correspondiente a {dashboard.metadata.mesActual}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Cobrado</p>
              <p className="text-2xl font-semibold">{currencyFormatter.format(dashboard.resumen.montoCobradoMes.value)}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Pendiente</p>
              <p className="text-2xl font-semibold">{currencyFormatter.format(dashboard.resumen.montoPendienteMes.value)}</p>
            </div>
            <Separator />
            <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
              {dashboard.metadata.gastosEstimados
                ? "Los gastos del mes se estiman con base en los costos adicionales configurados en servicios por apartamento."
                : "Los gastos del mes corresponden a registros operativos reales."}
            </div>
          </CardContent>
        </Card>
      </div>

      <RentabilidadTable items={dashboard.rentabilidadPorApartamento} />

      <div className="grid gap-4 xl:grid-cols-3">
        <AlertList
          title="Contratos por vencer"
          description="Renovaciones o salidas que requieren atención inmediata."
          items={dashboard.alertas.contratosPorVencer}
          emptyMessage="No hay contratos por vencer en los próximos 30 días."
        />
        <AlertList
          title="Inquilinos con atraso"
          description="Contratos activos con diferencia entre renta esperada y cobros del mes."
          items={dashboard.alertas.inquilinosConAtraso}
          emptyMessage="No se detectan atrasos para el mes actual."
        />
        <AlertList
          title="Apartamentos fuera de servicio"
          description="Unidades marcadas como no disponibles para operación."
          items={dashboard.alertas.apartamentosFueraServicio}
          emptyMessage="No hay apartamentos fuera de servicio o en mantenimiento."
        />
      </div>
    </div>
  );
}
