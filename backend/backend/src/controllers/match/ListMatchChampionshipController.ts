import { Request, Response } from "express";
import { ListMatchChampionshipService } from "../../services/match/ListMatchChampionshipService";


class ListMatchChampionshipController{
    async handle(req: Request, res: Response){
        try {
        const fk_comp = req.query.fk_comp as string;

        console.log('Parâmetros recebidos:', { fk_comp });

        const listMatches = new ListMatchChampionshipService();

        const match = await listMatches.execute({
            fk_comp,
        })

        return res.json(match);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

export { ListMatchChampionshipController }