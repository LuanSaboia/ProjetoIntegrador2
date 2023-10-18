import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    nome_user: string;
    sobrenome_user: string;
    email_user: string;
    senha_user: string;
}

class CreateUserService{
    async execute({ nome_user, sobrenome_user, email_user, senha_user }: UserRequest){

        if(!email_user || email_user == ''){
            throw new Error("Email incorreto")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email_user: email_user
            }
        })

        if(userAlreadyExists){
            throw new Error("Usuário/Email já existe")
        }

        const senha_hash = await hash(senha_user, 8)

        const usuario = await prismaClient.user.create({
            data:{
                nome_user: nome_user,
                sobrenome_user: sobrenome_user,
                email_user: email_user,
                senha_user: senha_hash,
            },
            select:{
                id_user: true,
                nome_user: true,
                email_user: true
            }
        })

        return usuario
    }
}

export { CreateUserService }