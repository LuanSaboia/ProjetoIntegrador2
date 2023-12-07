import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserRequest{
    email_user: string;
    senha_user: string;
}

class AuthUserService {
    async execute({email_user, senha_user}: AuthUserRequest){

        console.log(email_user)
        console.log(senha_user)

        const user = await prismaClient.user.findFirst({
            where:{
                email_user: email_user
            }
        })

        if(!user){
            throw new Error("Email/Senha incorreto")
        }

        const senha_math = await compare(senha_user, user?.senha_user)

        if(!senha_math){
            throw new Error("Email/Senha incorreto")
        }

        const token = sign(
            {
                nome_user: user.nome_user,
                email_user: user.email_user,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id_user,
                expiresIn: '30d'
            }
        )

        return {
            id: user?.id_user,
            name: user?.nome_user,
            sobrenome: user?.sobrenome_user,
            email: user?.email_user,
            token: token
        }
    }
}

export { AuthUserService }