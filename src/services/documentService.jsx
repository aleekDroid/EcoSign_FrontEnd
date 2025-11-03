const API_BASE_URL = 'https://api.example.com/documents';

export async function getAllDocuments() {

    // const response = await fetch(API_BASE_URL);
    // if (!response.ok) {
    //     throw new Error('No se pudieron obtener los usuarios.');
    // }

    // const data = await response.json();
    // return data;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Factura Compra de insumos para impresora ", date: "10/10/2025", type: "Factura", status: "Firmado" },
                { id: 2, name: "Contrato de prestación de servicios ", date: "15/10/2025", type: "Contrato", status: "Por firmar" },
                { id: 3, name: "Oficio de solicitud de información ", date: "20/10/2025", type: "Oficio", status: "Por firmar" },
                { id: 4, name: "Factura Venta de productos para la división de idiomas", date: "25/10/2025", type: "Factura", status: "Firmado" },
                { id: 5, name: "Contrato de arrendamiento de oficina ", date: "30/10/2025", type: "Contrato", status: "Firmado"},
                { id: 6, name: "Oficio de invitación a evento institucional por el día de muertos", date: "05/11/2025", type: "Oficio", status: "Por firmar" },
                { id: 7, name: "Factura Compra de equipos de cómputo para la división de Mercadotecnia", date: "10/11/2025", type: "Factura", status: "Firmado" },
                { id: 8, name: "Contrato de servicios de mantenimiento para el edificio administrativo", date: "15/11/2025", type: "Contrato", status: "Por firmar" },
                { id: 9, name: "Oficio de agradecimiento por participación en evento académico  'Hakaton'", date: "20/11/2025", type: "Oficio", status: "Firmado" }
            ]);
        }, 500);
    });

}