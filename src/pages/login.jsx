import { Center, Box, Heading, Image, Button, VStack, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";
import { Eye, EyeClosed } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import EcoSign from "../assets/EcoSign.PNG";
import EcoSignInput from "../components/forms/EcoSignInput";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import { loginUser } from "../services/authService";
import React from 'react';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const toast = useToast(); 

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.5, rotate: 180 }
    };

    const validateInputs = () => {
        if (!email.trim() || !password.trim()) {
            showToast("Campos vacíos", "Por favor ingresa tu correo y contraseña.", "warning");
            return false;
        }

        // Regex: Mínimo 12 caracteres, al menos 1 mayúscula, al menos 1 caracter especial
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;
        
        if (!passwordRegex.test(password)) {
            showToast(
                "Contraseña inválida", 
                "La contraseña debe tener al menos 12 caracteres, una mayúscula y un símbolo especial.", 
                "warning"
            );
            return false;
        }

        return true;
    };

    const showToast = (title, desc, status) => {
        toast({ 
            title: title, 
            description: desc, 
            status: status, 
            duration: 5000, 
            isClosable: true, 
            position: 'top-right' 
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userData = await loginUser(email, password);

            setIsLoading(false);
            showToast("Bienvenido", `¡Hola ${userData.name || 'Usuario'}! Has iniciado sesión correctamente.`, "success");

            // Redirige basado en el ROL que viene de la API
            if (userData.roleId === 1) {
                navigate('/adminHome');
            } else {
                navigate('/userHome');
            }

        } catch (err) {
            setIsLoading(false);
            const msg = err.message || 'Error al iniciar sesión';
            setError(msg);

            showToast("Error de inicio de sesión", msg, "error");
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
                fontFamily="body"
            >
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
                            isInvalid={!!error}
                        />
                        <InputGroup>
                            <EcoSignInput
                                placeholder="Contraseña"
                                type={show ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isDisabled={isLoading}
                                isInvalid={!!error}
                            />

                            <InputRightElement width='4.5rem'>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={show ? 'eye' : 'eyeClosed'}
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.08 }}
                                    >
                                        <Button h='1.75rem' size='sm' onClick={handleClick} bg="transparent" p={0} _hover={{ bg: 'transparent', color: 'accent-default' }}>
                                            {show ? <Eye /> : <EyeClosed />}
                                        </Button>
                                    </motion.div>
                                </AnimatePresence>
                            </InputRightElement>

                        </InputGroup>

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            loadingText="Iniciando sesión..."
                            size="sm"
                            borderRadius="full"
                            bg="text-default"
                            w="40%"
                            color="bg-default"
                            _hover={{ bg: 'secondary-default' }}
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