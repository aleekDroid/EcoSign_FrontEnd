export function getRecentDocuments(documents) {
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
        return [];
    }

    const sortedDocuments = [...documents].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
    });

    return sortedDocuments.slice(0, 3);
}