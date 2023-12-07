import { Request, Response } from "express";
import { CountChampionshipService } from "../../services/championship/CountChampionshipService";

class CountChampionshipController{
    async handle(req: Request, res: Response){
        const id_user = req.id_user;

        const countChampionship = new CountChampionshipService();

        const count = await countChampionship.execute({
            id_user
        })

        return res.json(count);

    }
}

export { CountChampionshipController }