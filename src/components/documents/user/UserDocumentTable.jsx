import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Spinner, Center } from "@chakra-ui/react";

export function UserDocumentTable({ documents, isLoading, error }) {

    if (isLoading) {
        return <Center py={10}><Spinner size="xl" color="secondary-default" thickness="4px" /></Center>;
    }

    if (error) {
        return <Center py={10}><Text color="red.500">Error al cargar documentos: {error}</Text></Center>;
    }
    
    if (!documents ||  documents.length === 0) {
        return <Center py={10}><Text color="secondary-default">No hay documentos registrados.</Text></Center>;
    }

    return (
        <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="secondary-default" bg="bg-default" color="secondary-default">
            <Table size="md">
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Fecha</Th>
                        <Th>Tipo</Th>
                        <Th>Estado</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {documents.map(document => (
                        <Tr key={document.id}>
                            <Td color="text">{ document.name}</Td>
                            <Td color="secondary">{ document.date}</Td>
                            <Td color="secondary">{ document.type}</Td>
                            <Td color="secondary">{ document.status}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default  UserDocumentTable;