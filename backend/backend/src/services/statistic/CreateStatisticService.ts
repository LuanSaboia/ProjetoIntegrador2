import prismaClient from "../../prisma";

interface TeamRequest{
    cartao: string,
    chutes: string,
    escanteios: string,
    posse_bola: string,
    fk_time: string,
    fk_partida: string,
}

class CreateStatisticService{
    async execute({ cartao, chutes, escanteios, posse_bola, fk_time, fk_partida  }: TeamRequest){
        if( !cartao || !chutes || !escanteios || !posse_bola ){
            throw new Error("Error");
        }

        const statistic = await prismaClient.estatistica.create({
            data:{
                cartao: cartao,
                chutes: chutes,
                escanteios: escanteios,
                posse_bola: posse_bola,
                fk_time: fk_time,
                fk_partida: fk_partida,
            }
        })

        return statistic;
    }
}

export { CreateStatisticService }