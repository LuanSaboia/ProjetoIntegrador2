import { Request, Response } from "express";
import { DetailMatchService } from "../../services/match/DetailMatchService";

class DetailMatchController{
    async handle(req: Request, res: Response){
        const id_part = req.query.id_part as string;
        
        const detailChampioship = new DetailMatchService();

        const team = await detailChampioship.execute({
            id_part,
        })

        return res.json(team)
    }
}

export { DetailMatchController }