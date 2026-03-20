import { getSessionUsuario } from "@/auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Building2, ChevronDown, ChevronUp, HouseIcon, LayersIcon, ListOrderedIcon, Settings, UserCog, UserIcon, Users2 } from 'lucide-react';
import Link from "next/link";
import ToggleThemeButton from "../components/button-theme";
import { NavUser } from "./nav-user";

const rootItems = [
  {
    title: "Tenants",
    url: "/tenants",
    icon: Building2,
    permiso: "ver_tenants",
  },
  {
    title: "Usuarios por tenant",
    url: "/tenant-users",
    icon: UserCog,
    permiso: "ver_usuarios_tenant",
  },
]

const mantenimientoItems = [
  {
    title: "Roles",
    url: "/roles",
    icon: LayersIcon,
    permiso: "ver_roles",
  },
  {
    title: "Permisos",
    url: "/permisos",
    icon: LayersIcon,
    permiso: "ver_permisos",
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: UserIcon,
    permiso: "ver_usuarios",
  }
];

const items = [
  {
    title: "Apartamentos",
    url: "/apartamentos",
    icon: HouseIcon,
    permiso: "ver_apartamentos",
  },
  {
    title: "Tipo de habitaciones",
    url: "/tipo-habitacion",
    icon: HouseIcon,
    permiso: "ver_tipos_habitacion",
  },
  {
    title: "Inquilinos",
    url: "/inquilinos",
    icon: Users2,
    permiso: "ver_inquilinos",
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: ListOrderedIcon,
    permiso: "ver_servicios",
  },
  {
    title: "Contratos",
    url: "/contratos",
    icon: ListOrderedIcon,
    permiso: "ver_contratos",
  },
];

export async function AppSidebar() {
  const usuario = await getSessionUsuario();
  const permisosUsuario = usuario?.Permiso || [];

  const filteredRootItems = rootItems.filter((item) => permisosUsuario.includes(item.permiso))
  const filteredItems = items.filter(item => permisosUsuario.includes(item.permiso));
  const filteredMantenimientoItems = mantenimientoItems.filter(item => permisosUsuario.includes(item.permiso));
  const showMantenimiento = filteredMantenimientoItems.length > 0;
  const showRootModules = filteredRootItems.length > 0

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <span>Sistema Autogestión MP</span>
            <ToggleThemeButton />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {showRootModules
                ? filteredRootItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon size={16} className="p-0" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : filteredItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon size={16} className="p-0" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

              {!showRootModules && showMantenimiento && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Settings size={16} className="p-0" />
                        <span>Mantenimiento</span>
                        <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {filteredMantenimientoItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{usuario && <NavUser usuario={usuario} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
