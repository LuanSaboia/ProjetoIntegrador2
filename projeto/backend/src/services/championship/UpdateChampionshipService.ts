import prismaClient from "../../prisma";

interface ChampionshipRequest{
    fk_usuario: string,
    id_comp: string,
    nome_comp?: string,
    descricao_comp?: string,
    premiacao_comp?: string,
    data_ini_comp?: string,
    data_termi_comp?: string,
    situacao_comp: boolean,
    timeVencedor?: string
    quantidade_times_comp?: number,
}

class UpdateChampionshipService{
    async execute(
        {fk_usuario, id_comp, nome_comp, descricao_comp, premiacao_comp, data_ini_comp, data_termi_comp, situacao_comp, quantidade_times_comp, timeVencedor
    }: ChampionshipRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                id_user: fk_usuario
            }
        })

        console.log(id_comp)

        const championship = await prismaClient.competicao.update({
            where:{
                id_comp: id_comp
            },
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

        return championship;
    }
}

export { UpdateChampionshipService }