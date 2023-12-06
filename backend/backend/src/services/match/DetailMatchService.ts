import prismaClient from "../../prisma";

interface DetailRequest{
    id_part: string;
}

class DetailMatchService{
    async execute({ id_part }: DetailRequest){

        const team = await prismaClient.partida.findFirst({
            where:{
                id_part: id_part
            }
        })

        return team;
    }
}

export { DetailMatchService }