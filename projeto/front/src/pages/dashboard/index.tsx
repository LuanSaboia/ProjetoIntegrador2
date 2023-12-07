import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import { BarChart } from "@/components/chart";
import { setupAPIClient } from "@/services/api";

interface TeamItem {
  id_time: string;
  nome_time: string;
  imagem_time: string;
}

interface TopScoresItem {
  id_jogador: string;
  nome_jogador: string;
  numero_jogador: number;
  time: TeamItem;
  count: number;
}

interface TopScores {
  topScores: TopScoresItem[];
}

export default function Dashboard({ topScores }: TopScores) {
    console.log(topScores);
  
    return (
      <>
        <Head>
          <title>Meus campeonatos</title>
        </Head>
        <Sidebar>
          <Flex>
            <Flex w="50%" direction="column">
              <BarChart data={topScores} />
            </Flex>
          </Flex>
        </Sidebar>
      </>
    );
  }

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/top-scorers');

    return {
      props: {
        topScores: response.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        topScores: [],
      },
    };
  }
});
