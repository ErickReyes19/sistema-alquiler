-- AlterTable
ALTER TABLE `Contratos`
  ADD COLUMN `preavisoDias` INTEGER NOT NULL DEFAULT 30,
  ADD COLUMN `estadoRenovacion` ENUM('SIN_GESTION', 'ALERTA_GENERADA', 'EN_NEGOCIACION', 'RENOVADO', 'NO_RENOVADO') NOT NULL DEFAULT 'SIN_GESTION',
  ADD COLUMN `fechaUltimaRenovacion` DATETIME(3) NULL,
  ADD COLUMN `fechaDesocupacion` DATETIME(3) NULL,
  ADD COLUMN `motivoCancelacion` TEXT NULL,
  ADD COLUMN `notasCierre` TEXT NULL,
  ADD INDEX `Contratos_fechaFin_idx`(`fechaFin`),
  ADD INDEX `Contratos_estadoRenovacion_idx`(`estadoRenovacion`);

-- CreateTable
CREATE TABLE `RenovacionContrato` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `contratoId` VARCHAR(191) NOT NULL,
  `fechaGestion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fechaInicioRenovada` DATETIME(3) NOT NULL,
  `fechaFinRenovada` DATETIME(3) NULL,
  `montoAnterior` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `montoNuevo` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `porcentajeAjuste` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `estado` ENUM('SIN_GESTION', 'ALERTA_GENERADA', 'EN_NEGOCIACION', 'RENOVADO', 'NO_RENOVADO') NOT NULL DEFAULT 'RENOVADO',
  `notas` TEXT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  INDEX `RenovacionContrato_tenantId_idx`(`tenantId`),
  INDEX `RenovacionContrato_contratoId_idx`(`contratoId`),
  INDEX `RenovacionContrato_fechaGestion_idx`(`fechaGestion`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AjusteRentaContrato` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `contratoId` VARCHAR(191) NOT NULL,
  `fechaAplicacion` DATETIME(3) NOT NULL,
  `montoAnterior` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `montoNuevo` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `porcentajeAjuste` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `motivo` TEXT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  INDEX `AjusteRentaContrato_tenantId_idx`(`tenantId`),
  INDEX `AjusteRentaContrato_contratoId_idx`(`contratoId`),
  INDEX `AjusteRentaContrato_fechaAplicacion_idx`(`fechaAplicacion`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoInventario` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `contratoId` VARCHAR(191) NOT NULL,
  `tipo` ENUM('ENTRADA', 'SALIDA') NOT NULL,
  `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `observaciones` TEXT NULL,
  `items` JSON NOT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `ContratoInventario_contratoId_tipo_key`(`contratoId`, `tipo`),
  INDEX `ContratoInventario_tenantId_idx`(`tenantId`),
  INDEX `ContratoInventario_contratoId_idx`(`contratoId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoEntrega` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `contratoId` VARCHAR(191) NOT NULL,
  `fechaEntrega` DATETIME(3) NOT NULL,
  `estadoInmueble` VARCHAR(191) NOT NULL,
  `cargosDanos` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `saldoPendiente` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `motivoCancelacion` TEXT NULL,
  `observaciones` TEXT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `ContratoEntrega_contratoId_key`(`contratoId`),
  INDEX `ContratoEntrega_tenantId_idx`(`tenantId`),
  INDEX `ContratoEntrega_fechaEntrega_idx`(`fechaEntrega`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RenovacionContrato` ADD CONSTRAINT `RenovacionContrato_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `RenovacionContrato` ADD CONSTRAINT `RenovacionContrato_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `AjusteRentaContrato` ADD CONSTRAINT `AjusteRentaContrato_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `AjusteRentaContrato` ADD CONSTRAINT `AjusteRentaContrato_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `ContratoInventario` ADD CONSTRAINT `ContratoInventario_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `ContratoInventario` ADD CONSTRAINT `ContratoInventario_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `ContratoEntrega` ADD CONSTRAINT `ContratoEntrega_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `ContratoEntrega` ADD CONSTRAINT `ContratoEntrega_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
