import { Request, Response } from "express";
import { CreateStatisticService } from "../../services/statistic/CreateStatisticService";

class CreateStatisticController{
    async handle(req: Request, res: Response){

        const { cartao, chutes, escanteios, posse_bola, fk_time, fk_partida } = req.body;

        const createMomentService = new CreateStatisticService();

        const statistic = await createMomentService.execute({
            cartao,
            chutes,
            escanteios,
            posse_bola,
            fk_time,
            fk_partida
        });

        return res.json(statistic)
    }
}

export { CreateStatisticController }