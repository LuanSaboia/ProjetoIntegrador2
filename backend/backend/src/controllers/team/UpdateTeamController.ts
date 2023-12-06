import { Request, Response } from "express";
import { UpdateTeamService } from "../../services/team/UpdateTeamService";

class UpdateTeamController{
    async handle(req: Request, res: Response){
        const fk_usuario = req.body.id_user;
        const { id_time, nome_time, abreviacao_time, imagem_time, fk_competicao } = req.body;

        const teamService = new UpdateTeamService();

        const team = await teamService.execute({
            id_time,
            nome_time,
            abreviacao_time,
            imagem_time,
            fk_usuario,
            fk_competicao
        })

        return res.json(team)
    }
}

export { UpdateTeamController }