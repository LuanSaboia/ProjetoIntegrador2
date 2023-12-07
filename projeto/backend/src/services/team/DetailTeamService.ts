import prismaClient from "../../prisma";

interface DetailRequest{
    id_time: string;
}

class DetailTeamService{
    async execute({ id_time }: DetailRequest){

        const team = await prismaClient.time.findFirst({
            where:{
                id_time: id_time
            }
        })

        return team;
    }
}

export { DetailTeamService }