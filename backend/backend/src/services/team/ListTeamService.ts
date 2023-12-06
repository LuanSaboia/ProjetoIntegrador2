import prismaClient from "../../prisma"

interface TeamRequest{
    id_user: string;
}

class ListTeamService{
    async execute({ id_user }: TeamRequest){
        
        const team = await prismaClient.time.findMany({
            where:{
                fk_usuario: id_user
            }
        })

        return team;
    }
}

export { ListTeamService }