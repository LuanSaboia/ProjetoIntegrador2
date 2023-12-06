import { Request, Response } from "express";
import { DetailFootballerService } from "../../services/footballer/DetailFootballerService";

class DetailFootballerController{
    async handle(req: Request, res: Response){
        const id_jogador = req.query.id_jogador as string;

        const listFootballer = new DetailFootballerService();

        const footballer = await listFootballer.execute({
            id_jogador
        })

        return res.json(footballer)
    }
}

export{ DetailFootballerController }