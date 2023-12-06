import prismaClient from "../../prisma";

interface TeamRequest {
  id_time: string;
}

class DeleteTeamService {
  async execute({ id_time }: TeamRequest) {
    try {
        
      await prismaClient.time.delete({
        where: {
          id_time: id_time,
        }
      });

    } catch (error) {
      console.error("Error in DeleteTeamService:", error);
      throw error;
    }
  }
}

export { DeleteTeamService };
