import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Spinner, Center } from "@chakra-ui/react";

export function UserTable({ users, isLoading, error }) {

    if (isLoading) {
        return <Center py={10}><Spinner size="xl" color="primary" thickness="4px" /></Center>;
    }

    if (error) {
        return <Center py={10}><Text color="red.500">Error al cargar usuarios: {error}</Text></Center>;
    }
    
    if (!users || users.length === 0) {
        return <Center py={10}><Text color="secondary">No hay usuarios registrados.</Text></Center>;
    }

    return (
        <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="accent" bg="background" color="secondary">
            <Table size="md">
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Correo</Th>
                        <Th>Rol</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* Iteramos sobre el array de usuarios */}
                    {users.map(user => (
                        <Tr key={user.id}>
                            <Td color="text">{user.name}</Td>
                            <Td color="secondary">{user.email}</Td>
                            <Td color="secondary">{user.role}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;