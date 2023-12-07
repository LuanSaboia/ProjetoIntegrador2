import { useState, ChangeEvent } from "react"
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { 
    Flex,
    Text,
    Heading,
    Button,
    Stack,
    Switch,
    useMediaQuery,
    Image
} from "@chakra-ui/react"
import Link from "next/link";

import { IoMdPricetag } from "react-icons/io"
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";
import { FaTimes } from "react-icons/fa";
export interface TeamItem{
    id_time: string,
    nome_time: string,
    abreviacao_time: string,
    imagem_time: string,
    fk_competicao: string
}

interface ChampionshipItem{
    id_comp: string,
    nome_comp: string,
    quantidade_times_comp: string,
}

interface ChampionshipProps{
    championship: ChampionshipItem
}

interface TeamProps{
    teams: TeamItem[]
}

export default function Match({ teams }: TeamProps){

    const [isMobile] = useMediaQuery("(max-width: 500px)")
    const [teamList, setteamList] = useState<TeamItem[]>(teams || [])
    const [championshipList, setChampionshipList] = useState<ChampionshipItem | null>(null)
    const [idComp, setIdComp] = useState(teams)
    
    async function handleMatch() {
        try {
          const shuffledTeams = [...teamList];
    
          if (shuffledTeams.length < 2) {
            alert('Não há times suficientes para fazer sorteio.');
            return;
          }
    
          // Obtém o id da primeira competição
          const firstTeamCompId = shuffledTeams[0]?.fk_competicao;
    
          // Obtém os detalhes da competição
          const apiClient = setupAPIClient();
          const response = await apiClient.get('/championship/detail', {
            params: {
              id_comp: firstTeamCompId,
            },
          });
    
          const championshipDetails: ChampionshipItem = response.data;
    
          // Armazena os detalhes da competição no estado
          setChampionshipList(championshipDetails);
          
          if(Number(championshipDetails.quantidade_times_comp) !== shuffledTeams.length){
            alert('Verifique a quantidade de times!');
            return;
          }

          const matchPromises = shuffledTeams.reduce((promises, team1, index) => {
            if (index % 2 === 0) {
              const team2 = shuffledTeams[index + 1];
    
              if (team1 && team2) {
                const matchPromise = (async () => {
                  try {
                    await apiClient.post('/match', {
                      fk_comp: team1.fk_competicao,
                      fk_time1: team1.id_time,
                      nome_time1: team1.nome_time,
                      img_time1: team1.imagem_time,
                      fk_time2: team2.id_time,
                      nome_time2: team2.nome_time,
                      img_time2: team2.imagem_time,
                      status: true,
                    });
    
                    return team1.fk_competicao;
                  } catch (error) {
                    console.log(error);
                    alert('Erro ao cadastrar a partida');
                    return null;
                  }
                })();
    
                promises.push(matchPromise);
              }
            }
            return promises;
          }, []);
    
          const idComps = await Promise.all(matchPromises);
          const validIdComps = idComps.filter((idComp) => idComp !== null);
    
          if (validIdComps.length > 0) {
            const idComp = validIdComps[0];
            setIdComp(idComp);
    
            // Atualiza a situação da competição
            await apiClient.put('/championship', {
              id_comp: idComp,
              situacao_comp: false,
            });
    
            alert(`Sorteio Feito! Redirecionando para partidas... ${idComp}`);
            Router.push(`/match/next/${idComp}`);
          } else {
            alert('Erro ao cadastrar todas as partidas');
          }
        } catch (error) {
          console.log(error);
          alert('Erro ao processar a operação.');
        }
      }
    
    async function handleRemoveTeam(id: string){
        

        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/team', {
                fk_competicao: null,
                id_time: id
            });
            alert("Removido da competição")
            Router.reload();
        } catch (error) {
            console.error(error);
            // Adicione uma lógica de tratamento de erro, se necessário
            alert('Erro ao atualizar');
        }
    }

    return(
        <>
            <Head>
                <title>Times</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    
                    <Flex
                        direction={isMobile? "column" : "row"}
                        w="100%"
                        alignItems={isMobile? "flex-start" : "center"}
                        justifyContent="flex-start"
                        mb={0}
                    >
                        <Heading
                            fontSize={isMobile? "28px" : "3xl"}
                            mt={4}
                            mb={4}
                            mr={4}
                            color="orange.900"
                        >
                            Times cadastrados
                        </Heading>

                        {/* <Link href="/championship/">
                            <Button>Atualizar competição</Button>
                        </Link> */}
                    </Flex>

                    <Flex
                        direction="row"
                        w="auto"
                        alignItems={isMobile? "flex-start" : "center"}
                        justifyContent="center"
                        mb={0}
                        flexWrap="wrap"
                    >
                        {teams.map(time => (
                                <Flex 
                                cursor="pointer"
                                w="auto"
                                p={4}
                                bg="system.400"
                                direction={isMobile ? "column" : "row"}
                                align={isMobile ? "flex-start" : "center"}
                                rounded="4"
                                mb={2}
                                ml={2}
                                justifyContent="space-between"
                                // onClick={() => handleTeam(time.id_time) }
                            >
                                <Flex alignItems="center" mr={3}>
                                    {/* Adicione um ícone (X) aqui */}
                                    <FaTimes 
                                        size={20} // Defina o tamanho desejado
                                        color="white"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Impede que o clique no ícone propague para o Flex
                                            // Adicione a lógica que você deseja executar ao clicar no ícone aqui
                                            handleRemoveTeam(time.id_time);
                                        }}
                                    />
                                </Flex>
                                <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center">
                                    {time.imagem_time ? 
                                        <Image
                                            boxSize='34px'
                                            src={time.imagem_time}
                                            alt={time.abreviacao_time}
                                            visibility={time.imagem_time ? "visible" : "hidden"}
                                            mr={2}
                                        /> : <></>
                                    }
                                    <Text color="white" noOfLines={2} fontWeight="bold">
                                        {time.nome_time}
                                    </Text>
                                </Flex>
                                
                            </Flex>
                        ))}
                        <Button
                            onClick={ handleMatch }
                            w="85%"
                            size="lg"
                            color="gray.900"
                            mb={6}
                            mt={3}
                            bg="button.cta"
                            _hover={{ bg: "#FFb13e"}}
                        >
                            Sortear jogos
                        </Button>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params;

    try {
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/team/championship', {
            params:{
                fk_competicao: id
            }
        })

        if(response.data === null){
            return {
                redirect:{
                    destination: '/championship',
                    permanent: false
                }
            }
        }
        
        return{
            props:{
                teams: response.data
            }
        }

    } catch (error) {
        console.log(error)
        return {
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})