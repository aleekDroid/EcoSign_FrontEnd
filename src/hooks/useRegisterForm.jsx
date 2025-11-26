import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import api from '../services/api';

// --- CLAVE PÚBLICA DEL BACKEND (secp256k1) ---
const BACKEND_PUBLIC_KEY = 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEvK/cRv4McpZnjINlh6oZa7oQjWusMCD2gavNEkUO8ULrCXvPm15DwRFxB9tD4+gUDtHc0axwo5gh7/kCd7CBxA==';

export function useRegisterForm() {
    const toast = useToast();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showToast = (title, desc, status) => {
        toast({ title, description: desc, status, duration: 4000, isClosable: true, position: 'top-right' });
    };

    // Manejador para el Select de Rol (si usas EcoSignSelect o un select normal)
    const handleRolChange = (e) => {
        setFormData(prev => ({
            ...prev,
            role: parseInt(e.target.value)
        }));
    };

    // --- VALIDACIONES ---
    const validateForm = () => {
        const { email, password, confirmPassword, role } = formData;

        if (!email.endsWith('@uteq.edu.mx') && !email.endsWith('@uteq.edu')) {
            showToast("Correo inválido", "El correo debe ser institucional (@uteq.edu.mx)", "error");
            return false;
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;
        if (!passwordRegex.test(password)) {
            showToast("Contraseña débil", "Mínimo 12 caracteres, un número y un símbolo especial.", "warning");
            return false;
        }

        if (password !== confirmPassword) {
            showToast("Error", "Las contraseñas no coinciden.", "error");
            return false;
        }

        if (!role) {
            showToast("Falta información", "Selecciona un rol.", "warning");
            return false;
        }

        return true;
    };

    /**
     * Envía el formulario cifrado para crear el usuario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);

        // try {
            // --- 2. PREPARAR DATOS (DTO EXACTO) ---
            const UserInputDTO = {
                name: formData.name,
                lastName: formData.lastName,
                middleName: formData.middleName,
                email: formData.email,
                employeeNumber: formData.employeeNumber,
                password: formData.password,
                role: parseInt(formData.role),
                status: formData.status // "ACTIVO"
            };

            console.log("Datos en claro (UserInputDTO):", UserInputDTO);
            
        try {
            // --- 3. CIFRAR (Tu código original comentado) ---
            // const encryptedPayload = await hybridEncrypt(
            //     BACKEND_PUBLIC_KEY, 
            // );

            console.log("Enviando a /api/user/create...");

            // --- 4. ENVIAR (POST) ---
            // Si activas el cifrado, aquí enviarías encryptedPayload en lugar de UserInputDTO
            const response = await api.post('/api/user/create', UserInputDTO);

            // --- 5. DESCIFRAR RESPUESTA ---
            // const decryptedResponse = await decryptServerResponse(response.data);
            // console.log("Respuesta descifrada:", decryptedResponse);

            // ÉXITO.
            showToast("Usuario Creado", "El usuario se ha registrado exitosamente.", "success");
            
            // Limpiar formulario
            setFormData({
                name: '', lastName: '', middleName: '', email: '', 
                employeeNumber: '', password: '', confirmPassword: '', role: '', status: "ACTIVO"
            });

        } catch (err) {
            console.error("Error al crear usuario:", err);
            const msg = err.response?.data?.message || "Ocurrió un error al crear el usuario.";
            setError(msg);
            showToast("Error", msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, isLoading, error };
}