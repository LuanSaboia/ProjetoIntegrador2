import { Request, Response } from "express";
import { UpdateFootballerService } from "../../services/footballer/UpdateFootballerService";

class UpdateFootballerController{
    async handle(req: Request, res: Response){
        const { id_jogador, nome_jogador, numero_jogador, fk_time } = req.body;

        const footballerService = new UpdateFootballerService();

        const footballer = await footballerService.execute({
            id_jogador,
            nome_jogador,
            numero_jogador,
            fk_time
        })

        return res.json(footballer)
    }
}

export { UpdateFootballerController }