export function resolveModulePermissions(pathname: string): string[] | null {
  if (pathname.startsWith("/dashboard")) return null;
  if (pathname.startsWith("/tenants")) return ["ver_tenants"];
  if (pathname.startsWith("/tenant-users")) return ["ver_usuarios_tenant"];

  if (pathname === "/roles/create") return ["crear_roles"];
  if (pathname.startsWith("/roles/") && pathname.endsWith("/edit")) return ["editar_roles"];
  if (pathname.startsWith("/roles")) return ["ver_roles"];

  if (pathname.startsWith("/permisos")) return ["ver_permisos"];

  if (pathname === "/usuarios/create") return ["crear_usuario"];
  if (pathname.startsWith("/usuarios/") && pathname.endsWith("/edit")) return ["editar_usuario"];
  if (pathname.startsWith("/usuarios")) return ["ver_usuarios"];

  if (pathname === "/inquilinos/create") return ["crear_inquilino"];
  if (pathname.startsWith("/inquilinos/") && pathname.endsWith("/edit")) return ["editar_inquilino"];
  if (pathname.startsWith("/inquilinos")) return ["ver_inquilinos"];

  if (pathname === "/tipo-habitacion/create") return ["crear_tipo_habitacion"];
  if (pathname.startsWith("/tipo-habitacion/") && pathname.endsWith("/edit")) return ["editar_tipo_habitacion"];
  if (pathname.startsWith("/tipo-habitacion")) return ["ver_tipos_habitacion"];

  if (pathname === "/apartamentos/create") return ["crear_apartamento"];
  if (pathname.startsWith("/apartamentos/") && pathname.endsWith("/edit")) return ["editar_apartamento"];
  if (pathname.startsWith("/apartamentos")) return ["ver_apartamentos"];

  if (pathname === "/servicios/create") return ["crear_servicio"];
  if (pathname.startsWith("/servicios/") && pathname.endsWith("/edit")) return ["editar_servicio"];
  if (pathname.startsWith("/servicios")) return ["ver_servicios"];

  if (pathname.includes("/recibos/")) {
    if (pathname.endsWith("/create")) return ["crear_recibo"];
    if (pathname.endsWith("/edit")) return ["editar_recibo"];
    return ["ver_contratos"];
  }

  if (pathname === "/contratos/create") return ["crear_contrato"];
  if (pathname.startsWith("/contratos/") && pathname.endsWith("/edit")) return ["editar_contrato"];
  if (pathname.startsWith("/contratos")) return ["ver_contratos"];

  if (pathname.startsWith("/contrato")) return ["ver_contratos"];
  if (pathname.startsWith("/recibo")) return ["ver_recibos"];

  return null;
}
