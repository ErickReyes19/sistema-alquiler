import HeaderComponent from "@/components/HeaderComponent"
import { UserRoundCog } from "lucide-react"

import { requireTenantSession } from "@/lib/tenant-session"

import { ProfilePasswordForm } from "./components/profile-password-form"

export default async function PerfilPage() {
  const session = await requireTenantSession()

  return (
    <div className="container mx-auto py-2 space-y-6">
      <HeaderComponent
        Icon={UserRoundCog}
        description="Gestiona la configuración de tu perfil"
        screenName="Perfil"
      />

      <ProfilePasswordForm username={session.User} />
    </div>
  )
}
