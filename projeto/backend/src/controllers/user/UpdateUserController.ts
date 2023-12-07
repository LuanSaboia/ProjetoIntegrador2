import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController{
    async handle(req: Request, res: Response){
        const { nome_user, sobrenome_user, email_user } = req.body
        const id_user = req.id_user;

        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id_user,
            nome_user,
            sobrenome_user,
            email_user
        })

        return res.json(user);

    }
}

export { UpdateUserController }