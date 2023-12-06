import { Request, Response } from "express";
import { ListFootballerService } from "../../services/footballer/ListFootballerService";

class ListFootballerController{
    async handle(req: Request, res: Response){
        const fk_time = req.query.fk_time as string;

        const listFootballer = new ListFootballerService();

        const footballer = await listFootballer.execute({
            fk_time
        })

        return res.json(footballer)
    }
}

export{ ListFootballerController }