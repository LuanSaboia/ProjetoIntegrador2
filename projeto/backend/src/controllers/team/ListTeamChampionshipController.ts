import { Request, Response } from "express";
import { ListTeamChampionshipService } from "../../services/team/ListTeamChampionshipService";


class ListTeamChampionshipController{
    async handle(req: Request, res: Response){
        
        const fk_competicao = req.query.fk_competicao as string;

        const listTeams = new ListTeamChampionshipService();

        const team = await listTeams.execute({
            fk_competicao
        })

        return res.json(team);
    }
}

export { ListTeamChampionshipController }