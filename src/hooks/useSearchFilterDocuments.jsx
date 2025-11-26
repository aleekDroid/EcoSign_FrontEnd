import { useState, useMemo } from 'react';

export function useSearchFilterDocuments(documents) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => { 
        if (!documents) return [];
        if (!searchTerm) return documents;

        const lowerCaseSearch = searchTerm.toLowerCase();

        return documents.filter(doc => {
            const fileName = (doc.fileName || '').toLowerCase();
            const category = (doc.fileCategory || '').toLowerCase();
            const status = (doc.status || '').toLowerCase();

            return (
                fileName.includes(lowerCaseSearch) ||
                category.includes(lowerCaseSearch) ||
                status.includes(lowerCaseSearch)
            );
        });
    }, [documents, searchTerm]);

    return { filteredDocuments, searchTerm, setSearchTerm };
}