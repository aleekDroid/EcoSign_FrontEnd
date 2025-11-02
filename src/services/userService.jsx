const API_BASE_URL = 'https://api.example.com/users';

export async function getAllUsers() {

    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('No se pudieron obtener los usuarios.');
    }

    const data = await response.json();
    return data;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Admin", email: "admin@uteq.mx", role: "Administrador" },
                { id: 2, name: "User", email: "user@uteq.mx", role: "Usuario" },
                { id: 3, name: "Maria", email: "maria@uteq.mx", role: "Usuario" }
            ]);
        }, 500);
    });

}