import { Center, Box, Heading, Image, Button, VStack, Input } from "@chakra-ui/react";
import EcoSign from "../assets/EcoSign.PNG";
import EcoSignInput from "../components/forms/EcoSignInput";

function LoginPage() {
    return (
        <Center minHeight="100vh" bg="background">
            <Box
                textAlign="center"
                p={8}
                bg="background"
                maxW="md"
                w="60%"
                fontFamily = "body">
                <VStack spacing={8} mb={8}>
                    <Image
                        src={EcoSign}
                        alt="EcoSign Logo" // Texto alternativo por si la imagen no carga.
                        w={"300px"}
                        mx="auto"
                        mb={0}
                    />
                    <EcoSignInput placeholder="Correo electrónico" type="email" />
                    <EcoSignInput placeholder="Contraseña" type="password" />

                    <Button
                        size="sm"
                        borderRadius="full"
                        bg="text"
                        w= "40%"
                        color="background"
                        _hover={{ bg: 'secondary' }}>
                        Iniciar sesión
                    </Button>
                </VStack>

            </Box>
        </Center>
    );
}

export default LoginPage;