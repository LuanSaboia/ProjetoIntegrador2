/*
  Warnings:

  - You are about to drop the column `nome_estatistica` on the `estatisticas` table. All the data in the column will be lost.
  - You are about to drop the column `valor_estatistica` on the `estatisticas` table. All the data in the column will be lost.
  - Added the required column `cartao` to the `estatisticas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chutes` to the `estatisticas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escanteios` to the `estatisticas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posse_bola` to the `estatisticas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estatisticas" DROP COLUMN "nome_estatistica",
DROP COLUMN "valor_estatistica",
ADD COLUMN     "cartao" INTEGER NOT NULL,
ADD COLUMN     "chutes" INTEGER NOT NULL,
ADD COLUMN     "escanteios" INTEGER NOT NULL,
ADD COLUMN     "posse_bola" INTEGER NOT NULL;
