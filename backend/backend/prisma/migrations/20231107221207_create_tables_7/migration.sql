/*
  Warnings:

  - You are about to alter the column `imagem_time` on the `times` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(300)`.
  - You are about to alter the column `imagem_user` on the `users` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "times" ALTER COLUMN "imagem_time" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "imagem_user" SET DATA TYPE VARCHAR(200);
