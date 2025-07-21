/*
  Warnings:

  - You are about to drop the column `fechaNacimiento` on the `Inquilino` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Inquilino` DROP COLUMN `fechaNacimiento`,
    ADD COLUMN `FechaNacimiento` DATETIME(6) NULL;
