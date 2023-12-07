import { Request, Response } from "express";
import { ListMatchService } from "../../services/match/ListMatchService";


class ListMatchController{
    async handle(req: Request, res: Response){
        const listMatches = new ListMatchService();

        const match = await listMatches.execute()

        return res.json(match);
    }
}

export { ListMatchController }