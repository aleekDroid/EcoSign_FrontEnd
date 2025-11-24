import { useState } from "react";
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Spinner, Center, Icon, Tooltip, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { X } from "lucide-react";

export function UserTable({ users, isLoading, error }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedUserId, setSelectedUserId] = useState(null);

    if (isLoading) {
        return <Center py={10}><Spinner size="xl" color="accent-default" thickness="4px" /></Center>;
    }

    if (error) {
        return <Center py={10}><Text color="red.500">Error al cargar usuarios: {error}</Text></Center>;
    }

    if (!users || users.length === 0) {
        return <Center py={10}><Text color="secondary">No hay usuarios registrados.</Text></Center>;
    }

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        onOpen();
    }

    return (
        <>
            <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="accent-default" bg="bg-default" color="text-default">
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Correo</Th>
                            <Th>Rol</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map(user => (
                            <Tr key={user.id}>
                                <Td color="secondary-default">{user.name}</Td>
                                <Td color="secondary-default">{user.email}</Td>
                                <Td color="secondary-default">
                                    <Tooltip label="Cambiar rol del usuario" placement="top">
                                    <Button
                                        color="secondary-default"
                                        bg="transparent"
                                        _hover={{ bg: 'transparent', color: 'accent-default' }}>
                                    {user.roleId==1 ? "Admin" : "Usuario"}
                                    </Button>
                                    </Tooltip>
                                    </Td>
                                <Td color="secondary-default">
                                    <Button
                                        onClick={() => handleDeleteClick(user.id)}
                                        bg="transparent"
                                        _hover={{ bg: 'transparent' }}
                                    >
                                        <Tooltip label="Eliminar usuario" placement="top">
                                            <Icon
                                                as={X}
                                                boxSize={5}
                                                _hover={{ color: 'red.500', cursor: 'pointer' }}
                                                aria-label="Eliminar usuario"
                                            />
                                        </Tooltip>
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                alignItems="center">
                    <ModalHeader>¿Desea eliminar a este usuario?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Haga clic en "Aceptar" para confirmar la eliminación del usuario.
                    </ModalBody>
                    <ModalFooter
                    justifyContent="center">
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant='outline'>Eliminar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserTable;