import React, { useState } from 'react';
import { Text, Box, Image, Flex, Button, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import AdminSidebar from '../../components/layout/AdminSidebar';
import Header from '../../components/layout/Header';
import EcoSignInput from '../../components/forms/EcoSignInput';
import EcoSignSelect from '../../components/forms/EcoSignSelect'; // Asegúrate de tener este componente o usa un Select normal
import EcoSign from "../../assets/EcoSign.PNG";

// --- SERVICIOS DE CIFRADO ---
import api from '../../services/api';
import {
    encryptClientRequest,
    decryptServerResponse
} from '../../utils/cryptoService';
import {hybridEncrypt} from "../../utils/hybridEncryption";

// --- CLAVE PÚBLICA DEL BACKEND (secp256k1) ---
const BACKEND_PUBLIC_KEY = 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEvK/cRv4McpZnjINlh6oZa7oQjWusMCD2gavNEkUO8ULrCXvPm15DwRFxB9tD4+gUDtHc0axwo5gh7/kCd7CBxA==';

function Register() {
    const navigate = useNavigate();

    // --- 1. ESTADOS DEL FORMULARIO (Coinciden con UserInputDTO) ---
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        middleName: '',
        email: '',
        employeeNumber: '',
        password: '',
        confirmPassword: '', // Solo para validación en front
        role: 1 // Default role (ajusta según necesites)
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

    // Manejador para el Select de Rol (si usas EcoSignSelect o un select normal)
    const handleRoleChange = (e) => {
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
            role: formData.role
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
            // Asumiendo que tu WebResponse tiene un campo 'message'
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
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4} marginLeft="250px">
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />

                <Text as="b" fontSize="30px" mt={8} mb={5} color="text-default" textAlign="left">
                    Registro de usuarios (Cifrado)
                </Text>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch" maxW="lg">

                        <EcoSignInput
                            placeholder="Nombre(s)"
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
                            name="email"
                            type="email"
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
                        <EcoSignInput
                            placeholder="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            isRequired
                        />
                        <EcoSignInput
                            placeholder="Confirmar Contraseña"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isRequired
                        />

                        {/* Select de Rol */}
                        <EcoSignSelect
                            placeholder="Selecciona un rol"
                            value={formData.role}
                            onChange={handleRoleChange}
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
                            _hover={{ bg: 'primary-default' }}
                            isLoading={isLoading}
                        >
                            Registrar
                        </Button>
                    </VStack>
                </form>

                {/* Mensajes de Feedback */}
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