import { Center, Box, Heading, Image, Button, VStack, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Eye, EyeClosed } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import EcoSign from "../assets/EcoSign.PNG";
import EcoSignInput from "../components/forms/EcoSignInput";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";

import React from "react";

function LoginPage() {

    const { formData, handleChange, handleSubmit, isLoading } = useLoginForm();

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.5, rotate: 180 }
    };

    return (
        <Center minHeight="100vh" bg="bg-default">
            <Box
                textAlign="center"
                p={8} // P de padding, nota.
                bg="bg-default"
                maxW="md"
                w="70%"
                fontFamily="body">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={8} mb={8}>
                        <Image
                            src={EcoSign}
                            alt="EcoSign Logo" // texto alternativo por si la imagen no carga.
                            w={"300px"}
                            mx="auto"
                            mb={0}
                        />
                        <EcoSignInput
                            placeholder="Correo electrónico"
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                        />
                        <InputGroup>
                            <EcoSignInput
                                placeholder="Contraseña"
                                type={show ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
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