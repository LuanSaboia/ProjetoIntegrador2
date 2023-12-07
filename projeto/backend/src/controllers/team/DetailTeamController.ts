import { Request, Response } from "express";
import { DetailTeamService } from "../../services/team/DetailTeamService";

class DetailTeamController{
    async handle(req: Request, res: Response){
        const id_time = req.query.id_time as string;
        
        const detailChampioship = new DetailTeamService();

        const team = await detailChampioship.execute({
            id_time,
        })

        return res.json(team)
    }
}

export { DetailTeamController }