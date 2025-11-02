import { Text, Box, Image, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import AdminSidebar from '../../components/layout/AdminSidebar';
import Header from '../../components/layout/Header';
import EcoSignInput from '../../components/forms/EcoSignInput';
import EcoSignSelect from '../../components/forms/EcoSignSelect';

import EcoSign from "../../assets/EcoSign.PNG";

import React from 'react';

function Register() {

    const navigate = useNavigate();

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const signButton = () => (
        <Button
            bg="accent"
            color="background"
            size='xs'
            _hover={{ bg: 'primary' }}>
            Firmar
        </Button>
    )

    const signedButton = () => (
        <Button
            bg="text"
            color="background"
            size='xs'>
            Firmado
        </Button>
    )

    return (
        <Flex minH="100vh" bg="background" w="full">
            <AdminSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4} marginLeft="250px">
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <Text as="b" fontSize="30px" mt={8} mb={5} color="text" textAlign="left">
                    Registro de usuarios
                </Text>
                <EcoSignInput
                    placeholder="Nombre/s"
                />
                <EcoSignInput
                    placeholder="Apellido Paterno"
                />
                <EcoSignInput
                    placeholder="Apellido Materno"
                />
                <EcoSignInput
                    placeholder="Correo electrónico"
                    type="email"
                />
                <EcoSignInput
                    placeholder="Contraseña"
                />
                <EcoSignInput
                    placeholder="Confirmar Contraseña"
                />
                <EcoSignInput
                    placeholder="Número de teléfono"
                    type="number"
                />
                <EcoSignSelect placeholder="Selecciona un rol de usuario">
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </EcoSignSelect>
                <Button
                    type="submit"
                    w="30%"
                    bg="accent"
                    color="background"
                    mb={10}
                    mr={10}
                    _hover={{ bg: 'primary' }}
                >
                    Registrar
                </Button>
            </Box>

        </Flex>
    )
}

export default Register;