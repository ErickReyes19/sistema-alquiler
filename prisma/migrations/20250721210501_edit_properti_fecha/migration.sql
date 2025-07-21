/*
  Warnings:

  - You are about to drop the column `FechaNacimiento` on the `Inquilino` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Inquilino` DROP COLUMN `FechaNacimiento`,
    ADD COLUMN `fechaNacimiento` DATETIME(6) NULL;
