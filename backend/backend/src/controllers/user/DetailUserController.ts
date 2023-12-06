import { Response, Request } from "express";
import { UserDetailService } from "../../services/user/DetailUserService";

class DetailUserController{
    async handle(req: Request, res: Response){

        const userDetailService = new UserDetailService();

        const id_user = req.id_user;

        const detailUser = await userDetailService.execute(id_user);

        return res.json(detailUser)
    }
}

export { DetailUserController }