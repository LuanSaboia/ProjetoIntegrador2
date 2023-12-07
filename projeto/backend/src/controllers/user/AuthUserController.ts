import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle(req: Request, res: Response){
        const {email_user, senha_user} = req.body

        const authUserService = new AuthUserService;

        const session = await authUserService.execute({
            email_user,
            senha_user
        })

        return res.json(session)
    }
}

export { AuthUserController }