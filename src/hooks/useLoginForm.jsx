import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'

export function useLoginForm() {

    const toast = useToast();
    const navigate = useNavigate();

//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showToast = (title, desc, status) => {
        toast({ title, description: desc, status, duration: 4000, isClosable: true, position: 'top-right' });
    };

    const validateForm = () => {
        const { correo, password } = formData;

        if (!correo || !password) {
            showToast("Error", "Debes ingresar tu correo y contraseña.", "warning");
            return false;
        }

        if (!correo.endsWith('@uteq.edu.mx') && !correo.endsWith('@uteq.edu')) {
            showToast("Error", "El correo debe ser institucional (@uteq.edu)", "error");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {

            const usersRef = collection(db, "usuario");
            const q = query(usersRef, where("correo", "==", formData.correo));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                showToast("Error", "Usuario no encontrado.", "error");
                return;
            }

            const userDoc = querySnapshot.docs[0].data();

            if (userDoc.password !== formData.password) {
                showToast("Error", "Contraseña incorrecta.", "error");
                return;
            }

            const nombreCompleto = `${userDoc.nombres} ${userDoc.apellidoPaterno}`;
            localStorage.setItem('ecoSign_userName', nombreCompleto);

            showToast("Bienvenido", `Iniciando sesión como ${userDoc.rol}.`, "success");

            if (userDoc.rol === 'administrador') {
                navigate('/adminHome');
            } else {
                navigate('/userHome');
            }

        } catch (error) {
            console.error("Error en login:", error);
            showToast("Error de Conexión", "Fallo al conectar con la base de datos.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, isLoading };
}