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
            const fullName = `${user.name} ${user.lastName} ${user.middleName}`.toLowerCase();
            return (
                fullName.includes(lowerCaseSearch) ||
                user.email.toLowerCase().includes(lowerCaseSearch) ||
                user.role.toLowerCase().includes(lowerCaseSearch)
            );
        });
    }, [users, searchTerm]);

    return { filteredUsers, searchTerm, setSearchTerm };
}