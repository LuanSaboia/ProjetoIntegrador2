-- AlterTable
ALTER TABLE "competicoes" ALTER COLUMN "nome_comp" DROP NOT NULL,
ALTER COLUMN "descricao_comp" DROP NOT NULL,
ALTER COLUMN "premiacao_comp" DROP NOT NULL,
ALTER COLUMN "data_ini_comp" DROP NOT NULL,
ALTER COLUMN "data_termi_comp" DROP NOT NULL,
ALTER COLUMN "quantidade_times_comp" DROP NOT NULL;
