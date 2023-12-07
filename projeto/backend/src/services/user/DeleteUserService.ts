import prismaClient from "../../prisma";

interface UserRequest {
  id_user: string;
}

class DeleteUserService {
  async execute({ id_user }: UserRequest) {
    try {
        
      await prismaClient.user.delete({
        where: {
          id_user: id_user,
        }
      });

    } catch (error) {
      console.error("Error in DeleteUserService:", error);
      throw error;
    }
  }
}

export { DeleteUserService };
