-- CreateTable
CREATE TABLE `GastoApartamento` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `apartamentoId` VARCHAR(191) NOT NULL,
  `fecha` DATETIME(3) NOT NULL,
  `categoria` ENUM('MANTENIMIENTO', 'REPARACION', 'SERVICIO_DUENO', 'LIMPIEZA', 'MOBILIARIO', 'COMISION', 'IMPUESTO', 'EXTRAORDINARIO', 'OTRO') NOT NULL,
  `concepto` VARCHAR(191) NOT NULL,
  `descripcion` VARCHAR(191) NULL,
  `monto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `extraordinario` BOOLEAN NOT NULL DEFAULT false,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  INDEX `GastoApartamento_tenantId_idx`(`tenantId`),
  INDEX `GastoApartamento_apartamentoId_idx`(`apartamentoId`),
  INDEX `GastoApartamento_fecha_idx`(`fecha`),
  INDEX `GastoApartamento_categoria_idx`(`categoria`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GastoApartamento` ADD CONSTRAINT `GastoApartamento_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `GastoApartamento` ADD CONSTRAINT `GastoApartamento_apartamentoId_fkey` FOREIGN KEY (`apartamentoId`) REFERENCES `Apartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


-- Seed permissions for existing tenants
INSERT INTO `Permiso` (`id`, `tenantId`, `nombre`, `descripcion`, `createAt`, `updateAt`, `activo`, `esPermisoSistema`)
SELECT UUID(), t.`id`, 'ver_gastos', 'Permite ver gastos y rentabilidad por propiedad', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), true, false
FROM `Tenant` t
WHERE t.`slug` <> 'platform-root'
  AND NOT EXISTS (SELECT 1 FROM `Permiso` p WHERE p.`tenantId` = t.`id` AND p.`nombre` = 'ver_gastos');

INSERT INTO `Permiso` (`id`, `tenantId`, `nombre`, `descripcion`, `createAt`, `updateAt`, `activo`, `esPermisoSistema`)
SELECT UUID(), t.`id`, 'crear_gasto', 'Permite registrar gastos por propiedad', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), true, false
FROM `Tenant` t
WHERE t.`slug` <> 'platform-root'
  AND NOT EXISTS (SELECT 1 FROM `Permiso` p WHERE p.`tenantId` = t.`id` AND p.`nombre` = 'crear_gasto');

INSERT INTO `Permiso` (`id`, `tenantId`, `nombre`, `descripcion`, `createAt`, `updateAt`, `activo`, `esPermisoSistema`)
SELECT UUID(), t.`id`, 'editar_gasto', 'Permite editar gastos por propiedad', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), true, false
FROM `Tenant` t
WHERE t.`slug` <> 'platform-root'
  AND NOT EXISTS (SELECT 1 FROM `Permiso` p WHERE p.`tenantId` = t.`id` AND p.`nombre` = 'editar_gasto');

INSERT INTO `RolPermiso` (`id`, `tenantId`, `rolId`, `permisoId`, `createAt`)
SELECT UUID(), r.`tenantId`, r.`id`, p.`id`, CURRENT_TIMESTAMP(3)
FROM `Rol` r
INNER JOIN `Permiso` p ON p.`tenantId` = r.`tenantId` AND p.`nombre` IN ('ver_gastos', 'crear_gasto', 'editar_gasto')
WHERE r.`nombre` = 'administrador'
  AND NOT EXISTS (
    SELECT 1 FROM `RolPermiso` rp
    WHERE rp.`tenantId` = r.`tenantId`
      AND rp.`rolId` = r.`id`
      AND rp.`permisoId` = p.`id`
  );
