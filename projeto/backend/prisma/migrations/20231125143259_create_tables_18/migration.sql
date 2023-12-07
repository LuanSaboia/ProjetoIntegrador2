-- AlterTable
ALTER TABLE "pontuacoes" ADD COLUMN     "fk_part" TEXT;

-- AddForeignKey
ALTER TABLE "pontuacoes" ADD CONSTRAINT "pontuacoes_fk_part_fkey" FOREIGN KEY ("fk_part") REFERENCES "partidas"("id_part") ON DELETE SET NULL ON UPDATE CASCADE;
