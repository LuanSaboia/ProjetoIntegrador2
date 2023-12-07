import prismaClient from "../../prisma";

interface TeamRequest{
    tempo_partida: string,
    fk_part: string,
    fk_jogador: string,
}

class CreateMomentMatchService{
    async execute({ tempo_partida, fk_part, fk_jogador }: TeamRequest){
        if(!tempo_partida || !fk_part || !fk_jogador){
            throw new Error("Error");
        }

        const moment = await prismaClient.momentoDaPontuacao.create({
            data:{
                tempo_partida: tempo_partida,
                fk_part: fk_part,
                fk_jogador: fk_jogador
            }
        })

        return moment;
    }
}

export { CreateMomentMatchService }