import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Spinner, Center, Button, Badge, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function DocumentTable({ documents, isLoading, error }) {
    const navigate = useNavigate();

    if (isLoading) {
        return <Center py={10}><Spinner size="xl" color="accent-default" thickness="4px" /></Center>;
    }

    if (error) {
        return <Center py={10}><Text color="red.500">Error al cargar documentos: {error}</Text></Center>;
    }
    
    if (!documents ||  documents.length === 0) {
        return <Center py={10}><Text color="text-default">No hay documentos registrados.</Text></Center>;
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
                            <Td color="text-default" maxW="250px" isTruncated title={document.name}>
                                {document.fileName}
                            </Td>
                            <Td color="text-default">{document.createdAt}</Td>
                            <Td color="text-default">{document.fileCategory}</Td>
                            
                            <Td>
                                {document.status === 'PENDIENTE' ? (
                                    <Tooltip label="Firmar documento" placement="top">
                                        <Button 
                                            size="xs" 
                                            bg="accent-default" 
                                            color="bg-default"
                                            _hover={{ bg: 'primary-default' }}
                                            onClick={() => navigate('/firmar')}
                                        >
                                            Por firmar
                                        </Button>
                                    </Tooltip>
                                ) : (
                                    <Badge 
                                        colorScheme={document.status === 'FIRMADO' ? 'green' : 'gray'}
                                        variant="subtle" 
                                        borderRadius="full" 
                                        px={2}
                                    >
                                        {document.status}
                                    </Badge>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default DocumentTable;