-- AlterTable
ALTER TABLE `Servicios`
  ADD COLUMN `clave` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Contratos`
  ADD COLUMN `diaPagoMensual` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Regla` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `nombre` VARCHAR(191) NOT NULL,
  `descripcion` TEXT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,
  `activo` BOOLEAN NOT NULL DEFAULT true,

  UNIQUE INDEX `Regla_tenantId_nombre_key`(`tenantId`, `nombre`),
  INDEX `Regla_tenantId_idx`(`tenantId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoRegla` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `contratoId` VARCHAR(191) NOT NULL,
  `reglaId` VARCHAR(191) NOT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `ContratoRegla_tenantId_contratoId_reglaId_key`(`tenantId`, `contratoId`, `reglaId`),
  INDEX `ContratoRegla_tenantId_idx`(`tenantId`),
  INDEX `ContratoRegla_contratoId_idx`(`contratoId`),
  INDEX `ContratoRegla_reglaId_idx`(`reglaId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regla`
  ADD CONSTRAINT `Regla_tenantId_fkey`
  FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoRegla`
  ADD CONSTRAINT `ContratoRegla_tenantId_fkey`
  FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoRegla`
  ADD CONSTRAINT `ContratoRegla_contratoId_fkey`
  FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoRegla`
  ADD CONSTRAINT `ContratoRegla_reglaId_fkey`
  FOREIGN KEY (`reglaId`) REFERENCES `Regla`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;
