import prismaClient from "../../prisma";

interface TeamRequest{
    nome_time: string,
    abreviacao_time: string,
    imagem_time: string,
    fk_usuario: string,
    id_time: string,
    fk_competicao?: string
}

class UpdateTeamService{
    async execute({ id_time, nome_time, abreviacao_time, imagem_time, fk_usuario, fk_competicao }: TeamRequest){

        const team = await prismaClient.time.update({
            where:{
                id_time: id_time
            },
            data:{
                nome_time: nome_time,
                abreviacao_time: abreviacao_time,
                imagem_time: imagem_time,
                fk_usuario: fk_usuario,
                fk_competicao: fk_competicao
            }
        })

        return team;
    }
}

export { UpdateTeamService }