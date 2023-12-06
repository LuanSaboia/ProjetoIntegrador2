import prismaClient from "../../prisma";

interface FootballerRequest {
  id_jogador: string;
}

class DetailFootballerService {
  async execute({ id_jogador }: FootballerRequest) {
    try {
      console.log("Received id_jogador:", id_jogador);

      const footballer = await prismaClient.jogador.findFirst({
        where: {
          id_jogador: id_jogador,
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
      console.error("Error in DetailFootballerService:", error);
      throw error;
    }
  }
}

export { DetailFootballerService };
