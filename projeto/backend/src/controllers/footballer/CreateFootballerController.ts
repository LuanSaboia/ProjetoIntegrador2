import { Request, Response } from "express";
import { CreateFootballerService } from "../../services/footballer/CreateFootballerService";

class CreateFootballerController {
  async handle(req: Request, res: Response) {

    const { nome_jogador, numero_jogador, fk_time } = req.body

        const teamService = new CreateFootballerService();

        const team = await teamService.execute({
            nome_jogador,
            numero_jogador,
            fk_time
        })

        return res.json(team)
  
  //   const jogadores = req.body;

  //   const createFootballer = new CreateFootballerService();

  //   try {
  //     await createFootballer.execute(jogadores);
  //     return res.status(201).json({ message: "Jogadores criados com sucesso" });
  //   } catch (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  }
}

export { CreateFootballerController };
