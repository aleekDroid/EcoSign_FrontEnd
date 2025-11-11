const API_BASE_URL = 'https://api.example.com/users';

export async function getAllUsers() {

    // const response = await fetch(API_BASE_URL);
    // if (!response.ok) {
    //     throw new Error('No se pudieron obtener los usuarios.');
    // }

    // const data = await response.json();
    // return data;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Admin", email: "admin@uteq.edu", role: "Administrador" },
                { id: 2, name: "User", email: "user@uteq.edu", role: "Usuario" },
                { id: 3, name: "María Ríos Campos", email: "mariaRiosC@uteq.edu", role: "Usuario" },
                { id: 4, name: "Carlos Rivera Guerra", email: "carlosRiverG@uteq.edu", role: "Administrador" },
                { id: 5, name: "Luisa Fernanda López", email: "luisaRiveraL@uteq.edu", role: "Usuario" },
                { id: 6, name: "Ana Sofía Martínez Olvera", email: "anaMartinezO@uteq.edu", role: "Usuario" }
            ]);
        }, 500);
    });

}