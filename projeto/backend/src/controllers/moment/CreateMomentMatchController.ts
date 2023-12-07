import { Request, Response } from "express";
import { CreateMomentMatchService } from "../../services/moment/CreateMomentMatchService";

class CreateMomentMatchController{
    async handle(req: Request, res: Response){

        const { tempo_partida, fk_part, fk_jogador } = req.body;

        const createMomentService = new CreateMomentMatchService();

        const moment = await createMomentService.execute({
            tempo_partida,
            fk_part,
            fk_jogador
        });

        return res.json(moment)
    }
}

export { CreateMomentMatchController }