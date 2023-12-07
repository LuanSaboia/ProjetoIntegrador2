import { useContext, useState } from "react";
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Box,
    Input,
    Button
} from '@chakra-ui/react'
import { Sidebar } from "@/components/sidebar";

import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { AuthContext } from "@/context/AuthContext";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";

interface UserProps{
    id: string,
    nome_user: string,
    sobrenome_user: string,
    email_user: string,
}

interface ProfileProps{
    user: UserProps
}

export default function Profile({ user }: ProfileProps){

    const { logoutUser } = useContext(AuthContext);
    const [id, setId] = useState(user && user?.id);
    const [nome, setNome] = useState(user && user?.nome_user);
    const [sobrenome, setSobrenome] = useState(user && user?.sobrenome_user);
    const [email, setEmail] = useState(user && user?.email_user);

    async function handleLogout(){
        await logoutUser();
        alert("Usuário deslogado")
    }

    async function handleUpdateUser() {
        if(nome === '' && sobrenome === '' && email === ''){
            return;
        }
        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/users', {
                nome_user: nome,
                sobrenome_user: sobrenome,
                email_user: email
            })
            alert("Usuário atualizado")
        } catch (error) {
            console.log(error);
            alert("Erro ao atualizar")
        }
    }
    async function handleRemove() {
        try {
            await logoutUser();
            const apiClient = setupAPIClient();
            await apiClient.delete('/user', {
                params: {id_user: id}
            })
            alert("Usuário removido")
            Router.push("/login")
        } catch (error) {
            console.log(error);
            alert("Erro ao remover")
        }
    }
    
    return(
        <>
            <Head>
                <title>Minha conta</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">

                    <Flex w="100%" direction="row" alignItems="center" justifyContent="flex-start">
                        <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">Minha Conta</Heading>
                    </Flex>

                    <Flex pt={8} pb={8} bg="system.400" maxW="700px" w="100%" direction="column" alignItems="center" justifyContent="center">
                        <Flex direction="column" w="85%">
                            <Flex direction="row" justify="space-between">
                                <Flex direction="column">
                                    <Text mb={2} fontSize="xl" fontWeight="bold" color="white" >Nome:</Text>
                                    <Input
                                        w="100%"
                                        bg="gray.900"
                                        placeholder="Nome"
                                        size="lg"
                                        type="text"
                                        mb={3}
                                        color="white"
                                        value={nome}
                                        onChange={ (e) => setNome(e.target.value) }
                                    />
                                </Flex>
                                <Flex direction="column">
                                    <Text mb={2} fontSize="xl" fontWeight="bold" color="white" >Sobrenome:</Text>
                                    <Input
                                        w="100%"
                                        bg="gray.900"
                                        placeholder="Sobrenome"
                                        size="lg"
                                        type="text"
                                        mb={3}
                                        color="white"
                                        value={sobrenome}
                                        onChange={ (e) => setSobrenome(e.target.value) }
                                    />
                                </Flex>
                            </Flex>
                            <Text mb={2} fontSize="xl" fontWeight="bold" color="white" >Email:</Text>
                            <Input
                                w="100%"
                                bg="gray.900"
                                placeholder="Email"
                                size="lg"
                                type="text"
                                mb={3}
                                color="white"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                            />

                        <Button
                            w="100%"
                            mt={3}
                            mb={4}
                            bg="button.cta"
                            size="lg"
                            _hover={{ bg: "#ffb13e"}}
                            onClick={handleUpdateUser}
                        >
                            Salvar
                        </Button>

                        <Button
                            w="100%"
                            mb={6}
                            bg="transparent"
                            borderWidth={2}
                            borderColor="red.500"
                            color="red.500"
                            size="lg"
                            _hover={{ bg: "transparent"}}
                            onClick={handleLogout}
                        >
                            Sair da conta
                        </Button>
                        <Button
                            w="100%"
                            mb={6}
                            bg="red.500"
                            color= "white"
                            borderWidth={2}
                            _hover={{ bg: "transparent"}}
                            size="lg"
                            onClick={handleRemove}
                        >
                            Remover conta
                        </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {
        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get('/me')

        const user = {
            id: response.data.id_user,
            nome_user: response.data.nome_user,
            sobrenome_user: response.data.sobrenome_user,
            email_user: response.data.email_user,
        }

        return{
            props:{
                user: user
            }
        }
        
    } catch (error) {
        console.log(error);

        return{
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }
    
})