import { useState } from "react";
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Image,
    useDisclosure
} from "@chakra-ui/react"
import { Sidebar } from "@/components/sidebar";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi"

import Router from "next/router";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { ModalInfo } from "@/components/modal";

export interface TeamItem{
    id_time: string,
    nome_time: string,
    abreviacao_time: string,
    imagem_time: string,
    fk_competicao: string
}

interface EditTeamProps{
    team: TeamItem
}

export default function EditTeam({ team }: EditTeamProps){
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [idTeam, setIdTeam] = useState(team?.id_time)

    const [nome, setNome] = useState(team?.nome_time)
    const [abreviar, setAbreviar] = useState(team?.abreviacao_time)
    const [image, setImage] = useState(team?.imagem_time)

    async function handleUpdate() {
        // if(nome === '' || abreviar === '' || dtInicioComp === '' || dtFimComp === '' || qtdTimeComp === ''){
        //     return
        // }

        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/team', {
                nome_time: nome,
                abreviacao_time: abreviar,
                imagem_time: image || null,
                id_time: team?.id_time
            })
            alert('Atualizado com sucesso')

            Router.push("/team")
        } catch (error) {
            console.log(error)
            alert('Erro ao atualizar')
        }
    }

    async function handleDelete() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete('/team',{
                params:{
                    id_time: idTeam
                }
            });
            alert("Time removido!")
            Router.push("/team")

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <Head>
                <title>Editando campeonato</title>
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

                        <Link href="/team">
                            <Button p={4} display="flex" alignItems="center" justifyContent="center" mr={4}>
                                <FiChevronLeft size={24} />
                                Voltar
                            </Button>
                        </Link>

                    </Flex>

                    <Flex mt={4} maxW="700px" pt={8} pb={8} w="100%" bg="system.400" direction="column" align="center" justify="center">
                        
                        <Heading fontSize={isMobile ? "22px" : "3xl"} color="white" mb={4}>Editar Time</Heading>

                        <Flex
                                maxW="700px"
                                align="center"
                                mb={3}
                                w="85%"
                            >
                                {image ? 
                                    <Image
                                        //borderRadius='full'
                                        boxSize='34px'
                                        src={image}
                                        alt='RMA'
                                        visibility={image ? "visible" : "hidden"}
                                        mr={2}
                                    /> : <></>
                                }
                                
                                <Input 
                                    placeholder="Url do escudo"
                                    w="100%"
                                    size="lg"
                                    type="text"
                                    bg="system.900"
                                    color="white"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </Flex>

                            <Input 
                                placeholder="Nome do time"
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
                                placeholder="Abreviação do time"
                                w="85%"
                                size="lg"
                                mb={3}
                                type="text"
                                bg="system.900"
                                color="white"
                                value={abreviar}
                                onChange={(e) => setAbreviar(e.target.value)}
                            />
                            <Flex align="center">
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
                                    onClick={ handleDelete }
                                    w="85%"
                                    size="lg"
                                    color="gray.900"
                                    mb={6}
                                    ml={3}
                                    colorScheme='red'
                                    variant="solid"
                                    >
                                    Remover Time
                                </Button>
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
        const timeResponse = await apiClient.get('/team/detail', {
            params:{
                id_time: id
            }
        });

        return {
            props:{
                team: timeResponse.data
            }
        }

    } catch (error) {
        console.log(error)

        return {
            redirect:{
                destination: '/team',
                permanent: false
            }
        }
    }
    
})