import prismaClient from "../../prisma";

interface CountRequest{
    fk_competicao: string;
}

class CountTeamChampionshipService{
    async execute({ fk_competicao }: CountRequest){

        const count = await prismaClient.time.count({
            where:{
                fk_competicao: fk_competicao
            }
        })

        return count;
    }
}

export { CountTeamChampionshipService }