-- AlterTable
ALTER TABLE "estatisticas" ADD COLUMN     "fk_time" TEXT;

-- AddForeignKey
ALTER TABLE "estatisticas" ADD CONSTRAINT "estatisticas_fk_time_fkey" FOREIGN KEY ("fk_time") REFERENCES "times"("id_time") ON DELETE SET NULL ON UPDATE CASCADE;
