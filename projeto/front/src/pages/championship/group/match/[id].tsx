// pages/phaseGroup.tsx

import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Flex,
  Heading,
  Button,
  useMediaQuery,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

interface MatchResult {
  team1: string;
  team2: string;
  winner: string;
}

export interface GroupItem {
  id_time: string;
  nome_grupo: string;
  fk_time: string;
  fk_competicao: string;
  pontos?: number; // Adicione esta propriedade para armazenar a pontuação
}


interface GroupProps {
  group: GroupItem[];
}

export default function PhaseGroup({ group }: GroupProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [groupedTeams, setGroupedTeams] = useState<GroupItem[]>([]);

  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [saveButton, setSaveButton] = useState(true);

  useEffect(() => {
    const generateMatches = () => {
      const shuffledTeams = _.shuffle([...group]);

      const matches: MatchResult[] = [];

      for (let i = 0; i < shuffledTeams.length; i += 2) {
        const team1 = shuffledTeams[i];
        const team2 = shuffledTeams[i + 1];

        if (team1 && team2) {
          // Simula a realização do jogo e determina o vencedor aleatoriamente
          const winner = Math.random() < 0.5 ? team1.fk_time : team2.fk_time;

          matches.push({
            team1: team1.fk_time,
            team2: team2.fk_time,
            winner,
          });
        }
      }

      setMatchResults(matches);
    };

    const generateStandings = () => {
      // Agrupa os resultados pelo nome do grupo
      const groupedResults = _.groupBy(matchResults, "nome_grupo");

      // Calcula a pontuação de cada time
      const standings = Object.entries(groupedResults).map(([groupName, matches]) => {
        const teamPoints: Record<string, number> = {};

        matches.forEach((match) => {
          teamPoints[match.team1] = (teamPoints[match.team1] || 0) + (match.winner === match.team1 ? 3 : 0);
          teamPoints[match.team2] = (teamPoints[match.team2] || 0) + (match.winner === match.team2 ? 3 : 0);
        });

        return {
          nome_grupo: groupName,
          teams: Object.entries(teamPoints).map(([teamName, points]) => ({ teamName, points })),
        };
      });

      // Ordena os resultados por pontuação
      const sortedStandings = standings.map((groupStandings) => {
        const sortedTeams = _.sortBy(groupStandings.teams, "points").reverse();
        return { ...groupStandings, teams: sortedTeams };
      });

      // setGroupedTeams(sortedStandings);
    };

    generateMatches();
    // Aguarde algum tempo simulado antes de gerar as classificações
    setTimeout(() => generateStandings(), 2000);
  }, [group, matchResults]);

  return (
    <>
      <Head>
        <title>Sortear fase de grupos</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={isMobile ? 4 : 0}
          >
            <Link href="/championship">
              <Button p={4} display="flex" alignItems="center" justifyContent="center" mr={4}>
                <FiChevronLeft size={24} />
                Voltar
              </Button>
            </Link>
            <Heading color="orange.900" fontSize={isMobile ? "28px" : "3xl"}>
              Sortear fase de grupos
            </Heading>
          </Flex>
          <Flex mt={4} maxW="700px" pt={8} pb={8} w="100%" bg="system.400" direction="column" align="center" justify="center">
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white" mb={4}>
              Classificação dos Grupos
            </Heading>
            <Flex w="100%" direction="column" align="center" justify="center">
              {groupedTeams.map((groupStandings, index) => (
                <Flex key={index} direction="column" mb={4}>
                  <Heading fontSize="xl" color="white" mb={2}>
                    {`Grupo ${groupStandings.nome_grupo}`}
                  </Heading>
                  <Table variant="simple" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th>Time</Th>
                        <Th isNumeric>Pontos</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {groupStandings.teams.map((team, teamIndex) => (
                        <Tr key={teamIndex}>
                          <Td>{team.teamName}</Td>
                          <Td isNumeric>{team.points}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex mt={4} maxW="700px" pt={8} pb={8} w="100%" bg="system.400" direction="column" align="center" justify="center">
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white" mb={4}>
              Resultados dos Jogos
            </Heading>
            <Table variant="simple" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Time 1</Th>
                  <Th>Time 2</Th>
                  <Th>Vencedor</Th>
                </Tr>
              </Thead>
              <Tbody>
                {matchResults.map((result, index) => (
                  <Tr key={index}>
                    <Td>{result.team1}</Td>
                    <Td>{result.team2}</Td>
                    <Td>{result.winner}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;

  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/groups', {
      params: {
        fk_competicao: id,
      },
    });

    return {
      props: {
        group: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        group: [],
      },
    };
  }
});
