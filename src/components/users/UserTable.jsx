import React, { useState, useEffect, useMemo } from "react";
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Spinner, Center, Icon, Tooltip, Button, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast, VStack, Heading,
    Flex
} from "@chakra-ui/react";
import { X, Check, WifiOff, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { deleteUserService, updateUserRole } from '../../services/userService';

export function UserTable({ users, isLoading, error, onUserUpdated }) {

    // Reutilizamos el modal de "Delete" para ambas acciones (Activar/Desactivar)
    const { isOpen: isOpenStatus, onOpen: onOpenStatus, onClose: onCloseStatus } = useDisclosure();
    const { isOpen: isOpenRole, onOpen: onOpenRole, onClose: onCloseRole } = useDisclosure();

    // Estado local para actualización optimista
    const [localUsers, setLocalUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [targetStatus, setTargetStatus] = useState("INACTIVO");

    // Estados de carga independientes
    const [isProcessingStatus, setIsProcessingStatus] = useState(false);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const toast = useToast();

    useEffect(() => {
        if (users) {
            setLocalUsers(users);
        }
    }, [users]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = useMemo(() => {
        let sortableItems = [...localUsers];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                // Manejo especial para Rol (porque es numérico pero se necesita ordenar por nombre 'Admin' vs 'Usuario').
                let aValue, bValue;
                if (sortConfig.key === 'roleId') {
                    aValue = a.roleId === 1 ? 'administrador' : 'usuario';
                    bValue = b.roleId === 1 ? 'administrador' : 'usuario';
                } else {
                    aValue = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : '';
                    bValue = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : '';
                }

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
    }, [localUsers, sortConfig]);

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
                    <Text color="secondary-default">Cargando usuarios...</Text>
                </VStack>
            </Center>
        );
    }

    if (error) {
        return (
            <Center py={10} bg="bg-default" borderRadius="lg" borderWidth="1px" borderStyle="dashed">
                <VStack spacing={4} textAlign="center">
                    <Icon as={WifiOff} boxSize={12} color="red.400" />
                    <Text size="lg" color="text-default">No pudimos conectar con el servidor</Text>
                    <Text size="sm" color="secondary-default" maxW="sm">
                        Parece que hay un problema de conexión. Intenta recargar la página.
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

    if (!localUsers || localUsers.length === 0) {
        return (
            <Center py={10} bg="bg-default" borderRadius="lg" borderWidth="1px" borderStyle="dashed">
                <Text color="secondary-default">No se encontraron usuarios registrados.</Text>
            </Center>
        );
    }

    // Maneja el click en el botón de acción (X o Palomita)
    const handleStatusChangeClick = (user) => {
        setSelectedUserId(user.id);
        // Lógica clave: Si está INACTIVO, el objetivo es ACTIVARLO (y viceversa)
        const newStatus = user.status === 'INACTIVO' ? 'ACTIVO' : 'INACTIVO';
        setTargetStatus(newStatus);
        onOpenStatus();
    }

    const handleRoleClick = (userId) => {
        setSelectedUserId(userId);
        onOpenRole();
    }

    // --- LÓGICA DE CAMBIO DE ESTATUS (ELIMINAR / REACTIVAR) ---
    const handleConfirmStatusChange = async () => {
        if (!selectedUserId) return;

        setIsProcessingStatus(true);
        try {
            // Enviamos el targetStatus dinámico ("ACTIVO" o "INACTIVO") al servicio
            await deleteUserService(selectedUserId, targetStatus);

            const isActivating = targetStatus === 'ACTIVO';

            toast({
                title: isActivating ? "Usuario reactivado" : "Usuario eliminado",
                description: isActivating
                    ? "El usuario ha sido reactivado exitosamente."
                    : "El usuario ha sido marcado como INACTIVO.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Optimismo: Actualizamos el estatus visualmente en la tabla inmediatamente
            setLocalUsers(prev => prev.map(u =>
                u.id === selectedUserId ? { ...u, status: targetStatus } : u
            ));

            onCloseStatus();

            if (onUserUpdated) onUserUpdated();

        } catch (error) {
            console.error("Error cambiando estatus:", error);
            const msg = error.response?.data?.message || "No se pudo cambiar el estatus del usuario.";
            toast({ title: "Error", description: msg, status: "error", duration: 5000, isClosable: true });
        } finally {
            setIsProcessingStatus(false);
        }
    };

    const handleConfirmRoleChange = async (newRoleId) => {
        if (!selectedUserId) return;

        setIsUpdatingRole(true);
        try {
            await updateUserRole(selectedUserId, newRoleId);

            const roleName = newRoleId === 1 ? "Administrador" : "Usuario";

            toast({
                title: "Rol actualizado",
                description: `El usuario ahora es ${roleName}.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setLocalUsers(prev => prev.map(u =>
                u.id === selectedUserId ? { ...u, roleId: newRoleId } : u
            ));

            onCloseRole();

            if (onUserUpdated) onUserUpdated();

        } catch (error) {
            console.error("Error actualizando rol:", error);
            const msg = error.response?.data?.message || "No se pudo actualizar el rol.";
            toast({ title: "Error", description: msg, status: "error", duration: 5000, isClosable: true });
        } finally {
            setIsUpdatingRole(false);
        }
    };

    return (
        <>
            <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="accent-default" bg="bg-default" color="secondary-default">
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th cursor="pointer" onClick={() => requestSort('name')} _hover={{ color: "accent-default" }}>
                                <Flex align="center">Nombre {getSortIcon('name')}</Flex>
                            </Th>
                            <Th cursor="pointer" onClick={() => requestSort('email')} _hover={{ color: "accent-default" }}>
                                <Flex align="center">Correo {getSortIcon('email')}</Flex>
                            </Th>
                            <Th cursor="pointer" onClick={() => requestSort('status')} _hover={{ color: "accent-default" }}>
                                <Flex align="center">Status {getSortIcon('status')}</Flex>
                            </Th>
                            <Th cursor="pointer" onClick={() => requestSort('roleId')} _hover={{ color: "accent-default" }}>
                                <Flex align="center">Rol {getSortIcon('roleId')}</Flex>
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedUsers.map(user => {
                            const isInactive = user.status === 'INACTIVO';
                            return (
                                <Tr key={user.id} bg={isInactive ? 'gray.50' : 'transparent'}>
                                    <Td color={isInactive ? 'gray.400' : 'text-default'}>
                                        {user.name}{' '}{user.lastName}
                                    </Td>
                                    <Td color={isInactive ? 'gray.400' : 'text-default'}>
                                        {user.email}
                                    </Td>
                                    <Td color={isInactive ? 'red.500' : 'green.500'} fontWeight="bold">
                                        {user.status || 'ACTIVO'}
                                    </Td>
                                    <Td color="text-default">
                                        <Tooltip label="Cambiar rol del usuario" placement="top">
                                            <Button
                                                onClick={() => handleRoleClick(user.id)}
                                                isDisabled={isInactive} // Opcional: Impedir cambiar rol si está inactivo
                                                color="secondary-default"
                                                bg="transparent"
                                                _hover={{ bg: 'transparent', color: 'accent-default' }}>
                                                {user.roleId === 1 ? "Admin" : "Usuario"}
                                            </Button>
                                        </Tooltip>
                                    </Td>
                                    <Td color="secondary-default">
                                        <Button
                                            onClick={() => handleStatusChangeClick(user)}
                                            bg="transparent"
                                            color="secondary-default"
                                            _hover={{ bg: 'transparent' }}
                                        >
                                            <Tooltip label={isInactive ? "Reactivar usuario" : "Eliminar usuario"} placement="top">
                                                {/* Renderizado condicional del icono: Check si está inactivo, X si está activo */}
                                                <Icon
                                                    as={isInactive ? Check : X}
                                                    boxSize={5}
                                                    color={isInactive ? "green.500" : "secondary-default"}
                                                    _hover={{
                                                        color: isInactive ? "green.600" : "red.500",
                                                        cursor: 'pointer'
                                                    }}
                                                    aria-label={isInactive ? "Activar" : "Eliminar"}
                                                />
                                            </Tooltip>
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Modal dinámico para Cambio de Estatus (Eliminar / Activar) */}
            <Modal isOpen={isOpenStatus} onClose={onCloseStatus} isCentered closeOnOverlayClick={!isProcessingStatus}>
                <ModalOverlay />
                <ModalContent alignItems="center" bg="bg-default">
                    <ModalHeader color="text-default">
                        {targetStatus === 'ACTIVO' ? "¿Reactivar usuario?" : "¿Eliminar usuario?"}
                    </ModalHeader>
                    {!isProcessingStatus && <ModalCloseButton />}
                    <ModalBody color="text-default" textAlign="center">
                        {targetStatus === 'ACTIVO'
                            ? "El usuario volverá a tener acceso al sistema."
                            : "El usuario será marcado como INACTIVO y perderá acceso."}
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button colorScheme='gray' mr={3} onClick={onCloseStatus} isDisabled={isProcessingStatus}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme={targetStatus === 'ACTIVO' ? 'green' : 'red'}
                            onClick={handleConfirmStatusChange}
                            isLoading={isProcessingStatus}
                            loadingText={targetStatus === 'ACTIVO' ? "Activando..." : "Eliminando..."}
                        >
                            {targetStatus === 'ACTIVO' ? "Reactivar" : "Eliminar"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para cambiar rol */}
            <Modal isOpen={isOpenRole} onClose={onCloseRole} isCentered closeOnOverlayClick={!isUpdatingRole}>
                <ModalOverlay />
                <ModalContent alignItems="center" bg="bg-default">
                    <ModalHeader color="text-default">Cambiar Rol de Usuario</ModalHeader>
                    {!isUpdatingRole && <ModalCloseButton />}
                    <ModalBody color="text-default">
                        Selecciona el nuevo rol para este usuario.
                    </ModalBody>
                    <ModalFooter justifyContent="center" gap={3}>
                        <Button
                            colorScheme="blue"
                            onClick={() => handleConfirmRoleChange(2)}
                            isLoading={isUpdatingRole}
                            isDisabled={isUpdatingRole}
                        >
                            Usuario
                        </Button>

                        <Button
                            variant='outline'
                            color="text-default"
                            borderColor="secondary-default"
                            onClick={() => handleConfirmRoleChange(1)}
                            isLoading={isUpdatingRole}
                            isDisabled={isUpdatingRole}
                        >
                            Administrador
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserTable;