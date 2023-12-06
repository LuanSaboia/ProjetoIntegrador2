import { Request, Response } from "express";
import { CountTeamChampionshipService } from "../../services/team/CountTeamChampionshipService";

class CountTeamChampionshipController{
    async handle(req: Request, res: Response){
        const fk_competicao = req.query.fk_competicao as string;

        const countTeam = new CountTeamChampionshipService();

        const count = await countTeam.execute({
            fk_competicao
        })

        return res.json(count);

    }
}

export { CountTeamChampionshipController }