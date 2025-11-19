import { Text, Box, Image, Flex, InputGroup, Button, InputRightElement } from '@chakra-ui/react';
import { Eye, EyeClosed } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import React from 'react';

import AdminSidebar from '../../components/layout/AdminSidebar';
import Header from '../../components/layout/Header';
import EcoSignInput from '../../components/forms/EcoSignInput';
import EcoSignSelect from '../../components/forms/EcoSignSelect';
import EcoSign from "../../assets/EcoSign.PNG";

import { useRegisterForm } from '../../hooks/useRegisterForm';

function Register() {

    const navigate = useNavigate();

    const { formData, handleChange, handleSubmit, isLoading } = useRegisterForm();

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.5, rotate: 180 }
    };

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <AdminSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4} marginLeft="250px">
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <Text as="b" fontSize="30px" mt={8} mb={5} color="text-default" textAlign="left">
                    Registro de usuarios
                </Text>
                <form onSubmit={handleSubmit}>
                    <EcoSignInput
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        placeholder="Nombre/s"
                    />
                    <EcoSignInput
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleChange}
                        placeholder="Apellido Paterno"
                    />
                    <EcoSignInput
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleChange}
                        placeholder="Apellido Materno"
                    />

                    <EcoSignInput
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        type="email"
                    />
                    <InputGroup>
                        <EcoSignInput
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            type={show ? 'text' : 'password'}
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
                    <InputGroup>
                        <EcoSignInput
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirmar Contraseña"
                            type={show ? 'text' : 'password'}
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
                    <EcoSignInput
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Número de teléfono"
                        type="number"
                    />
                    <EcoSignSelect
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        placeholder="Selecciona un rol de usuario"
                    >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </EcoSignSelect>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Registrando..."
                        w="30%"
                        bg="accent-default"
                        color="bg-default"
                        mb={10}
                        mr={10}
                        _hover={{ bg: 'primary-default' }}
                    >
                        Registrar
                    </Button>
                </form>
            </Box>

        </Flex>
    )
}

export default Register;