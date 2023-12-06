import prismaClient from "../../prisma";

interface FootballerRequest{
    id_jogador: string,
    nome_jogador: string,
    numero_jogador: number,
    fk_time?: string
}

class UpdateFootballerService{
    async execute({ id_jogador, nome_jogador, numero_jogador, fk_time }: FootballerRequest){

        const footballer = await prismaClient.jogador.update({
            where:{
                id_jogador: id_jogador
            },
            data:{
                nome_jogador: nome_jogador,
                numero_jogador: numero_jogador,
                fk_time: fk_time
            }
        })

        return footballer;
    }
}

export { UpdateFootballerService }