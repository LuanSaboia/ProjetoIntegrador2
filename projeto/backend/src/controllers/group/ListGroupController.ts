import { Request, Response } from "express";
import { ListGroupService } from "../../services/group/ListGroupService";


class ListGroupController{
    async handle(req: Request, res: Response){
        
        const fk_competicao = req.query.fk_competicao as string;

        const listChampionships = new ListGroupService();

        const championship = await listChampionships.execute({
            fk_competicao
        })

        return res.json(championship);
    }
}

export { ListGroupController }