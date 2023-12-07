import prismaClient from "../../prisma";

interface CountRequest{
    id_user: string;
}

class CountChampionshipService{
    async execute({ id_user }: CountRequest){

        const count = await prismaClient.competicao.count({
            where:{
                fk_usuario: id_user
            }
        })

        return count;
    }
}

export { CountChampionshipService }