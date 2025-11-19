import { Center, Box, Heading, Image, Button, VStack, Input } from "@chakra-ui/react";
import EcoSign from "../assets/EcoSign.PNG";
import EcoSignInput from "../components/forms/EcoSignInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === 'admin@uteq.edu' && password === 'Admin$123') {
            navigate('/adminHome');
        } else if (email === 'user@uteq.edu' && password === 'User$123') {
            navigate('/userHome');
        } else {
            alert('Correo o contraseña incorrecta. Por favor, inténtalo de nuevo.');
            setPassword('');
        }
    }

    return (
        <Center minHeight="100vh" bg="bg-default">
            <Box
                textAlign="center"
                p={8} // P de padding, nota.
                bg="bg-default"
                maxW="md"
                w="70%"
                fontFamily="body">
                <form onSubmit={handleLogin}>
                    <VStack spacing={8} mb={8}>
                        <Image
                            src={EcoSign}
                            alt="EcoSign Logo" // Texto alternativo por si la imagen no carga.
                            w={"300px"}
                            mx="auto"
                            mb={0}
                        />
                        <EcoSignInput 
                        placeholder="Correo electrónico" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <EcoSignInput 
                        placeholder="Contraseña"
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            size="sm"
                            borderRadius="full"
                            bg="text-default"
                            w="40%"
                            color="bg-default"
                            _hover={{ bg: 'secondary-default' }}>
                            Iniciar sesión
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Center>
    );
}

export default LoginPage;