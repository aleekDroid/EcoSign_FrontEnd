import React from 'react';
import { Text, Box, Image, Flex, Button, InputRightElement, InputGroup } from '@chakra-ui/react';
import { Eye, EyeClosed } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

import AdminSidebar from '../../components/layout/AdminSidebar';
import Header from '../../components/layout/Header';
import EcoSignInput from '../../components/forms/EcoSignInput';
import EcoSignSelect from '../../components/forms/EcoSignSelect';
import EcoSign from "../../assets/EcoSign.PNG";

import { useRegisterForm } from '../../hooks/useRegisterForm';

function Register() {
    const { formData, handleChange, handleSubmit, isLoading } = useRegisterForm();

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.5, rotate: 180 }
    };

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <AdminSidebar />
            <Box w="full" p={10} maxW="full" pl={{ base: '90px', md: '290px' }}>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />

                <Text as="b" fontSize="30px" mt={8} mb={5} color="text-default" textAlign="left">
                    Registro de usuarios
                </Text>

                <form onSubmit={handleSubmit}>
                    <EcoSignInput placeholder="Nombre/s" name="name" value={formData.name} onChange={handleChange} isRequired />
                    <EcoSignInput placeholder="Apellido Paterno" name="lastName" value={formData.lastName} onChange={handleChange} isRequired />
                    <EcoSignInput placeholder="Apellido Materno" name="middleName" value={formData.middleName} onChange={handleChange} />
                    <EcoSignInput placeholder="Correo electrónico" type="email" name="email" value={formData.email} onChange={handleChange} isRequired />
                    <EcoSignInput placeholder="Número de Empleado" name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} isRequired />

                    <InputGroup>
                        <EcoSignInput placeholder="Contraseña" name="password" type={show ? "text" : "password"} value={formData.password} onChange={handleChange} isRequired />
                        <InputRightElement width='4.5rem'>
                            <AnimatePresence mode="wait">
                                <motion.div key={show ? 'eye' : 'eyeClosed'} variants={iconVariants} initial="hidden" animate="visible" exit="exit">
                                    <Button h='1.75rem' size='sm' onClick={handleClick} bg="transparent">
                                        {show ? <Eye /> : <EyeClosed />}
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        </InputRightElement>
                    </InputGroup>

                    <InputGroup>
                        <EcoSignInput placeholder="Confirmar Contraseña" name="confirmPassword" type={show ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} isRequired />
                        <InputRightElement width='4.5rem'>
                            <AnimatePresence mode="wait">
                                <motion.div key={show ? 'eye' : 'eyeClosed'} variants={iconVariants} initial="hidden" animate="visible" exit="exit">
                                    <Button h='1.75rem' size='sm' onClick={handleClick} bg="transparent">
                                        {show ? <Eye /> : <EyeClosed />}
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        </InputRightElement>
                    </InputGroup>

                    <EcoSignSelect placeholder="Selecciona un rol de usuario" name="role" value={formData.role} onChange={handleChange}>
                        <option value="1">Administrador</option>
                        <option value="2">Usuario</option>
                    </EcoSignSelect>

                    <Button type="submit" w="30%" bg="accent-default" color="bg-default" mb={10} mr={10} isLoading={isLoading} _hover={{ bg: 'primary-default' }}>
                        Registrar
                    </Button>
                </form>
            </Box>
        </Flex>
    )
}

export default Register;