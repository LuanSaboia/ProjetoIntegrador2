import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){

        const { nome_user, sobrenome_user, email_user, senha_user } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            nome_user,
            sobrenome_user,
            email_user,
            senha_user
        });

        return res.json(user)
    }
}

export { CreateUserController }