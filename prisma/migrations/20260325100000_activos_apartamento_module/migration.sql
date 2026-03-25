-- AlterTable
ALTER TABLE `GastoApartamento`
  ADD COLUMN `apartamentoActivoId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `TipoActivoApartamento` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `nombre` VARCHAR(191) NOT NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,
  `activo` BOOLEAN NOT NULL DEFAULT true,

  UNIQUE INDEX `TipoActivoApartamento_tenantId_nombre_key`(`tenantId`, `nombre`),
  INDEX `TipoActivoApartamento_tenantId_idx`(`tenantId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApartamentoActivo` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `apartamentoId` VARCHAR(191) NOT NULL,
  `tipoActivoId` VARCHAR(191) NOT NULL,
  `tipoHabitacionId` VARCHAR(191) NULL,
  `identificador` VARCHAR(191) NOT NULL,
  `descripcion` VARCHAR(191) NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,
  `activo` BOOLEAN NOT NULL DEFAULT true,

  UNIQUE INDEX `ApartamentoActivo_tenantId_apartamentoId_identificador_key`(`tenantId`, `apartamentoId`, `identificador`),
  INDEX `ApartamentoActivo_tenantId_idx`(`tenantId`),
  INDEX `ApartamentoActivo_apartamentoId_idx`(`apartamentoId`),
  INDEX `ApartamentoActivo_tipoActivoId_idx`(`tipoActivoId`),
  INDEX `ApartamentoActivo_tipoHabitacionId_idx`(`tipoHabitacionId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `GastoApartamento_apartamentoActivoId_idx` ON `GastoApartamento`(`apartamentoActivoId`);

-- AddForeignKey
ALTER TABLE `GastoApartamento` ADD CONSTRAINT `GastoApartamento_apartamentoActivoId_fkey`
  FOREIGN KEY (`apartamentoActivoId`) REFERENCES `ApartamentoActivo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoActivoApartamento` ADD CONSTRAINT `TipoActivoApartamento_tenantId_fkey`
  FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartamentoActivo` ADD CONSTRAINT `ApartamentoActivo_tenantId_fkey`
  FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartamentoActivo` ADD CONSTRAINT `ApartamentoActivo_apartamentoId_fkey`
  FOREIGN KEY (`apartamentoId`) REFERENCES `Apartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartamentoActivo` ADD CONSTRAINT `ApartamentoActivo_tipoActivoId_fkey`
  FOREIGN KEY (`tipoActivoId`) REFERENCES `TipoActivoApartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartamentoActivo` ADD CONSTRAINT `ApartamentoActivo_tipoHabitacionId_fkey`
  FOREIGN KEY (`tipoHabitacionId`) REFERENCES `TiposHabitacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
