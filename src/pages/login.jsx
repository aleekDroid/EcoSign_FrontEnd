import {
    Center,
    Box,
    Image,
    Button,
    VStack,
    Text
} from "@chakra-ui/react";
import EcoSign from "../assets/EcoSign.PNG";
import EcoSignInput from "../components/forms/EcoSignInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. AÑADE ESTADO DE CARGA Y ERROR
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // 3. REEMPLAZA LA FUNCIÓN handleLogin
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Llama al servicio real con la lógica de ECC
            const userData = await loginUser(email, password);

            setIsLoading(false);

            // Redirige basado en el ROL que viene de la API
            if (userData.roleId === 1) {
                navigate('/adminHome');
            } else {
                navigate('/userHome');
            }

        } catch (err) {
            setIsLoading(false);
            setError(err.message);
            setPassword('');
        }
    }

    return (
        <Center minHeight="100vh" bg="bg-default">
            <Box
                textAlign="center"
                p={8}
                bg="bg-default"
                maxW="md"
                w="70%"
                fontFamily="body">
                <form onSubmit={handleLogin}>
                    <VStack spacing={8} mb={8}>
                        <Image
                            src={EcoSign}
                            alt="EcoSign Logo"
                            w={"300px"}
                            mx="auto"
                            mb={0}
                        />
                        <EcoSignInput
                            placeholder="Correo electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isDisabled={isLoading}
                        />
                        <EcoSignInput
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isDisabled={isLoading}
                        />

                        {/* 4. MUESTRA EL ERROR SI EXISTE */}
                        {error && (
                            <Text color="red.500" fontSize="sm" px={4}>
                                {error}
                            </Text>
                        )}

                        <Button
                            type="submit"
                            size="sm"
                            borderRadius="full"
                            bg="text-default"
                            w="40%"
                            color="bg-default"
                            _hover={{ bg: 'secondary-default' }}
                            isLoading={isLoading}
                        >
                            Iniciar sesión
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Center>
    );
}

export default LoginPage;