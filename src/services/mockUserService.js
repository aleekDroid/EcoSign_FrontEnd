// SIMULACIÓN DE DATOS (MOCK)

const MOCK_USERS = [
    { id: 101, name: "Aleek", lastName: "Dev", middleName: "Jr", email: "aleek@uteq.edu.mx", roleId: 1 },
    { id: 102, name: "María", lastName: "González", middleName: "", email: "maria@uteq.edu.mx", roleId: 2 },
    { id: 103, name: "Juan", lastName: "Pérez", middleName: "López", email: "juan.p@uteq.edu.mx", roleId: 2 },
    { id: 104, name: "Sofía", lastName: "Ramírez", middleName: "", email: "sofia.r@uteq.edu.mx", roleId: 1 },
    { id: 105, name: "Carlos", lastName: "Slim", middleName: "", email: "charly@empresas.com", roleId: 2 },
];

/**
 * Simula una llamada a la API con un retraso de 1 segundo
 */
export const getAllUsersMock = async (page = 1, size = 100, filters = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("⚡ [MOCK API] Retornando usuarios falsos...");
            
            resolve({
                codeStatus: 'OK',
                message: 'Usuarios obtenidos (MOCK)',
                users: MOCK_USERS, // Aquí va el array
                totalPages: 1,
                totalElements: MOCK_USERS.length,
                currentPage: 1
            });
        }, 800); // 800ms de retraso para que se vea el spinner
    });
};