import prismaClient from "../../prisma";

interface FootballerRequest {
  nome_jogador: string;
  numero_jogador: number;
  fk_time: string;
}

class CreateFootballerService {
  async execute({ nome_jogador, numero_jogador, fk_time }: FootballerRequest){
    if(!nome_jogador || !numero_jogador || !fk_time){
        throw new Error("Error");
    }

    const team = await prismaClient.jogador.create({
        data:{
            nome_jogador: nome_jogador,
            numero_jogador: numero_jogador,
            fk_time: fk_time
        }
    })

    return team;
}
  // async execute(jogadores: FootballerRequest[]): Promise<void> {
  //   for (const jogador of jogadores) {
  //     const { nome_jogador, numero_jogador, fk_time } = jogador;

  //     if (nome_jogador === '' || numero_jogador === 0) {
  //       throw new Error("Error create footballer.");
  //     }

  //     const numberAlreadyExists = await prismaClient.jogador.findFirst({
  //       where: {
  //         numero_jogador: numero_jogador,
  //         fk_time: fk_time,
  //       },
  //     });

  //     if (numberAlreadyExists) {
  //       throw new Error("Não é possível registrar");
  //     }

  //     await prismaClient.jogador.create({
  //       data: {
  //         nome_jogador,
  //         numero_jogador,
  //         fk_time,
  //       },
  //     });
  //   }
  // }
}

export { CreateFootballerService };
