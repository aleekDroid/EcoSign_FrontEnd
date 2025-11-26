import { useState, useMemo } from 'react';

export function useSearchFilterUsers(users) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        // Si no hay usuarios o no hay búsqueda, regresamos todo igual.
        if (!users) return [];
        if (!searchTerm) return users;

        const lowerCaseSearch = searchTerm.toLowerCase();

        return users.filter(user => {
            const name = (user.name || '').toLowerCase();
            const lastName = (user.lastName || '').toLowerCase();
            const middleName = (user.middleName || '').toLowerCase();
            const email = (user.email || '').toLowerCase();
            
            const fullName = `${name} ${lastName} ${middleName}`;

            const roleName = (user.roleId === 1) ? 'administrador admin' : 'usuario';

            return (
                fullName.includes(lowerCaseSearch) ||
                email.includes(lowerCaseSearch) ||
                roleName.includes(lowerCaseSearch)
            );
        });
    }, [users, searchTerm]);

    return { filteredUsers, searchTerm, setSearchTerm };
}