/*
  Warnings:

  - You are about to drop the column `timeCompeticao` on the `competicoes` table. All the data in the column will be lost.
  - Added the required column `timeVencedor` to the `competicoes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `situacao_comp` on the `competicoes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "competicoes" DROP COLUMN "timeCompeticao",
ADD COLUMN     "timeVencedor" VARCHAR(100) NOT NULL,
DROP COLUMN "situacao_comp",
ADD COLUMN     "situacao_comp" BOOLEAN NOT NULL;
