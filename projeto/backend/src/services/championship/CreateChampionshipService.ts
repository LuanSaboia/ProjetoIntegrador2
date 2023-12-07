import prismaClient from "../../prisma";

interface ChampionshipRequest{
    fk_usuario: string,
    nome_comp: string,
    descricao_comp: string,
    premiacao_comp: string,
    data_ini_comp: string,
    data_termi_comp: string,
    situacao_comp: boolean,
    timeVencedor: string,
    quantidade_times_comp: number,
}

class CreateChampionshipService{
    async execute({
        fk_usuario, nome_comp, descricao_comp, premiacao_comp, data_ini_comp, data_termi_comp, situacao_comp, quantidade_times_comp, timeVencedor
    }: ChampionshipRequest){
        if(!nome_comp || !descricao_comp || !premiacao_comp || !data_ini_comp || !data_termi_comp || !situacao_comp || !quantidade_times_comp){
            throw new Error("Error");
        }

        const championship = await prismaClient.competicao.create({
            data:{
                nome_comp: nome_comp,
                descricao_comp: descricao_comp,
                premiacao_comp: premiacao_comp,
                data_ini_comp: data_ini_comp,
                data_termi_comp: data_termi_comp,
                situacao_comp: situacao_comp,
                timeVencedor: timeVencedor,
                quantidade_times_comp: quantidade_times_comp,
                fk_usuario: fk_usuario,
            }
        })
        console.log(championship)

        return championship;
    }
}

export { CreateChampionshipService }