import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { useToast } from '@chakra-ui/react';

export function useRegisterForm() {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        middleName: '',
        email: '',
        employeeNumber: '',
        confirmPassword: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { email, password, confirmPassword, telefono, rol } = formData;

        if (!email.endsWith('@uteq.edu.mx') && !email.endsWith('@uteq.edu')) {
            showToast("Error", "El correo debe ser institucional (@uteq.edu)", "error");
            return false;
        }

        // validación de la contraseña con caracteres especiales.
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;

        if (!passwordRegex.test(password)) {
            showToast("Contraseña débil", "Mínimo 12 caracteres, un número y un símbolo especial.", "error");
            return false;
        }

        if (password !== confirmPassword) {
            showToast("Error", "Las contraseñas no coinciden.", "error");
            return false;
        }

        if (!role) {
            showToast("Error", "Selecciona un rol.", "error");
            return false;
        }

        return true;
    };

    const showToast = (title, desc, status) => {
        toast({ title, description: desc, status, duration: 4000, isClosable: true, position: 'top-right' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // se excluye confirmPassword para no guardar en la db.
            const { confirmPassword, ...dataToSave } = formData;

            await addDoc(collection(db, "usuario"), {
                ...dataToSave,
            });

            showToast("Usuario Creado", "El usuario se ha registrado exitosamente.", "success");

            setFormData({ name: '', lastName: '', middleName: '', email: '', password: '', confirmPassword: '', role: '' });

        } catch (error) {
            console.error("Error:", error);
            showToast("Error de Servidor", "No se pudo conectar con la base de datos.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, isLoading };
}