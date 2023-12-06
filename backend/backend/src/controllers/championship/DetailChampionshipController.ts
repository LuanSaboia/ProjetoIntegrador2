import { Request, Response } from "express";
import { DetailChampionshipService } from "../../services/championship/DetailChampionshipService";

class DetailChampionshipController{
    async handle(req: Request, res: Response){
        const id_comp = req.query.id_comp as string;
        
        const detailChampioship = new DetailChampionshipService();

        const championship = await detailChampioship.execute({
            id_comp,
        })

        return res.json(championship)
    }
}

export { DetailChampionshipController }