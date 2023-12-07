import { Request, Response } from "express";
import { CreateMatchService } from "../../services/match/CreateMatchService";

class CreateMatchController{
    async handle(req: Request, res: Response){
        const { data_part, horario_part, local_part, placar_time1, placar_time2, nome_time1, imagem_time1, nome_time2, imagem_time2, fk_comp, fk_time1, fk_time2, winner, status } = req.body
        const fk_usuario = req.id_user;

        const matchService = new CreateMatchService();

        const match = await matchService.execute({
            data_part,
            horario_part,
            local_part,
            placar_time1,
            placar_time2,
            nome_time1,
            imagem_time1,
            nome_time2,
            imagem_time2,
            fk_comp,
            fk_time1,
            fk_time2,
            winner,
            status
        })

        return res.json(match)
    }
}

export { CreateMatchController }