import { Request, Response } from "express";
import { UpdateMatchService } from "../../services/match/UpdateMatchService";

class UpdateMatchController{
    async handle(req: Request, res: Response){
        const { id_part, data_part, horario_part, local_part, placar_time1, placar_time2,
            nome_time1, imagem_time1, nome_time2, imagem_time2, fk_comp, fk_time1, fk_time2, winner, status } = req.body;

        const matchService = new UpdateMatchService();

        const match = await matchService.execute({
            id_part,
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
            status,
        })
        return res.json(match)
    }
}

export { UpdateMatchController }