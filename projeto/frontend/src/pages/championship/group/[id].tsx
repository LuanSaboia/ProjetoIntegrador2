// pages/phaseGroup.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Flex,
  Heading,
  Button,
  useMediaQuery,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import _ from "lodash";
import GroupTable from "@/components/groupTable";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";

export interface TeamItem{
  id_time: string,
  nome_time: string,
  abreviacao_time: string,
  imagem_time: string
}

interface TeamProps{
  team: TeamItem[]
}

export default function PhaseGroup({ team }: TeamProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [list, setList] = useState(team)
  // const [teams, setTeams] = useState([
  //   "Flamengo", "Palmeiras", "Atlético Mineiro", "São Paulo", "Internacional", "Grêmio", "Bahia", "Santos",
  //   "Fluminense", "Cruzeiro", "Corinthians", "Vasco da Gama", "Botafogo", "Athletico Paranaense", "Sport Recife", "Fortaleza",
  //   "Ceará", "Chapecoense", "América Mineiro", "Goiás", "Coritiba", "Vitória", "Ponte Preta", "Náutico",
  //   "Guarani", "Figueirense", "Avaí", "Joinville", "CSA", "Juventude", "Santa Cruz", "CRB",
  // ]);
  const [groupedTeams, setGroupedTeams] = useState([]);
  const [saveButton, setSaveButton] = useState(true)

  const handleSortTeams = () => {
    const shuffledTeams = _.shuffle(list);
    const grouped = _.chunk(shuffledTeams, 4);
  
    setGroupedTeams(grouped);
    setSaveButton(false)
    console.log(groupedTeams)
  };

  async function saveGroup() {
    // Inicializa um contador para rotular os grupos
    let groupCounter = 0;
    let firstTeam;
    // Itera sobre cada subarray em groupedTeams
    for (const teamArray of groupedTeams) {
      // Se o contador de grupos atingir 26, pare (Grupo Z seria o último possível)
      if (groupCounter >= 33) {
        console.log("Não é possível continuar com mais grupos.");
        break;
      }
  
      // Incrementa o contador de grupos
      groupCounter++;
  
      // Obtém a letra do alfabeto correspondente ao contador do grupo
      const groupLabel = String.fromCharCode(65 + groupCounter - 1);

      firstTeam = teamArray[0];
  
      // Itera sobre cada objeto de time no subarray
      for (const team of teamArray) {
        // Acesse a propriedade nome_time e faça o console.log com o rótulo do grupo
        console.log(`Grupo ${groupLabel}: ${team.nome_time}`);
        try {
          const apiClient = setupAPIClient();
          await apiClient.post('/group', {
            nome_grupo: groupLabel,
            fk_time: team.id_time,
            fk_competicao: team.fk_competicao
          });
          await finishChampionship(team.fk_competicao)
          
        } catch (error) {
          console.log(error);
          alert(`Erro ao cadastrar Grupo ${groupLabel}`);
          return
        }
      }
    }
    alert('Grupos Cadastrados!');
    Router.push(`/championship/group/match/${firstTeam.fk_competicao}`)
  }

  async function finishChampionship(id:string) {
    const apiClient = setupAPIClient();
    await apiClient.put('/championship', {
      id_comp: id,
      situacao_comp: false,
    });
  }

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
              Editar Grupo
            </Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {groupedTeams.map((group, index) => (
                <GridItem key={`group-${index}`} colSpan={1}>
                  <GroupTable group={group} groupName={`Grupo ${String.fromCharCode(65 + index)}`} />
                </GridItem>
              ))}
            </Grid>
            <Flex direction="row">
              <Button onClick={handleSortTeams} mt={4} mr={4}>
                Sortear Times
              </Button>
              <Button onClick={ saveGroup } mt={4} isDisabled={saveButton} bg="green.400" _hover={{ bg: "#green.200" }}>
                Salvar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;
  console.log(id)

  try {
      
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get('/team/championship',{
        params:{
          fk_competicao: id
        }
      })

      if(response.data === null){
          console.log(response.data)
      }
      
      return{
          props:{
              team: response.data
          }
      }

  } catch (error) {
      console.log(error)
      return {
          redirect:{
              destination: '/championship/group',
              permanent: false
          }
      }
  }
})
