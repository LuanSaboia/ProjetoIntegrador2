import { Request, Response } from "express";
import { CreateTeamService } from "../../services/team/CreateTeamService";

class CreateTeamController{
    async handle(req: Request, res: Response){
        const { nome_time, imagem_time, abreviacao_time, fk_competicao } = req.body
        const fk_usuario = req.id_user;

        const teamService = new CreateTeamService();

        const team = await teamService.execute({
            nome_time,
            imagem_time,
            abreviacao_time,
            fk_usuario,
            fk_competicao
        })

        return res.json(team)
    }
}

export { CreateTeamController }