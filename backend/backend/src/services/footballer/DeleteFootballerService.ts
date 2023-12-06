import prismaClient from "../../prisma";

interface FootballerRequest {
  id_jogador: string;
}

class DeleteFootballerService {
  async execute({ id_jogador }: FootballerRequest) {
    try {
        
      await prismaClient.jogador.delete({
        where: {
          id_jogador: id_jogador,
        }
      });

    } catch (error) {
      console.error("Error in DeleteFootballerService:", error);
      throw error;
    }
  }
}

export { DeleteFootballerService };
