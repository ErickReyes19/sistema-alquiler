-- 1) Mover la clave desde Servicios a ApartamentoServicios (por apartamento)
ALTER TABLE `ApartamentoServicios`
  ADD COLUMN `clave` VARCHAR(191) NULL;

UPDATE `ApartamentoServicios` aps
INNER JOIN `Servicios` s ON s.`id` = aps.`servicioId`
SET aps.`clave` = s.`clave`
WHERE aps.`clave` IS NULL;

-- 2) Eliminar la clave global del servicio
ALTER TABLE `Servicios`
  DROP COLUMN `clave`;
