import { Request, Response } from "express";
import { ListMatchChampionshipStatusService } from "../../services/match/ListMatchChampionshipStatusService";


class ListMatchChampionshipStatusController{
    async handle(req: Request, res: Response){
        try {
        const fk_comp = req.query.fk_comp as string;
        const status = req.query.status === 'true' ? true : false;

        console.log('Parâmetros recebidos:', { fk_comp, status });

        const listMatches = new ListMatchChampionshipStatusService();

        const match = await listMatches.execute({
            fk_comp,
            status
        })

        return res.json(match);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

export { ListMatchChampionshipStatusController }