import { useState, useEffect,ChangeEvent } from "react"
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { 
    Flex,
    Text,
    Heading,
    Button,
    Input,
    useMediaQuery
} from "@chakra-ui/react"
import Link from "next/link";

import { IoMdPricetag } from "react-icons/io"
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";


interface TeamItem{
    id_time: string,
    nome_time: string,
    abreviacao_time: string
}

interface FootballersItem{
    id_jogador: string,
    nome_jogador: string,
    numero_jogador: number,
    time: TeamItem
}

interface FootballersProps{
    footballers: FootballersItem[]
}

export default function Footballer({ footballers }: FootballersProps){

    const [isMobile] = useMediaQuery("(max-width: 500px)")
    const [footballerList, setFootballerList] = useState<FootballersItem[]>(footballers || [])
    const [disableChampionship, setDisableChampionship] = useState("enabled")
    const [order, setOrder] = useState('asc'); // Estado para controlar a ordem (ascendente ou descendente)
    const [searchTerm, setSearchTerm] = useState(''); // Estado para controlar o termo de busca

    useEffect(() => {
        // Função para ordenar os times com base no estado de ordem
        const sortedList = [...footballers].sort((a, b) =>
        order === 'asc'
            ? a.nome_jogador.localeCompare(b.nome_jogador)
            : b.nome_jogador.localeCompare(a.nome_jogador)
        );

        // Função para filtrar os footballers com base no termo de busca
        const filteredList = sortedList.filter((item) =>
        item.nome_jogador.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFootballerList(filteredList);
    }, [footballers, order, searchTerm]);

    const handleOrderChange = () => {
        setOrder(order === 'asc' ? 'desc' : 'asc');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return(
        <>
            <Head>
                <title>Jogadores</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    
                <Flex w="100%" direction="row" align="center" justify="space-between">
                        <Flex w="100%" align="center">
                            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900" >Jogadores</Heading>
                            <Link href="/footballer/new">
                                <Button>Cadastrar</Button>
                            </Link>
                        </Flex>
                        <Flex w="100%" align="center" justify="center">
                            <Input
                                background="system.400"
                                variant="filled"
                                size="lg"
                                type="text"
                                placeholder="Buscar jogador"
                                color="#FFF"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button onClick={handleOrderChange} ml={3}>
                            {order === 'asc' ? 'Ordenar Z - A' : 'Ordenar A - Z'}
                            </Button>
                        </Flex>
                    </Flex>

                    {footballerList.map(footballer => (
                        <Link key={footballer?.id_jogador} href={`/footballer/${footballer?.id_jogador}`}>
                            <Flex 
                                cursor="pointer"
                                w="900px"
                                p={4}
                                bg="system.400"
                                direction={isMobile? "column" : "row"}
                                align={isMobile? "flex-start" : "center"}
                                rounded="4"
                                mb={2}
                                justifyContent="space-between"
                                >
                                <Flex mb={isMobile? 2 : 0} direction="row" alignItems="center" justifyContent="center">
                                    <IoMdPricetag size={28} color="#fba931" />
                                    <Text color="white" ml={4} noOfLines={2} fontWeight="bold">
                                        Nº {footballer?.numero_jogador}
                                    </Text>
                                    <Text color="white" ml={4} noOfLines={2} fontWeight="bold">
                                        {footballer?.nome_jogador}
                                    </Text>
                                </Flex>

                                <Flex>
                                    <Text color="white" fontWeight="bold" mr={3}>
                                        Time:  {footballer?.time ? footballer?.time.nome_time : "Sem clube"}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Link>
                    ))}

                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {
        
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/footballer',
        {
            params:{
                status: true
            }
        })
        console.log(response.data)

        if(response.data === null){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        
        return{
            props:{
                footballers: response.data
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