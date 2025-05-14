-- CreateTable
CREATE TABLE `Rol` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Rol_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquilino` (
    `id` VARCHAR(191) NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acompañante` (
    `id` VARCHAR(191) NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `inquilinoId` VARCHAR(191) NOT NULL,
    `Parentesco` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habitaciones` (
    `id` VARCHAR(191) NOT NULL,
    `apartamentoId` VARCHAR(191) NOT NULL,
    `tipoHabitacionId` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activo` BOOLEAN NOT NULL,
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Habitaciones_apartamentoId_fkey`(`apartamentoId`),
    INDEX `Habitaciones_tipoHabitacionId_fkey`(`tipoHabitacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TiposHabitacion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `TiposHabitacion_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Apartamento` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `disponible` BOOLEAN NOT NULL DEFAULT true,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Apartamento_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicios` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Servicios_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApartamentoServicios` (
    `id` VARCHAR(191) NOT NULL,
    `apartamentoId` VARCHAR(191) NOT NULL,
    `servicioId` VARCHAR(191) NOT NULL,
    `incluido` BOOLEAN NOT NULL DEFAULT true,
    `costoAdicional` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `ApartamentoServicios_apartamentoId_fkey`(`apartamentoId`),
    INDEX `ApartamentoServicios_servicioId_fkey`(`servicioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contratos` (
    `id` VARCHAR(191) NOT NULL,
    `inquilinoId` VARCHAR(191) NOT NULL,
    `apartamentoId` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `montoMensual` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Contratos_inquilinoId_fkey`(`inquilinoId`),
    INDEX `Contratos_apartamentoId_fkey`(`apartamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recibos` (
    `id` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `fechaPago` DATETIME(3) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Recibos_contratoId_fkey`(`contratoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReciboDetalles` (
    `id` VARCHAR(191) NOT NULL,
    `reciboId` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `monto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `ReciboDetalles_reciboId_fkey`(`reciboId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Permiso_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolPermiso` (
    `id` VARCHAR(191) NOT NULL,
    `rolId` VARCHAR(191) NOT NULL,
    `permisoId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RolPermiso_permisoId_fkey`(`permisoId`),
    UNIQUE INDEX `RolPermiso_rolId_permisoId_key`(`rolId`, `permisoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,
    `rolId` VARCHAR(191) NOT NULL,
    `DebeCambiar` BOOLEAN NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    INDEX `Usuario_rolId_fkey`(`rolId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Acompañante` ADD CONSTRAINT `Acompañante_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Habitaciones` ADD CONSTRAINT `Habitaciones_apartamentoId_fkey` FOREIGN KEY (`apartamentoId`) REFERENCES `Apartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Habitaciones` ADD CONSTRAINT `Habitaciones_tipoHabitacionId_fkey` FOREIGN KEY (`tipoHabitacionId`) REFERENCES `TiposHabitacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartamentoServicios` ADD CONSTRAINT `ApartamentoServicios_apartamentoId_fkey` FOREIGN KEY (`apartamentoId`) REFERENCES `Apartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartamentoServicios` ADD CONSTRAINT `ApartamentoServicios_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `Contratos_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `Contratos_apartamentoId_fkey` FOREIGN KEY (`apartamentoId`) REFERENCES `Apartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recibos` ADD CONSTRAINT `Recibos_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReciboDetalles` ADD CONSTRAINT `ReciboDetalles_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `Recibos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_permisoId_fkey` FOREIGN KEY (`permisoId`) REFERENCES `Permiso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
