import _ from "lodash";
import prismaClient from "../../prisma";
import { DetailFootballerService } from "../footballer/DetailFootballerService";

class ListTopScorersService {
  async execute() {
    try {
      const moments = await prismaClient.momentoDaPontuacao.findMany({
        select: {
          fk_jogador: true,
        },
      });

      // Contar a ocorrência de cada jogador
      const jogadorCounts = _.countBy(moments, "fk_jogador");

      // Obter detalhes dos top 5 jogadores
      const top5Jogadores = await Promise.all(
        _(jogadorCounts)
          .toPairs()
          .sortBy([1])
          .reverse()
          .take(5)
          .map(async ([id_jogador, count]) => {
            const detailService = new DetailFootballerService();
            const jogadorDetails = await detailService.execute({ id_jogador });

            return {
              ...jogadorDetails,
              count, // Adiciona a contagem ao objeto
            };
          })
          .value()
      );

      return top5Jogadores;
    } catch (error) {
      console.error("Error in ListTopScorersService:", error);
      throw error;
    }
  }
}

export { ListTopScorersService };
