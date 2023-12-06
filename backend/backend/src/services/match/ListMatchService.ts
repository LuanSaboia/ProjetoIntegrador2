import prismaClient from "../../prisma";

class ListMatchService{
    async execute(){

        const team = await prismaClient.partida.findMany();

        return team;
    }
}

export { ListMatchService }