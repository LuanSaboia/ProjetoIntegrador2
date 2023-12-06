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
    winner: string
    status: boolean
}

class CreateMatchService{
    async execute({ data_part, horario_part, local_part, placar_time1, placar_time2, nome_time1, imagem_time1, nome_time2, imagem_time2, fk_comp, fk_time1, fk_time2, winner, status }: MatchRequest){
        if(!fk_comp || !fk_time1 || !fk_time2){
            throw new Error("Error");
        }

        const match = await prismaClient.partida.create({
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
                winner: winner,
                status: status
            }
        })

        return match;
    }
}

export { CreateMatchService }