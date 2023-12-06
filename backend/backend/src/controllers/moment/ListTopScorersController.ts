import { Request, Response } from "express";
import { ListTopScorersService } from "../../services/moment/ListTopScorersService";

class ListTopScorersController{
    async handle(req: Request, res: Response){
        //const fk_time = req.query.fk_time as string;

        const listFootballer = new ListTopScorersService();

        const footballer = await listFootballer.execute()

        return res.json(footballer)
    }
}

export{ ListTopScorersController }