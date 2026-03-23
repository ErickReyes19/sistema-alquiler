-- CreateTable
CREATE TABLE `MantenimientoIncidencia` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `apartamentoId` VARCHAR(191) NOT NULL,
  `contratoId` VARCHAR(191) NULL,
  `tipo` ENUM('TICKET', 'DANIO_REPORTADO', 'PREVENTIVO', 'CORRECTIVO') NOT NULL,
  `origen` ENUM('INQUILINO', 'ADMINISTRACION', 'INSPECCION', 'PROPIETARIO') NOT NULL DEFAULT 'ADMINISTRACION',
  `titulo` VARCHAR(191) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `proveedorAsignado` VARCHAR(191) NULL,
  `costoEstimado` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `costoReal` DECIMAL(65, 30) NULL,
  `fechaReporte` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fechaAtencion` DATETIME(3) NULL,
  `afectaDisponibilidad` BOOLEAN NOT NULL DEFAULT false,
  `estado` ENUM('REPORTADO', 'EN_PROCESO', 'RESUELTO') NOT NULL DEFAULT 'REPORTADO',
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  INDEX `MantenimientoIncidencia_tenantId_idx`(`tenantId`),
  INDEX `MantenimientoIncidencia_apartamentoId_idx`(`apartamentoId`),
  INDEX `MantenimientoIncidencia_contratoId_idx`(`contratoId`),
  INDEX `MantenimientoIncidencia_estado_fechaReporte_idx`(`estado`, `fechaReporte`),
  INDEX `MantenimientoIncidencia_tipo_idx`(`tipo`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MantenimientoIncidencia` ADD CONSTRAINT `MantenimientoIncidencia_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `MantenimientoIncidencia` ADD CONSTRAINT `MantenimientoIncidencia_apartamentoId_fkey` FOREIGN KEY (`apartamentoId`) REFERENCES `Apartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `MantenimientoIncidencia` ADD CONSTRAINT `MantenimientoIncidencia_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed permissions for existing tenants
INSERT INTO `Permiso` (`id`, `tenantId`, `nombre`, `descripcion`, `createAt`, `updateAt`, `activo`, `esPermisoSistema`)
SELECT UUID(), t.`id`, 'ver_mantenimientos', 'Permite ver tickets, incidencias y mantenimiento por propiedad', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), true, false
FROM `Tenant` t
WHERE t.`slug` <> 'platform-root'
  AND NOT EXISTS (SELECT 1 FROM `Permiso` p WHERE p.`tenantId` = t.`id` AND p.`nombre` = 'ver_mantenimientos');

INSERT INTO `Permiso` (`id`, `tenantId`, `nombre`, `descripcion`, `createAt`, `updateAt`, `activo`, `esPermisoSistema`)
SELECT UUID(), t.`id`, 'crear_mantenimiento', 'Permite registrar tickets e incidencias de mantenimiento', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), true, false
FROM `Tenant` t
WHERE t.`slug` <> 'platform-root'
  AND NOT EXISTS (SELECT 1 FROM `Permiso` p WHERE p.`tenantId` = t.`id` AND p.`nombre` = 'crear_mantenimiento');

INSERT INTO `Permiso` (`id`, `tenantId`, `nombre`, `descripcion`, `createAt`, `updateAt`, `activo`, `esPermisoSistema`)
SELECT UUID(), t.`id`, 'editar_mantenimiento', 'Permite editar incidencias y cerrar mantenimientos', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3), true, false
FROM `Tenant` t
WHERE t.`slug` <> 'platform-root'
  AND NOT EXISTS (SELECT 1 FROM `Permiso` p WHERE p.`tenantId` = t.`id` AND p.`nombre` = 'editar_mantenimiento');

INSERT INTO `RolPermiso` (`id`, `tenantId`, `rolId`, `permisoId`, `createAt`)
SELECT UUID(), r.`tenantId`, r.`id`, p.`id`, CURRENT_TIMESTAMP(3)
FROM `Rol` r
INNER JOIN `Permiso` p ON p.`tenantId` = r.`tenantId` AND p.`nombre` IN ('ver_mantenimientos', 'crear_mantenimiento', 'editar_mantenimiento')
WHERE r.`nombre` = 'administrador'
  AND NOT EXISTS (
    SELECT 1 FROM `RolPermiso` rp
    WHERE rp.`tenantId` = r.`tenantId`
      AND rp.`rolId` = r.`id`
      AND rp.`permisoId` = p.`id`
  );
