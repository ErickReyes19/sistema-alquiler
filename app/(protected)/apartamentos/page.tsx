import { getSessionPermisos } from '@/auth'
import HeaderComponent from '@/components/HeaderComponent'
import NoAcceso from '@/components/noAccess'
import { Home } from 'lucide-react'
import { getApartamentosCompleto } from './actions'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import ApartamentoListMobile from './components/apartamento-list-mobile'
// import ApartamentoListMobile from './components/apartamento-list-mobile'

export default async function ApartamentosPage() {
  // Validar permisos de sesión
  const permisos = await getSessionPermisos()
  if (!permisos?.includes('ver_apartamentos')) {
    return <NoAcceso />
  }

  // Obtener sólo los apartamentos activos con sus habitaciones
  const data = await getApartamentosCompleto()

  return (
    <div className="container mx-auto py-4">
      <HeaderComponent
        Icon={Home}
        description="En este apartado podrá ver todos los apartamentos activos"
        screenName="Apartamentos"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ApartamentoListMobile   apartamentos={data} />
      </div>
    </div>
  )
}
