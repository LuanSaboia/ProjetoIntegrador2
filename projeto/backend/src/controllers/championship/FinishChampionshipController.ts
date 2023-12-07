import { Request, Response } from "express";
import { FinishChampionshipService } from "../../services/championship/FinishChampionshipService";

class FinishChampionshipController{
    async handle(req: Request, res: Response){
        const id_comp = req.query.id_comp as string;

        const finishChampionship = new FinishChampionshipService();

        const championship = await finishChampionship.execute({
            id_comp
        })

        return res.json(championship)
    }
}

export { FinishChampionshipController }