-- CreateTable
CREATE TABLE "jogadores" (
    "id_jogador" TEXT NOT NULL,
    "nome_jogador" VARCHAR(30) NOT NULL,
    "numero_jogador" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_comp" TEXT NOT NULL,

    CONSTRAINT "jogadores_pkey" PRIMARY KEY ("id_jogador")
);

-- AddForeignKey
ALTER TABLE "jogadores" ADD CONSTRAINT "jogadores_id_comp_fkey" FOREIGN KEY ("id_comp") REFERENCES "competicoes"("id_comp") ON DELETE RESTRICT ON UPDATE CASCADE;
