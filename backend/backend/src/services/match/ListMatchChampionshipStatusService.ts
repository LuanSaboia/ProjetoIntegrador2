import prismaClient from "../../prisma";

interface MatchRequest{
    fk_comp: string;
    status: boolean
}

class ListMatchChampionshipStatusService{
    async execute({ fk_comp, status }: MatchRequest){

        const team = await prismaClient.partida.findMany({
            where:{
                fk_comp: fk_comp,
                status: status
            }
        })

        return team;
    }
}

export { ListMatchChampionshipStatusService }