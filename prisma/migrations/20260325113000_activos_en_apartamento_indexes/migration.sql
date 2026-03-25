-- CreateIndex
CREATE INDEX `GastoApartamento_apartamentoId_apartamentoActivoId_idx`
ON `GastoApartamento`(`apartamentoId`, `apartamentoActivoId`);

-- CreateIndex
CREATE INDEX `ApartamentoActivo_apartamentoId_activo_idx`
ON `ApartamentoActivo`(`apartamentoId`, `activo`);
