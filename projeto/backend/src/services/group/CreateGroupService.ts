import prismaClient from "../../prisma";

interface GroupRequest{
    nome_grupo: string,
    fk_time: string,
    fk_competicao: string,
    fk_usuario: string,
}

class CreateGroupService{
    async execute({ nome_grupo, fk_time, fk_competicao, fk_usuario }: GroupRequest){
        if(!nome_grupo || !fk_time || !fk_competicao){
            throw new Error("Error");
        }

        const moment = await prismaClient.grupo.create({
            data:{
                nome_grupo: nome_grupo,
                fk_time: fk_time,
                fk_competicao: fk_competicao,
                fk_usuario: fk_usuario,
            }
        })

        return moment;
    }
}

export { CreateGroupService }