/*
  Warnings:

  - The primary key for the `competicoes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "partidas" DROP CONSTRAINT "partidas_fk_comp_fkey";

-- DropIndex
DROP INDEX "partidas_fk_comp_key";

-- AlterTable
ALTER TABLE "competicoes" DROP CONSTRAINT "competicoes_pkey",
ALTER COLUMN "id_comp" DROP DEFAULT,
ALTER COLUMN "id_comp" SET DATA TYPE TEXT,
ADD CONSTRAINT "competicoes_pkey" PRIMARY KEY ("id_comp");
DROP SEQUENCE "competicoes_id_comp_seq";

-- AlterTable
ALTER TABLE "partidas" ALTER COLUMN "fk_comp" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_fk_comp_fkey" FOREIGN KEY ("fk_comp") REFERENCES "competicoes"("id_comp") ON DELETE RESTRICT ON UPDATE CASCADE;
