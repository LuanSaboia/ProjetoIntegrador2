-- CreateTable
CREATE TABLE "users" (
    "id_user" TEXT NOT NULL,
    "nome_user" VARCHAR(30) NOT NULL,
    "sobrenome_user" VARCHAR(70) NOT NULL,
    "email_user" VARCHAR(100) NOT NULL,
    "senha_user" VARCHAR(10) NOT NULL,
    "imagem_user" BYTEA,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "competicoes" (
    "id_comp" SERIAL NOT NULL,
    "nome_comp" VARCHAR(50) NOT NULL,
    "descricao_comp" TEXT NOT NULL,
    "premiacao_comp" TEXT NOT NULL,
    "data_ini_comp" VARCHAR(15) NOT NULL,
    "data_termi_comp" VARCHAR(15) NOT NULL,
    "situacao_comp" VARCHAR(15) NOT NULL,
    "quantidade_times_comp" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_usuario" TEXT NOT NULL,

    CONSTRAINT "competicoes_pkey" PRIMARY KEY ("id_comp")
);

-- CreateTable
CREATE TABLE "competidores" (
    "id_competidor" SERIAL NOT NULL,
    "nome_competidor" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competidores_pkey" PRIMARY KEY ("id_competidor")
);

-- CreateTable
CREATE TABLE "times" (
    "id_time" SERIAL NOT NULL,
    "nome_time" VARCHAR(20) NOT NULL,
    "imagem_time" BYTEA,
    "abreviacao_time" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_usuario" TEXT NOT NULL,
    "fk_competidor" INTEGER,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id_time")
);

-- CreateTable
CREATE TABLE "pontuacoes" (
    "id_momento_da_pontuacao" SERIAL NOT NULL,
    "tempo_partida" VARCHAR(100) NOT NULL,
    "fk_competidor" INTEGER,

    CONSTRAINT "pontuacoes_pkey" PRIMARY KEY ("id_momento_da_pontuacao")
);

-- CreateTable
CREATE TABLE "partidas" (
    "id_part" SERIAL NOT NULL,
    "data_part" VARCHAR(11) NOT NULL,
    "horario_part" VARCHAR(6) NOT NULL,
    "local_part" VARCHAR(50) NOT NULL,
    "placar_part" CHAR(5),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_comp" INTEGER NOT NULL,
    "fk_time1" INTEGER,
    "fk_time2" INTEGER,
    "fk_momento_da_pontuacao" INTEGER,

    CONSTRAINT "partidas_pkey" PRIMARY KEY ("id_part")
);

-- CreateTable
CREATE TABLE "estatisticas" (
    "id_estatistica" SERIAL NOT NULL,
    "nome_estatistica" VARCHAR(1000) NOT NULL,
    "valor_estatistica" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_partida" INTEGER,

    CONSTRAINT "estatisticas_pkey" PRIMARY KEY ("id_estatistica")
);

-- CreateIndex
CREATE UNIQUE INDEX "competicoes_fk_usuario_key" ON "competicoes"("fk_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "times_fk_usuario_key" ON "times"("fk_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "times_fk_competidor_key" ON "times"("fk_competidor");

-- CreateIndex
CREATE UNIQUE INDEX "pontuacoes_fk_competidor_key" ON "pontuacoes"("fk_competidor");

-- CreateIndex
CREATE UNIQUE INDEX "partidas_fk_comp_key" ON "partidas"("fk_comp");

-- CreateIndex
CREATE UNIQUE INDEX "partidas_fk_momento_da_pontuacao_key" ON "partidas"("fk_momento_da_pontuacao");

-- CreateIndex
CREATE UNIQUE INDEX "estatisticas_fk_partida_key" ON "estatisticas"("fk_partida");

-- AddForeignKey
ALTER TABLE "competicoes" ADD CONSTRAINT "competicoes_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_fk_competidor_fkey" FOREIGN KEY ("fk_competidor") REFERENCES "competidores"("id_competidor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pontuacoes" ADD CONSTRAINT "pontuacoes_fk_competidor_fkey" FOREIGN KEY ("fk_competidor") REFERENCES "competidores"("id_competidor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_fk_comp_fkey" FOREIGN KEY ("fk_comp") REFERENCES "competicoes"("id_comp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_fk_momento_da_pontuacao_fkey" FOREIGN KEY ("fk_momento_da_pontuacao") REFERENCES "pontuacoes"("id_momento_da_pontuacao") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estatisticas" ADD CONSTRAINT "estatisticas_fk_partida_fkey" FOREIGN KEY ("fk_partida") REFERENCES "partidas"("id_part") ON DELETE SET NULL ON UPDATE CASCADE;
