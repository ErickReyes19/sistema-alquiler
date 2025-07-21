/*
  Warnings:

  - Made the column `fechaNacimiento` on table `Inquilino` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Inquilino` MODIFY `fechaNacimiento` DATETIME(6) NOT NULL;
