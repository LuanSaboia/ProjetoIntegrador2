import { Request, Response } from "express";
import { DeleteTeamService } from "../../services/team/DeleteTeamService";

class DeleteTeamController{
    async handle(req: Request, res: Response){
        const id_time = req.query.id_time as string;
        
        const deleteTeam = new DeleteTeamService();

        const footballer = await deleteTeam.execute({
            id_time
        })

        return res.json(footballer)
    }

}

export{ DeleteTeamController }
