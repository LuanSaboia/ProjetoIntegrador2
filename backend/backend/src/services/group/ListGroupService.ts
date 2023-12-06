import prismaClient from "../../prisma"

interface GroupRequest{
    fk_competicao: string;
}

class ListGroupService{
    async execute({ fk_competicao }: GroupRequest){
        
        const group = await prismaClient.grupo.findMany({
            where:{
                fk_competicao: fk_competicao
            }
        })

        return group;
    }
}

export { ListGroupService }