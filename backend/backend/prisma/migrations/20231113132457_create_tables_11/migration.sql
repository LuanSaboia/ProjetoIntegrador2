/*
  Warnings:

  - You are about to drop the column `placar_part` on the `partidas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "partidas" DROP COLUMN "placar_part",
ADD COLUMN     "placar_time1" CHAR(5),
ADD COLUMN     "placar_time2" CHAR(5);
