import { useState, useEffect } from "react";
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Spinner, Center, Icon, Tooltip, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { X, Check } from "lucide-react"; // Importamos X para eliminar y Check para activar
// Ajusta esta ruta si tu carpeta services está en otro nivel
import { deleteUserService, updateUserRole } from '../../services/userService';

export function UserTable({ users, isLoading, error, onUserUpdated }) {

    // Reutilizamos el modal de "Delete" para ambas acciones (Activar/Desactivar)
    const { isOpen: isOpenStatus, onOpen: onOpenStatus, onClose: onCloseStatus } = useDisclosure();
    const { isOpen: isOpenRole, onOpen: onOpenRole, onClose: onCloseRole } = useDisclosure();

    // Estado local para actualización optimista
    const [localUsers, setLocalUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Estado para saber qué estatus vamos a aplicar ("ACTIVO" o "INACTIVO")
    const [targetStatus, setTargetStatus] = useState("INACTIVO");

    // Estados de carga independientes
    const [isProcessingStatus, setIsProcessingStatus] = useState(false);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);

    const toast = useToast();

    useEffect(() => {
        if (users) {
            setLocalUsers(users);
        }
    }, [users]);

    if (isLoading) {
        return <Center py={10}><Spinner size="xl" color="accent-default" thickness="4px" /></Center>;
    }

    if (error) {
        return <Center py={10}><Text color="red.500">Error al cargar usuarios: {error}</Text></Center>;
    }

    if (!localUsers || localUsers.length === 0) {
        return <Center py={10}><Text color="secondary">No hay usuarios registrados.</Text></Center>;
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

    // --- LÓGICA DE ACTUALIZACIÓN DE ROL ---
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
                            <Th>Nombre</Th>
                            <Th>Correo</Th>
                            <Th>Status</Th>
                            <Th>Rol</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {localUsers.map(user => {
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