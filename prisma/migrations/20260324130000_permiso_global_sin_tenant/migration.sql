-- 1) Reapuntar RolPermiso a un único permiso por nombre (si existieran duplicados históricos)
UPDATE `RolPermiso` rp
INNER JOIN `Permiso` p ON p.`id` = rp.`permisoId`
INNER JOIN (
  SELECT `nombre`, MIN(`id`) AS keep_id
  FROM `Permiso`
  GROUP BY `nombre`
) canon ON canon.`nombre` = p.`nombre`
SET rp.`permisoId` = canon.keep_id;

-- 2) Limpiar duplicados de RolPermiso que puedan surgir por el reapunte
DELETE rp
FROM `RolPermiso` rp
INNER JOIN `RolPermiso` rp2
  ON rp.`tenantId` = rp2.`tenantId`
 AND rp.`rolId` = rp2.`rolId`
 AND rp.`permisoId` = rp2.`permisoId`
 AND rp.`id` > rp2.`id`;

-- 3) Eliminar permisos duplicados por nombre conservando uno por cada nombre
DELETE p
FROM `Permiso` p
INNER JOIN (
  SELECT `nombre`, MIN(`id`) AS keep_id
  FROM `Permiso`
  GROUP BY `nombre`
) canon ON canon.`nombre` = p.`nombre`
WHERE p.`id` <> canon.keep_id;

-- 4) Convertir Permiso en catálogo global (sin tenantId)
ALTER TABLE `Permiso` DROP FOREIGN KEY `Permiso_tenantId_fkey`;
DROP INDEX `Permiso_tenantId_idx` ON `Permiso`;
DROP INDEX `Permiso_tenantId_nombre_key` ON `Permiso`;
ALTER TABLE `Permiso` DROP COLUMN `tenantId`;
CREATE UNIQUE INDEX `Permiso_nombre_key` ON `Permiso`(`nombre`);
