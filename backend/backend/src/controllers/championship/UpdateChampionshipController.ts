import { Request, Response } from "express";
import { UpdateChampionshipService } from "../../services/championship/UpdateChampionshipService";

class UpdateChampionshipController{
    async handle(req: Request, res: Response){
        const fk_usuario = req.id_user;
        const { id_comp, nome_comp, descricao_comp, premiacao_comp, data_ini_comp, data_termi_comp, situacao_comp, quantidade_times_comp, timeVencedor } = req.body

        const updateChampionship = new UpdateChampionshipService();

        const championship = await updateChampionship.execute({
            fk_usuario,
            id_comp,
            nome_comp,
            descricao_comp,
            premiacao_comp,
            data_ini_comp,
            data_termi_comp,
            situacao_comp,
            timeVencedor,
            quantidade_times_comp,
        })

        return res.json(championship);
    }
}

export { UpdateChampionshipController }