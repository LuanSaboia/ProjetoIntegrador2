import { Request, Response } from "express";
import { ListTeamService } from "../../services/team/ListTeamService";


class ListTeamController{
    async handle(req: Request, res: Response){
        
        const id_user = req.id_user;

        const listTeams = new ListTeamService();

        const team = await listTeams.execute({
            id_user
        })

        return res.json(team);
    }
}

export { ListTeamController }