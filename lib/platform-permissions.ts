export const ROOT_PERMISSION_NAMES = [
  'ver_tenants',
  'crear_tenant',
  'ver_usuarios_tenant',
  'crear_usuario_tenant',
] as const

export const TENANT_PERMISSION_NAMES = [
  'ver_roles',
  'crear_roles',
  'editar_roles',
  'ver_usuarios',
  'crear_usuario',
  'editar_usuario',
  'ver_inquilinos',
  'crear_inquilino',
  'editar_inquilino',
  'ver_acompanantes',
  'editar_tipo_habitacion',
  'ver_tipos_habitacion',
  'crear_tipo_habitacion',
  'ver_apartamentos',
  'crear_apartamento',
  'editar_apartamento',
  'crear_servicio',
  'ver_servicios',
  'editar_servicio',
  'ver_contratos',
  'crear_contrato',
  'editar_contrato',
  'ver_recibos',
  'crear_recibo',
  'editar_recibo',
  'ver_cobranza',
  'ver_gastos',
  'crear_gasto',
  'editar_gasto',
] as const

export const SYSTEM_HIDDEN_PERMISSION_NAMES = new Set<string>([
  ...ROOT_PERMISSION_NAMES,
])
