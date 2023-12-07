import { Request, Response } from "express";
import { CreateGroupService } from "../../services/group/CreateGroupService";

class CreateGroupController{
    async handle(req: Request, res: Response){
        
        const fk_usuario = req.id_user;
        const { nome_grupo, fk_time, fk_competicao } = req.body;

        const createGroupService = new CreateGroupService();

        const group = await createGroupService.execute({
            nome_grupo,
            fk_time,
            fk_competicao,
            fk_usuario
        });

        return res.json(group)
    }
}

export { CreateGroupController }