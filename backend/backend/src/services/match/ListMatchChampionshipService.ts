import prismaClient from "../../prisma";

interface MatchRequest{
    fk_comp: string;
}

class ListMatchChampionshipService{
    async execute({ fk_comp, }: MatchRequest){

        const team = await prismaClient.partida.findMany({
            where:{
                fk_comp: fk_comp,
            }
        })

        return team;
    }
}

export { ListMatchChampionshipService }