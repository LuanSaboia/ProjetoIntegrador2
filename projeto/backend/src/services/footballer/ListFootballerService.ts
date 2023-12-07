import prismaClient from "../../prisma";

interface FootballerRequest {
  fk_time: string;
}

class ListFootballerService {
  async execute({ fk_time }: FootballerRequest) {
    try {
      console.log("Received fk_time:", fk_time);

      const footballer = await prismaClient.jogador.findMany({
        where: {
          fk_time: fk_time,
        },
        select: {
          id_jogador: true,
          nome_jogador: true,
          numero_jogador: true,
          time: true,
        },
      });

      return footballer;
    } catch (error) {
      console.error("Error in ListFootballerService:", error);
      throw error;
    }
  }
}

export { ListFootballerService };
