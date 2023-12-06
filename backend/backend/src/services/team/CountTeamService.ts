import prismaClient from "../../prisma";

interface CountRequest{
    id_user: string;
}

class CountTeamService{
    async execute({ id_user }: CountRequest){

        const count = await prismaClient.time.count({
            where:{
                fk_usuario: id_user
            }
        })

        return count;
    }
}

export { CountTeamService }