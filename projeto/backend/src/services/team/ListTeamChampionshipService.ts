import prismaClient from "../../prisma";

interface TeamRequest{
    fk_competicao: string;
}

class ListTeamChampionshipService{
    async execute({ fk_competicao }: TeamRequest){

        const team = await prismaClient.time.findMany({
            where:{
                fk_competicao: fk_competicao
            }
        })

        return team;
    }
}

export { ListTeamChampionshipService }