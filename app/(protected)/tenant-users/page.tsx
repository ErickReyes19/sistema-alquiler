import HeaderComponent from "@/components/HeaderComponent"
import NoAcceso from "@/components/noAccess"
import { Users } from "lucide-react"

import { getSessionPermisos } from "@/auth"
import { getTenantAssignedUsers, getTenantOptions } from "./actions"
import { TenantUserForm } from "./components/form"

export default async function TenantUsersPage() {
  const permisos = await getSessionPermisos()

  if (!permisos?.includes('ver_usuarios_tenant')) {
    return <NoAcceso />
  }

  const [users, tenants] = await Promise.all([
    getTenantAssignedUsers(),
    getTenantOptions(),
  ])

  return (
    <div className="container mx-auto py-2 space-y-6">
      <HeaderComponent
        Icon={Users}
        description="Aquí el root crea usuarios administradores y los asigna a un tenant"
        screenName="Usuarios por tenant"
      />

      <TenantUserForm tenants={tenants} />

      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">Usuario</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Tenant</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.nombre}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.tenantNombre}</td>
                <td className="p-3">{user.tenantSlug}</td>
                <td className="p-3">{user.activo ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="p-3 text-muted-foreground" colSpan={5}>No hay usuarios asignados a tenants todavía.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
