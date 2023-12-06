import prismaClient from "../../prisma";

interface UserRequest{
    id_user: string;
    nome_user: string;
    sobrenome_user: string;
    email_user: string;
}

class UpdateUserService{
    async execute({id_user, nome_user, sobrenome_user, email_user}: UserRequest){

        try {
            const userAlreadyExists = await prismaClient.user.findFirst({
                where:{
                    id_user: id_user,
                }
            })

            if(!userAlreadyExists){
                throw new Error("Usuário não existe!");
            }

            const userUpdated = await prismaClient.user.update({
                where:{
                    id_user: id_user
                },
                data:{
                    nome_user,
                    sobrenome_user,
                    email_user
                },
                select:{
                    nome_user: true,
                    sobrenome_user: true,
                    email_user: true
                }
            })

            return userUpdated;

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar usuário!");
        }

    }
}

export { UpdateUserService }