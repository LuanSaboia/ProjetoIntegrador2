import prismaClient from "../../prisma";

interface ChampionshipRequest {
    id_comp: string;
}

class FinishChampionshipService {
    async execute({ id_comp }: ChampionshipRequest) {
        try {
            await prismaClient.competicao.update({
                where: {
                    id_comp: id_comp,
                },
                data: {
                    situacao_comp: true,
                },
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

export { FinishChampionshipService };
