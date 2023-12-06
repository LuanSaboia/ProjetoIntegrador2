/*
  Warnings:

  - The primary key for the `competidores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `estatisticas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_comp` on the `jogadores` table. All the data in the column will be lost.
  - The primary key for the `partidas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pontuacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `times` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "estatisticas" DROP CONSTRAINT "estatisticas_fk_partida_fkey";

-- DropForeignKey
ALTER TABLE "jogadores" DROP CONSTRAINT "jogadores_id_comp_fkey";

-- DropForeignKey
ALTER TABLE "partidas" DROP CONSTRAINT "partidas_fk_momento_da_pontuacao_fkey";

-- DropForeignKey
ALTER TABLE "pontuacoes" DROP CONSTRAINT "pontuacoes_fk_competidor_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_fk_competidor_fkey";

-- DropIndex
DROP INDEX "estatisticas_fk_partida_key";

-- DropIndex
DROP INDEX "partidas_fk_momento_da_pontuacao_key";

-- DropIndex
DROP INDEX "pontuacoes_fk_competidor_key";

-- DropIndex
DROP INDEX "times_fk_competidor_key";

-- DropIndex
DROP INDEX "times_fk_usuario_key";

-- AlterTable
ALTER TABLE "competidores" DROP CONSTRAINT "competidores_pkey",
ALTER COLUMN "id_competidor" DROP DEFAULT,
ALTER COLUMN "id_competidor" SET DATA TYPE TEXT,
ADD CONSTRAINT "competidores_pkey" PRIMARY KEY ("id_competidor");
DROP SEQUENCE "competidores_id_competidor_seq";

-- AlterTable
ALTER TABLE "estatisticas" DROP CONSTRAINT "estatisticas_pkey",
ALTER COLUMN "id_estatistica" DROP DEFAULT,
ALTER COLUMN "id_estatistica" SET DATA TYPE TEXT,
ALTER COLUMN "fk_partida" SET DATA TYPE TEXT,
ADD CONSTRAINT "estatisticas_pkey" PRIMARY KEY ("id_estatistica");
DROP SEQUENCE "estatisticas_id_estatistica_seq";

-- AlterTable
ALTER TABLE "jogadores" DROP COLUMN "id_comp",
ADD COLUMN     "fk_time" TEXT;

-- AlterTable
ALTER TABLE "partidas" DROP CONSTRAINT "partidas_pkey",
ALTER COLUMN "id_part" DROP DEFAULT,
ALTER COLUMN "id_part" SET DATA TYPE TEXT,
ALTER COLUMN "fk_momento_da_pontuacao" SET DATA TYPE TEXT,
ADD CONSTRAINT "partidas_pkey" PRIMARY KEY ("id_part");
DROP SEQUENCE "partidas_id_part_seq";

-- AlterTable
ALTER TABLE "pontuacoes" DROP CONSTRAINT "pontuacoes_pkey",
ALTER COLUMN "id_momento_da_pontuacao" DROP DEFAULT,
ALTER COLUMN "id_momento_da_pontuacao" SET DATA TYPE TEXT,
ALTER COLUMN "fk_competidor" SET DATA TYPE TEXT,
ADD CONSTRAINT "pontuacoes_pkey" PRIMARY KEY ("id_momento_da_pontuacao");
DROP SEQUENCE "pontuacoes_id_momento_da_pontuacao_seq";

-- AlterTable
ALTER TABLE "times" DROP CONSTRAINT "times_pkey",
ALTER COLUMN "id_time" DROP DEFAULT,
ALTER COLUMN "id_time" SET DATA TYPE TEXT,
ALTER COLUMN "fk_competidor" SET DATA TYPE TEXT,
ADD CONSTRAINT "times_pkey" PRIMARY KEY ("id_time");
DROP SEQUENCE "times_id_time_seq";

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_fk_competidor_fkey" FOREIGN KEY ("fk_competidor") REFERENCES "competidores"("id_competidor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogadores" ADD CONSTRAINT "jogadores_fk_time_fkey" FOREIGN KEY ("fk_time") REFERENCES "times"("id_time") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pontuacoes" ADD CONSTRAINT "pontuacoes_fk_competidor_fkey" FOREIGN KEY ("fk_competidor") REFERENCES "competidores"("id_competidor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_fk_momento_da_pontuacao_fkey" FOREIGN KEY ("fk_momento_da_pontuacao") REFERENCES "pontuacoes"("id_momento_da_pontuacao") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estatisticas" ADD CONSTRAINT "estatisticas_fk_partida_fkey" FOREIGN KEY ("fk_partida") REFERENCES "partidas"("id_part") ON DELETE SET NULL ON UPDATE CASCADE;
