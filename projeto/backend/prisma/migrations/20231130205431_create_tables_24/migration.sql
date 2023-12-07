-- CreateTable
CREATE TABLE "grupos" (
    "id_estatistica" TEXT NOT NULL,
    "nome_grupo" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_time" TEXT,
    "fk_competicao" TEXT,

    CONSTRAINT "grupos_pkey" PRIMARY KEY ("id_estatistica")
);

-- AddForeignKey
ALTER TABLE "grupos" ADD CONSTRAINT "grupos_fk_time_fkey" FOREIGN KEY ("fk_time") REFERENCES "times"("id_time") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos" ADD CONSTRAINT "grupos_fk_competicao_fkey" FOREIGN KEY ("fk_competicao") REFERENCES "competicoes"("id_comp") ON DELETE SET NULL ON UPDATE CASCADE;
