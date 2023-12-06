/*
  Warnings:

  - Made the column `fk_time1` on table `partidas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_time2` on table `partidas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "partidas" DROP CONSTRAINT "partidas_fk_momento_da_pontuacao_fkey";

-- AlterTable
ALTER TABLE "partidas" ALTER COLUMN "fk_time1" SET NOT NULL,
ALTER COLUMN "fk_time1" SET DATA TYPE TEXT,
ALTER COLUMN "fk_time2" SET NOT NULL,
ALTER COLUMN "fk_time2" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_fk_time1_fkey" FOREIGN KEY ("fk_time1") REFERENCES "times"("id_time") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_fk_time2_fkey" FOREIGN KEY ("fk_time2") REFERENCES "times"("id_time") ON DELETE RESTRICT ON UPDATE CASCADE;
