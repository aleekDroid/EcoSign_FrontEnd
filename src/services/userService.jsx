import { collection, getDocs } from "firebase/firestore";
// const API_BASE_URL = 'https://api.example.com/users';
import { db } from '../firebase/config';

export async function getAllUsers() {

    try {
        const usersCollection = collection(db, "usuario");
        
        const userSnapshot = await getDocs(usersCollection);
        
        const usersList = userSnapshot.docs.map(doc => ({
            id: doc.id, // (importante para la key de React).
            ...doc.data() // Todos los campos (nombres, correo, rol, etc.)
        }));
        
        return usersList; // Devuelve el array real de usuarios
        
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
        throw new Error("Fallo la conexión con Firebase o al obtener la lista de usuarios.");
    }
    
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve([
    //             { id: 1, name: "Admin", email: "admin@uteq.edu", role: "Administrador" },
    //             { id: 2, name: "User", email: "user@uteq.edu", role: "Usuario" },
    //             { id: 3, name: "María Ríos Campos", email: "mariaRiosC@uteq.edu", role: "Usuario" },
    //             { id: 4, name: "Carlos Rivera Guerra", email: "carlosRiverG@uteq.edu", role: "Administrador" },
    //             { id: 5, name: "Luisa Fernanda López", email: "luisaRiveraL@uteq.edu", role: "Usuario" },
    //             { id: 6, name: "Ana Sofía Martínez Olvera", email: "anaMartinezO@uteq.edu", role: "Usuario" }
    //         ]);
    //     }, 500);
    // });

}