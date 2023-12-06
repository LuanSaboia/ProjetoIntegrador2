import prismaClient from "../../prisma";

interface TeamRequest{
    nome_time: string,
    imagem_time?: string,
    abreviacao_time: string,
    fk_usuario: string,
    fk_competicao: string,
}

class CreateTeamService{
    async execute({ nome_time, imagem_time, abreviacao_time, fk_usuario, fk_competicao }: TeamRequest){
        if(!nome_time || !abreviacao_time){
            throw new Error("Error");
        }

        const team = await prismaClient.time.create({
            data:{
                nome_time: nome_time,
                imagem_time: imagem_time,
                abreviacao_time: abreviacao_time,
                fk_usuario: fk_usuario,
                fk_competicao: fk_competicao
            }
        })

        return team;
    }
}

export { CreateTeamService }