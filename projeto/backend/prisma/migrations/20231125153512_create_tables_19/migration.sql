-- AlterTable
ALTER TABLE "pontuacoes" ADD COLUMN     "fk_jogador" TEXT;

-- AddForeignKey
ALTER TABLE "pontuacoes" ADD CONSTRAINT "pontuacoes_fk_jogador_fkey" FOREIGN KEY ("fk_jogador") REFERENCES "jogadores"("id_jogador") ON DELETE SET NULL ON UPDATE CASCADE;
