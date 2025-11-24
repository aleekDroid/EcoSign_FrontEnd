import { useState, useMemo } from 'react';

export function useSearchFilterDocuments(documents) {
    const [searchTerm, setSearchTerm] = useState('');

    // useMemo optimiza el rendimiento: solo recalcula la lista filtrada
    // cuando 'users' o 'searchTerm' cambian.
    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return documents;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        return documents.filter(document => {
            const fullName = `${document.nombres} ${document.apellidoPaterno} ${document.apellidoMaterno}`.toLowerCase();
            return (
                fullName.includes(lowerCaseSearch) ||
                document.correo.toLowerCase().includes(lowerCaseSearch) ||
                document.rol.toLowerCase().includes(lowerCaseSearch)
            );
        });
    }, [documents, searchTerm]);

    return { filteredUsers, searchTerm, setSearchTerm };
}