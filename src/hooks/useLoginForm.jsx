import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { loginUser } from '../services/authService';

export function useLoginForm() {
    const navigate = useNavigate();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const userData = await loginUser(email, password);

            showToast("¡Bienvenido!", "Has iniciado sesión correctamente.", "success");

            setIsLoading(false);

            if (userData.roleId === 1) {
                navigate('/adminHome');
            } else {
                navigate('/userHome');
            }

        } catch (err) {
            setIsLoading(false);
            const msg = err.message || "Error al iniciar sesión";

            setError(msg);

            showToast("Acceso denegado", msg, "error");

            // Limpiamos el password para que intente de nuevo.
            setPassword('');
        }
    };
    const showToast = (title, desc, status) => {
        toast({
            title: title,
            description: desc,
            status: status,
            duration: 4000,
            isClosable: true,
            position: 'top-right'
        });
    };

    return {
        email, setEmail,
        password, setPassword,
        isLoading, error,
        handleLogin
    };
}