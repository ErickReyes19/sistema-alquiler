-- AlterTable
ALTER TABLE `Recibos`
  ADD COLUMN `fechaVencimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  ADD COLUMN `estado` ENUM('PENDIENTE', 'PAGADO', 'VENCIDO', 'PARCIALMENTE_PAGADO') NOT NULL DEFAULT 'PENDIENTE',
  ADD COLUMN `cargoMora` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  ADD COLUMN `saldoPendiente` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  ADD COLUMN `observacionesCobranza` VARCHAR(191) NULL;

UPDATE `Recibos`
SET
  `fechaVencimiento` = `fechaPago`,
  `estado` = 'PAGADO',
  `saldoPendiente` = 0.00,
  `cargoMora` = 0.00
WHERE 1 = 1;

-- CreateTable
CREATE TABLE `PagoRecibo` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `reciboId` VARCHAR(191) NOT NULL,
  `fechaPago` DATETIME(3) NOT NULL,
  `monto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `referencia` VARCHAR(191) NULL,
  `nota` VARCHAR(191) NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  INDEX `PagoRecibo_tenantId_idx`(`tenantId`),
  INDEX `PagoRecibo_reciboId_idx`(`reciboId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromesaPago` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `reciboId` VARCHAR(191) NOT NULL,
  `fechaPrometida` DATETIME(3) NOT NULL,
  `montoPrometido` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
  `nota` VARCHAR(191) NULL,
  `cumplida` BOOLEAN NOT NULL DEFAULT false,
  `fechaCumplimiento` DATETIME(3) NULL,
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` DATETIME(3) NOT NULL,

  INDEX `PromesaPago_tenantId_idx`(`tenantId`),
  INDEX `PromesaPago_reciboId_idx`(`reciboId`),
  INDEX `PromesaPago_fechaPrometida_idx`(`fechaPrometida`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordatorioCobranza` (
  `id` VARCHAR(191) NOT NULL,
  `tenantId` VARCHAR(191) NOT NULL,
  `reciboId` VARCHAR(191) NOT NULL,
  `canal` ENUM('WHATSAPP', 'EMAIL') NOT NULL,
  `destinatario` VARCHAR(191) NOT NULL,
  `mensaje` VARCHAR(191) NOT NULL,
  `enviadoAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  INDEX `RecordatorioCobranza_tenantId_idx`(`tenantId`),
  INDEX `RecordatorioCobranza_reciboId_idx`(`reciboId`),
  INDEX `RecordatorioCobranza_canal_enviadoAt_idx`(`canal`, `enviadoAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Recibos_estado_fechaVencimiento_idx` ON `Recibos`(`estado`, `fechaVencimiento`);

-- AddForeignKey
ALTER TABLE `PagoRecibo` ADD CONSTRAINT `PagoRecibo_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `PagoRecibo` ADD CONSTRAINT `PagoRecibo_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `Recibos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `PromesaPago` ADD CONSTRAINT `PromesaPago_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `PromesaPago` ADD CONSTRAINT `PromesaPago_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `Recibos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `RecordatorioCobranza` ADD CONSTRAINT `RecordatorioCobranza_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `RecordatorioCobranza` ADD CONSTRAINT `RecordatorioCobranza_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `Recibos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
