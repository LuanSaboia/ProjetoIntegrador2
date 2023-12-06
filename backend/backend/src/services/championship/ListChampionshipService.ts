import prismaClient from "../../prisma"

interface ChampionshipRequest{
    id_user: string;
}

class ListChampionshipService{
    async execute({ id_user }: ChampionshipRequest){
        
        const championship = await prismaClient.competicao.findMany({
            where:{
                fk_usuario: id_user
            }
        })

        return championship;
    }
}

export { ListChampionshipService }