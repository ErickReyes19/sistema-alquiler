-- CreateTable
CREATE TABLE `ExpedienteArrendamiento` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `inquilinoId` VARCHAR(191) NOT NULL,
    `ocupacion` VARCHAR(191) NULL,
    `empresa` VARCHAR(191) NULL,
    `ingresosMensuales` DECIMAL(10, 2) NULL,
    `historialAlquiler` TEXT NULL,
    `motivoSolicitud` TEXT NULL,
    `estadoDecision` ENUM('PENDIENTE', 'APROBADO', 'RECHAZADO') NOT NULL DEFAULT 'PENDIENTE',
    `decisionTomadaPor` VARCHAR(191) NULL,
    `fechaDecision` DATETIME(3) NULL,
    `motivoDecision` TEXT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ExpedienteArrendamiento_inquilinoId_key`(`inquilinoId`),
    INDEX `ExpedienteArrendamiento_tenantId_idx`(`tenantId`),
    INDEX `ExpedienteArrendamiento_estadoDecision_idx`(`estadoDecision`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReferenciaArrendamiento` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `expedienteArrendamientoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('PERSONAL', 'LABORAL', 'ARRENDADOR_ANTERIOR') NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NULL,
    `relacion` VARCHAR(191) NULL,
    `notas` TEXT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `ReferenciaArrendamiento_tenantId_idx`(`tenantId`),
    INDEX `ReferenciaArrendamiento_expedienteArrendamientoId_idx`(`expedienteArrendamientoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GaranteArrendamiento` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `expedienteArrendamientoId` VARCHAR(191) NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NULL,
    `empresa` VARCHAR(191) NULL,
    `ingresosMensuales` DECIMAL(10, 2) NULL,
    `notas` TEXT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `GaranteArrendamiento_tenantId_idx`(`tenantId`),
    INDEX `GaranteArrendamiento_expedienteArrendamientoId_idx`(`expedienteArrendamientoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExpedienteArrendamiento` ADD CONSTRAINT `ExpedienteArrendamiento_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpedienteArrendamiento` ADD CONSTRAINT `ExpedienteArrendamiento_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferenciaArrendamiento` ADD CONSTRAINT `ReferenciaArrendamiento_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferenciaArrendamiento` ADD CONSTRAINT `ReferenciaArrendamiento_expedienteArrendamientoId_fkey` FOREIGN KEY (`expedienteArrendamientoId`) REFERENCES `ExpedienteArrendamiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaranteArrendamiento` ADD CONSTRAINT `GaranteArrendamiento_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GaranteArrendamiento` ADD CONSTRAINT `GaranteArrendamiento_expedienteArrendamientoId_fkey` FOREIGN KEY (`expedienteArrendamientoId`) REFERENCES `ExpedienteArrendamiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
