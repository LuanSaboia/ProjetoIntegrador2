import { Request, Response } from "express";
import { DeleteFootballerService } from "../../services/footballer/DeleteFootballerService";

class DeleteFootballerController{
    async handle(req: Request, res: Response){
        const id_jogador = req.query.id_jogador as string;
        
        const deleteFootballer = new DeleteFootballerService();

        const footballer = await deleteFootballer.execute({
            id_jogador
        })

        return res.json(footballer)
    }

}

export{ DeleteFootballerController }
