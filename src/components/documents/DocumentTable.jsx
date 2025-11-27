import React, { useState, useMemo } from 'react'; 
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text,
    Spinner, Center, Button, Tooltip, VStack, Icon, Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { WifiOff, RefreshCw, FileX, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export function DocumentTable({ documents, isLoading, error }) {
    const navigate = useNavigate();

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleNavigateToDoc = async (docId, docStatus) => {
        const role = await localforage.getItem('user_role') || 2;
        const basePath = role == 1 ? '/adminFirmar' : '/userFirmar';
        navigate(`${basePath}/${docId}/${docStatus}`);
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedDocuments = useMemo(() => {
        let sortableItems = [...(documents || [])]; 
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : '';
                const bValue = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : '';

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [documents, sortConfig]);

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <Icon as={ArrowUpDown} boxSize={3} color="gray.400" ml={1} />;
        }
        if (sortConfig.direction === 'ascending') {
            return <Icon as={ArrowUp} boxSize={3} color="accent-default" ml={1} />;
        }
        return <Icon as={ArrowDown} boxSize={3} color="accent-default" ml={1} />;
    };

    if (isLoading) {
        return (
            <Center py={20}>
                <VStack spacing={4}>
                    <Spinner size="xl" color="accent-default" thickness="4px" />
                    <Text color="secondary-default">Cargando documentos...</Text>
                </VStack>
            </Center>
        );
    }

    if (error) {
        return (
            <Center py={10} bg="bg-default" borderRadius="lg" borderWidth="1px" borderStyle="dashed">
                <VStack spacing={4} textAlign="center">
                    <Icon as={WifiOff} boxSize={12} color="red.400" />
                    <Text size="lg" color="text-default">Error de conexión</Text>
                    <Text size="sm" color="secondary-default" maxW="sm">
                        No pudimos obtener la lista de documentos.
                    </Text>
                    <Button
                        leftIcon={<RefreshCw size={18} />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => window.location.reload()}
                    >
                        Recargar página
                    </Button>
                </VStack>
            </Center>
        );
    }

    if (!documents || documents.length === 0) {
        return (
            <Center py={10} bg="bg-default" borderRadius="lg" borderWidth="1px" borderStyle="dashed">
                <VStack spacing={3}>
                    <Icon as={FileX} boxSize={10} color="gray.400" />
                    <Text color="secondary-default">No hay documentos registrados.</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="secondary-default" bg="bg-default" color="secondary-default">
            <Table size="md">
<Thead>
                    <Tr>
                        {/* ENCABEZADOS CLICABLES */}
                        <Th cursor="pointer" onClick={() => requestSort('fileName')} _hover={{ color: "accent-default" }}>
                            <Flex align="center">
                                Nombre {getSortIcon('fileName')}
                            </Flex>
                        </Th>
                        <Th cursor="pointer" onClick={() => requestSort('createdAt')} _hover={{ color: "accent-default" }}>
                            <Flex align="center">
                                Fecha {getSortIcon('createdAt')}
                            </Flex>
                        </Th>
                        <Th cursor="pointer" onClick={() => requestSort('fileCategory')} _hover={{ color: "accent-default" }}>
                            <Flex align="center">
                                Tipo {getSortIcon('fileCategory')}
                            </Flex>
                        </Th>
                        <Th cursor="pointer" onClick={() => requestSort('status')} _hover={{ color: "accent-default" }}>
                            <Flex align="center">
                                Estado {getSortIcon('status')}
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedDocuments.map(document => (
                        <Tr key={document.id}>
                            <Td color="text-default" maxW="250px" isTruncated title={document.name}>
                                {document.fileName}
                            </Td>
                            <Td color="text-default">
                                {new Date(document.createdAt).toLocaleDateString()}
                            </Td>
                            <Td color="text-default">
                                {document.fileCategory}
                            </Td>
                            <Td>
                                {document.status === 'PENDIENTE' ? (
                                    <Tooltip label="Firmar documento" placement="top">
                                        <Button
                                            size="xs"
                                            bg="accent-default"
                                            color="bg-default"
                                            _hover={{ bg: 'primary-default' }}
                                            onClick={() => {handleNavigateToDoc(document.id, document.status)}}
                                        >
                                            Por firmar
                                        </Button>
                                    </Tooltip>
                                ) : (
                                    <Tooltip label="Ver documento firmado" placement="top">
                                        <Button
                                            size="xs"
                                            borderRadius="full"
                                            colorScheme="green"
                                            variant="outline"
                                            w="80px"
                                            onClick={() => handleNavigateToDoc(document.id, document.status)}
                                            css={{
                                                "&:hover .text-status": { display: "none" },
                                                "&:hover .text-hover": { display: "block" },
                                                ".text-hover": { display: "none" }
                                            }}
                                        >
                                            <Box as="span" className="text-status">FIRMADO</Box>
                                            <Box as="span" className="text-hover">ABRIR</Box>
                                        </Button>
                                    </Tooltip>
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