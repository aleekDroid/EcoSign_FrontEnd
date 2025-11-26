// SIMULACIÓN DE DOCUMENTOS (MOCK)

const MOCK_DOCS = [
    { 
        id: 1, 
        fileName: "Contrato_Laboral_2025.pdf", 
        fileCategory: "LEGAL", 
        status: "PENDIENTE", 
        createdAt: "2025-10-14T10:00:00" 
    },
    { 
        id: 2, 
        fileName: "Nomina_Octubre.pdf", 
        fileCategory: "FINANZAS", 
        status: "FIRMADO", 
        createdAt: "2025-10-01T09:30:00" 
    },
    { 
        id: 3, 
        fileName: "Reglamento_Interno.pdf", 
        fileCategory: "RH", 
        status: "PENDIENTE", 
        createdAt: "2025-09-15T14:20:00" 
    },
    { 
        id: 4, 
        fileName: "Aviso_Privacidad.pdf", 
        fileCategory: "LEGAL", 
        status: "PENDIENTE", 
        createdAt: "2025-10-20T11:00:00" 
    }
];

export const getAllDocumentsMock = async (page = 1, size = 100, filters = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("📄 [MOCK API] Retornando documentos falsos...");
            
            resolve({
                codeStatus: 'OK',
                message: 'Documentos obtenidos (MOCK)',
                userFiles: MOCK_DOCS, // Nota: el servicio real devuelve 'entity', aquí lo mapeamos directo.
                totalPages: 1,
                totalElements: MOCK_DOCS.length,
                currentPage: 1
            });
        }, 800); 
    });
};

export const getDocumentsByUserIdMock = async (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`📄 [MOCK API] Retornando documentos para usuario ${userId}...`);
            
            // Retornamos los mismos documentos de prueba
            resolve({
                codeStatus: 'OK',
                message: 'Documentos de usuario obtenidos (MOCK)',
                userFiles: MOCK_DOCS, 
                totalPages: 1,
                totalElements: MOCK_DOCS.length,
                currentPage: 1
            });
        }, 800); 
    });
};