import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController{
    async handle(req: Request, res: Response){
        const id_user = req.query.id_user as string;
        console.log(id_user)
        const deleteUser = new DeleteUserService();

        const user = await deleteUser.execute({
            id_user
        })

        return res.json(user)
    }

}

export{ DeleteUserController }
