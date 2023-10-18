import prismaClient from "../../prisma";


class UserDetailService{
    async execute(id_user: string){

        const user = await prismaClient.user.findFirst({
            where:{
                id_user: id_user
            },
            select:{
                id_user: true,
                nome_user: true,
                email_user: true
            }
        })

        console.log(user)

        return user;
    }
}

export { UserDetailService }