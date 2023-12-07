import prismaClient from "../../prisma";

interface DetailRequest{
    id_comp: string;
}

class DetailChampionshipService{
    async execute({ id_comp }: DetailRequest){

        const championship = await prismaClient.competicao.findFirst({
            where:{
                id_comp: id_comp
            }
        })

        return championship;
    }
}

export { DetailChampionshipService }