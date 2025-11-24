import { useState, useMemo } from 'react';

export function useSearchFilterUsers(users) {
    const [searchTerm, setSearchTerm] = useState('');

    // useMemo solo recalcula la lista filtrada cuando 'users' o 'searchTerm' cambian.
    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return users;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        return users.filter(user => {
            const fullName = `${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`.toLowerCase();
            return (
                fullName.includes(lowerCaseSearch) ||
                user.correo.toLowerCase().includes(lowerCaseSearch) ||
                user.rol.toLowerCase().includes(lowerCaseSearch)
            );
        });
    }, [users, searchTerm]);

    return { filteredUsers, searchTerm, setSearchTerm };
}