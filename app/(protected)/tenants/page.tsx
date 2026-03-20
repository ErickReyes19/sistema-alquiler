import HeaderComponent from "@/components/HeaderComponent"
import NoAcceso from "@/components/noAccess"
import { Building2 } from "lucide-react"

import { getSessionPermisos } from "@/auth"
import { getPlatformTenants } from "./actions"
import { TenantForm } from "./components/form"

export default async function TenantsPage() {
  const permisos = await getSessionPermisos()

  if (!permisos?.includes('ver_tenants')) {
    return <NoAcceso />
  }

  const tenants = await getPlatformTenants()

  return (
    <div className="container mx-auto py-2 space-y-6">
      <HeaderComponent
        Icon={Building2}
        description="Aquí el usuario root puede crear tenants y ver su estado general"
        screenName="Tenants"
      />

      <TenantForm />

      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Usuarios</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-t">
                <td className="p-3">{tenant.nombre}</td>
                <td className="p-3">{tenant.slug}</td>
                <td className="p-3">{tenant.activo ? 'Activo' : 'Inactivo'}</td>
                <td className="p-3">{tenant.usuarios}</td>
              </tr>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td className="p-3 text-muted-foreground" colSpan={4}>No hay tenants creados todavía.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
