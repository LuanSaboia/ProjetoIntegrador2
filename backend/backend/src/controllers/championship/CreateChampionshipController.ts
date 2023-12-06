import { Request, Response } from "express";
import { CreateChampionshipService } from "../../services/championship/CreateChampionshipService";

class CreateChampionshipController{
    async handle(req: Request, res: Response){
        const { nome_comp, descricao_comp, premiacao_comp, data_ini_comp, data_termi_comp, situacao_comp, quantidade_times_comp, timeVencedor } = req.body;
        const fk_usuario = req.id_user;

        const createChampionshipService = new CreateChampionshipService();

        const championship = await createChampionshipService.execute({
            fk_usuario,
            nome_comp,
            descricao_comp,
            premiacao_comp,
            data_ini_comp,
            data_termi_comp,
            situacao_comp,
            quantidade_times_comp,
            timeVencedor
        })

        return res.json(championship);
    }
}

export { CreateChampionshipController }