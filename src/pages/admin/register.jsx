import { Text, Box, Image, Flex, Button, InputRightElement, Alert, AlertIcon, InputGroup } from '@chakra-ui/react';
import { Eye, EyeClosed } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import AdminSidebar from '../../components/layout/AdminSidebar';
import Header from '../../components/layout/Header';
import EcoSignInput from '../../components/forms/EcoSignInput';
import EcoSignSelect from '../../components/forms/EcoSignSelect';

import EcoSign from "../../assets/EcoSign.PNG";
import api from '../../services/api';
import React, { useState } from 'react';

// --- CLAVE PÚBLICA DEL BACKEND (secp256k1) ---
const BACKEND_PUBLIC_KEY = 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEvK/cRv4McpZnjINlh6oZa7oQjWusMCD2gavNEkUO8ULrCXvPm15DwRFxB9tD4+gUDtHc0axwo5gh7/kCd7CBxA==';

function Register() {
    const navigate = useNavigate();

    // const { formData, handleChange, handleSubmit, isLoading } = useRegisterForm();
    // --- 1. ESTADOS DEL FORMULARIO (Coinciden con UserInputDTO) ---
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        middleName: '',
        email: '',
        employeeNumber: '',
        password: '',
        confirmPassword: '',
        role: '',
        status: "ACTIVO"
    });

    // Estados de UI
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [error, setError] = useState(null);

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.5, rotate: 180 }
    };

    // Manejador para el Select de Rol (si usas EcoSignSelect o un select normal)
    const handleRolChange = (e) => {
        setFormData(prev => ({
            ...prev,
            role: parseInt(e.target.value)
        }));
    };

    /**
     * Envía el formulario cifrado para crear el usuario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResponseMessage(null);

        // Validación simple de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

        // --- 2. PREPARAR DATOS (DTO EXACTO) ---
        // Extraemos solo los campos que el backend espera (sin confirmPassword)
        const UserInputDTO = {
            name: formData.name,
            lastName: formData.lastName,
            middleName: formData.middleName,
            email: formData.email,
            employeeNumber: formData.employeeNumber,
            password: formData.password,
            role: formData.role,
            status: "ACTIVO"
        };

        console.log("Datos en claro a cifrar (UserInputDTO):", UserInputDTO);

        try {
            // --- 3. CIFRAR ---
            // const encryptedPayload = await hybridEncrypt(
            //     BACKEND_PUBLIC_KEY,
            //     UserInputDTO
            // );

            console.log("Payload cifrado enviando a /api/user/create...");

            // --- 4. ENVIAR (POST) ---
            const response = await api.post('/api/user/create', UserInputDTO);

            // --- 5. DESCIFRAR RESPUESTA ---
            //const decryptedResponse = await decryptServerResponse(response.data);

            //console.log("Respuesta descifrada:", decryptedResponse);

            // Mostrar mensaje de éxito
            setResponseMessage(response.message || "Usuario creado exitosamente.");

            // Opcional: Limpiar formulario
            // setFormData({ ... });

        } catch (err) {
            console.error("Error al crear usuario cifrado:", err);
            setError(err.message || "Ocurrió un error al crear el usuario.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <AdminSidebar />
            <Box
                w="full"
                p={10}
                maxW="full"
                pl={{ base: '90px', md: '290px' }}
            >
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />

                <Text as="b" fontSize="30px" mt={8} mb={5} color="text-default" textAlign="left">
                    Registro de usuarios (Cifrado)
                </Text>
                <form onSubmit={handleSubmit}>
                    <EcoSignInput
                        placeholder="Nombre/s"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isRequired
                    />
                    <EcoSignInput
                        placeholder="Apellido Paterno"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isRequired
                    />
                    <EcoSignInput
                        placeholder="Apellido Materno"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                    />
                    <EcoSignInput
                        placeholder="Correo electrónico"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isRequired
                    />
                    <EcoSignInput
                        placeholder="Número de Empleado"
                        name="employeeNumber"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                        isRequired
                    />
                    <InputGroup>
                        <EcoSignInput
                            placeholder="Contraseña"
                            name="password"
                            type={show ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            isRequired
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
                            placeholder="Confirmar Contraseña"
                            name="confirmPassword"
                            type={show ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isRequired
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
                    <EcoSignSelect
                        placeholder="Selecciona un rol de usuario"
                        value={formData.role}
                        onChange={handleRolChange}
                    >
                        <option value="1">Administrador</option>
                        <option value="2">Usuario</option>
                    </EcoSignSelect>
                    <Button
                        type="submit"
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

                {responseMessage && (
                    <Alert status="success" mt={4} maxW="lg">
                        <AlertIcon />
                        {responseMessage}
                    </Alert>
                )}
                {error && (
                    <Alert status="error" mt={4} maxW="lg">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

            </Box>
        </Flex>
    )
}

export default Register;