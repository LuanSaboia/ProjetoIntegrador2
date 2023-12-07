import { use, useEffect, useState } from "react";
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Image,
    Select,
    useDisclosure
} from "@chakra-ui/react"
import { Sidebar } from "@/components/sidebar";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi"

import Router from "next/router";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { ModalInfo } from "@/components/modal";

interface TeamItem{
    id_time: string,
    nome_time: string,
    abreviacao_time: string,
    imagem_time: string
}

export interface FootballerItem{
    id_jogador: string,
    nome_jogador: string,
    numero_jogador: number,
    time: TeamItem
}

interface EditFootballerProps{
    footballer: FootballerItem
}

interface TeamProps{
    team: TeamItem[]
}

export default function EditFootballer({ footballer }: EditFootballerProps, { team }: TeamProps){
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [idFootballer, setIdFootballer] = useState(footballer?.id_jogador)
    const [idTime, setIdTime] = useState(footballer?.time?.id_time || null)

    const [nome, setNome] = useState(footballer?.nome_jogador)
    const [numero, setNumero] = useState(footballer?.numero_jogador)
    const [status, setStatus] = useState(false)
    // const [timeSelect, setTimeSelect] = useState(team[0])

    const [teams, setTeams] = useState<TeamItem[]>(team || []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get('/teams');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
                // Trate os erros conforme necessário
            }
        };

        fetchData();

    }, []);
      
    async function handleChangeSelect(id: string) {
        const timeItem = teams.find(item => item.id_time === id)
        setIdTime(timeItem.id_time)
    }

    function handleRemove(){
        setIdTime(null)
        setStatus(true)
        alert('Time removido')
    }

    async function handleDelete() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete('/footballer',{
                params:{
                    id_jogador: idFootballer
                }
            });
            alert("Jogador removido!")
            Router.push("/footballer")

        } catch (error) {
            console.log(error)
        }
    }

    async function handleUpdate() {
        // if(nome === '' || abreviar === '' || dtInicioComp === '' || dtFimComp === '' || qtdTimeComp === ''){
        //     return
        // }

        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/footballer', {
                nome_time: nome,
                numero_jogador: numero,
                fk_time: idTime || null,
                id_jogador: footballer?.id_jogador
            })
            alert('Atualizado com sucesso')

            Router.push("/footballer")
        } catch (error) {
            console.log(error)
            alert('Erro ao atualizar')
        }
    }

    return(
        <>
            <Head>
                <title>Editando Jogador</title>
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

                        <Link href="/footballer">
                            <Button p={4} display="flex" alignItems="center" justifyContent="center" mr={4}>
                                <FiChevronLeft size={24} />
                                Voltar
                            </Button>
                        </Link>

                        <Heading
                            color="orange.900"
                            fontSize={isMobile? "28px" : "3xl"}
                        >
                            Editar Jogador
                        </Heading>
                    </Flex>

                    <Flex mt={4} maxW="700px" pt={8} pb={8} w="100%" bg="system.400" direction="column" align="center" justify="center">
                        <Heading fontSize={isMobile ? "22px" : "3xl"} color="white" mb={4}>Editar jogador</Heading>

                        <Flex
                                maxW="700px"
                                align="center"
                                mb={3}
                                w="85%"
                                direction="column"
                        >
                            <Input 
                                placeholder="Nome do jogador"
                                w="85%"
                                size="lg"
                                mb={3}
                                type="text"
                                bg="system.900"
                                color="white"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input 
                                placeholder="Numero da camisa"
                                w="85%"
                                size="lg"
                                mb={3}
                                type="number"
                                bg="system.900"
                                color="white"
                                value={numero}
                                onChange={(e) => setNumero(e.target.valueAsNumber)}
                            />
                            <Flex mb={4}>
                                {footballer.time ? 
                                    <>
                                    <Text color="orange.400" fontWeight="bold" mr={4} noOfLines={1}>Clube atual: </Text>
                                    {footballer?.time?.imagem_time ? 
                                        <Image
                                            boxSize='34px'
                                            src={footballer?.time?.imagem_time}
                                            alt='RMA'
                                            visibility={footballer?.time?.imagem_time ? "visible" : "hidden"}
                                        /> : <></>
                                    }
                                    <Text color="white" fontWeight="bold" ml={4} noOfLines={1}>{footballer?.time?.nome_time}</Text>
                                    <Button
                                        onClick={handleRemove}
                                        w="30%"
                                        size="sm"
                                        color="gray.900"
                                        bg="button.cta"
                                        _hover={{ bg: "#FFb13e"}}
                                        ml={3}
                                        isDisabled={status}
                                    >
                                        Remover clube
                                    </Button>

                                    </> 
                                    : <>
                                        <Text color="orange.400" fontWeight="bold" mr={4} >Registrar novo clube: </Text>
                                        <Select mb={3} size="lg" w="100%" bg="system.900" color="white" onChange={ (e) => handleChangeSelect(e.target.value)}>
                                            {teams?.map( item => (
                                                <option key={item?.id_time} value={item?.id_time}>{item?.nome_time}</option>
                                            ))}
                                        </Select>
                                    </>}
                            
                            </Flex>
                            <Flex align="center" w="100%">
                                <Button
                                    onClick={handleUpdate}
                                    w="85%"
                                    size="lg"
                                    color="gray.900"
                                    mb={6}
                                    mr={3}
                                    bg="button.cta"
                                    _hover={{ bg: "#FFb13e"}}
                                    >
                                    Atualizar
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    w="85%"
                                    size="lg"
                                    color="gray.900"
                                    mb={6}
                                    ml={3}
                                    colorScheme='red'
                                    variant="solid"
                                    >
                                    Remover Jogador
                                </Button>
                            </Flex>
                        </Flex>

                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params;
    console.log(id)

    try {
        const apiClient = setupAPIClient(ctx);
        const timeResponse = await apiClient.get('/footballer/detail', {
            params:{
                id_jogador: id
            }
        });

        return {
            props:{
                footballer: timeResponse.data
            }
        }

    } catch (error) {
        console.log(error)

        return {
            redirect:{
                destination: '/footballer',
                permanent: false
            }
        }
    }
    
})