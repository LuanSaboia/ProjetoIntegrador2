/*
  Warnings:

  - The primary key for the `grupos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_estatistica` on the `grupos` table. All the data in the column will be lost.
  - Added the required column `fk_usuario` to the `grupos` table without a default value. This is not possible if the table is not empty.
  - The required column `id_grupo` was added to the `grupos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "grupos" DROP CONSTRAINT "grupos_pkey",
DROP COLUMN "id_estatistica",
ADD COLUMN     "fk_usuario" TEXT NOT NULL,
ADD COLUMN     "id_grupo" TEXT NOT NULL,
ADD CONSTRAINT "grupos_pkey" PRIMARY KEY ("id_grupo");

-- AddForeignKey
ALTER TABLE "grupos" ADD CONSTRAINT "grupos_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
