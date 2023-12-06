import { Request, Response } from "express";
import { CountTeamService } from "../../services/team/CountTeamService";

class CountTeamController{
    async handle(req: Request, res: Response){
        const id_user = req.id_user;

        const countTeam = new CountTeamService();

        const count = await countTeam.execute({
            id_user
        })

        return res.json(count);

    }
}

export { CountTeamController }