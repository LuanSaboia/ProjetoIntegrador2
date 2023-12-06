/*
  Warnings:

  - You are about to drop the column `fk_competidor` on the `pontuacoes` table. All the data in the column will be lost.
  - You are about to drop the column `fk_competidor` on the `times` table. All the data in the column will be lost.
  - You are about to drop the `competidores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pontuacoes" DROP CONSTRAINT "pontuacoes_fk_competidor_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_fk_competidor_fkey";

-- AlterTable
ALTER TABLE "pontuacoes" DROP COLUMN "fk_competidor";

-- AlterTable
ALTER TABLE "times" DROP COLUMN "fk_competidor",
ADD COLUMN     "fk_competicao" TEXT;

-- DropTable
DROP TABLE "competidores";

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_fk_competicao_fkey" FOREIGN KEY ("fk_competicao") REFERENCES "competicoes"("id_comp") ON DELETE SET NULL ON UPDATE CASCADE;
