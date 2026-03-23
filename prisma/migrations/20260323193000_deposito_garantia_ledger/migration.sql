-- AlterTable
CREATE TABLE `DepositoGarantia` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `monto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `fechaRecepcion` DATETIME(3) NULL,
    `estado` ENUM('PENDIENTE', 'RECIBIDO', 'PARCIALMENTE_DEVUELTO', 'APLICADO', 'DEVUELTO') NOT NULL DEFAULT 'PENDIENTE',
    `montoDevuelto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `montoAplicadoDanos` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `montoAplicadoSaldo` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `saldoRetenido` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `reciboRecepcion` VARCHAR(191) NULL,
    `reciboLiquidacion` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DepositoGarantia_contratoId_key`(`contratoId`),
    INDEX `DepositoGarantia_tenantId_idx`(`tenantId`),
    INDEX `DepositoGarantia_estado_idx`(`estado`),
    INDEX `DepositoGarantia_fechaRecepcion_idx`(`fechaRecepcion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `MovimientoDepositoGarantia` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `depositoGarantiaId` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` ENUM('RECIBIDO', 'APLICADO_DANOS', 'APLICADO_SALDO_PENDIENTE', 'DEVOLUCION_PARCIAL', 'DEVOLUCION_TOTAL', 'AJUSTE') NOT NULL,
    `monto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `descripcion` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `MovimientoDepositoGarantia_tenantId_idx`(`tenantId`),
    INDEX `MovimientoDepositoGarantia_depositoGarantiaId_idx`(`depositoGarantiaId`),
    INDEX `MovimientoDepositoGarantia_fecha_idx`(`fecha`),
    INDEX `MovimientoDepositoGarantia_tipo_idx`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `DepositoGarantia`
    ADD CONSTRAINT `DepositoGarantia_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `DepositoGarantia_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `MovimientoDepositoGarantia`
    ADD CONSTRAINT `MovimientoDepositoGarantia_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `MovimientoDepositoGarantia_depositoGarantiaId_fkey` FOREIGN KEY (`depositoGarantiaId`) REFERENCES `DepositoGarantia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
