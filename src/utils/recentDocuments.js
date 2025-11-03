export function getRecentDocuments(documents) {
    if (documents && documents.length === 0) {
        return [];
    }

    const sortedDocuments = [...documents].sort((a, b) => {

        // N O T A para mi Y O del futuro: 
        // Con esto, se convierte el formato de fecha 'DD/MM/YYYY' a Date.getTime() para que la comparación sea numérica y no String.
        const dateA = new Date(a.date.split('/').reverse().join('-')); 
        const dateB = new Date(b.date.split('/').reverse().join('-'));

        return dateB.getTime() - dateA.getTime();
    });

    return sortedDocuments.slice(0, 3);
}