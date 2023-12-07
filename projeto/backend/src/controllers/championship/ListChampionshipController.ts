import { Request, Response, response } from "express";
import { ListChampionshipService } from "../../services/championship/ListChampionshipService";


class ListChampionshipController{
    async handle(req: Request, res: Response){
        
        const id_user = req.id_user;

        const listChampionships = new ListChampionshipService();

        const championship = await listChampionships.execute({
            id_user
        })

        return res.json(championship);
    }
}

export { ListChampionshipController }