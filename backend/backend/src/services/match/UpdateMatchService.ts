import prismaClient from "../../prisma";

interface MatchRequest{
    data_part: string,
    horario_part: string,
    local_part: string,
    placar_time1: string,
    placar_time2: string,
    
    nome_time1: string,
    imagem_time1: string,
    nome_time2: string,
    imagem_time2: string,

    fk_comp: string,
    fk_time1: string,
    fk_time2: string,
    id_part: string,
    winner: string,
    status: boolean,
}

class UpdateMatchService{
    async execute({ id_part, data_part, horario_part, local_part, placar_time1, placar_time2,
        nome_time1, imagem_time1, nome_time2, imagem_time2, fk_comp, fk_time1, fk_time2, winner, status }: MatchRequest){

        const match = await prismaClient.partida.update({
            where:{
                id_part: id_part
            },
            data:{
                data_part: data_part,
                horario_part: horario_part,
                local_part: local_part,
                placar_time1: placar_time1,
                placar_time2: placar_time2,
                nome_time1: nome_time1,
                imagem_time1: imagem_time1,
                nome_time2: nome_time2,
                imagem_time2: imagem_time2,
                fk_comp: fk_comp,
                fk_time1: fk_time1,
                fk_time2: fk_time2,
                id_part: id_part,
                winner: winner,
                status: status
            }
        })

        return match;
    }
}

export { UpdateMatchService }