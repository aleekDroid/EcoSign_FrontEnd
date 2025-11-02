import { Box, Flex, Heading, Image, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Text, Button, Icon, Menu, MenuButton, MenuList, MenuItem, navigate } from "@chakra-ui/react";
import EcoSign from "../../assets/EcoSign.PNG";

import { User, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/layout/Header";
import SearchInput from "../../components/forms/SearchInput";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { UserTable} from "../../components/users/UserTable"

function Usuario() {

    const { users, isLoading, error } = useFetchUsers();

    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
        navigate(path);
    }

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const DocumentsTable = () => (
        <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="accent" bg="background" color="secondary">
            <Table size="md"> {/*variant="simple" */}
                <Thead>
                    <Tr>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Nombre</Th>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Fecha</Th>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Tipo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr><Td color="secondary">Documento de ejemplo 1</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Contrato</Td></Tr>
                    <Tr><Td color="secondary">Documento de ejemplo 2</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Oficio</Td></Tr>
                    <Tr><Td color="secondary">Documento de ejemplo 3</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Facturas</Td></Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )

    const onClick = () => {
        navigate('/register');
    }

    return (
        <Flex minH="100vh" bg="background" w="full">
            <AdminSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <Flex
                    gap={4}>
                    <Button
                        isActive={location.pathname === '/register'}
                        onClick={() => handleNavigation('/register')}
                        as="b"
                        borderRadius="md"
                        bg="accent"
                        w="20%"
                        color="background"
                        _hover={{ bg: 'primary' }}
                    >Registrar Usuario</Button>
                    <SearchInput placeholder="Buscar usuario" mb={4} />
                </Flex>
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text" textAlign="left">
                    Usuarios
                </Text>
                {/* <DocumentsTable /> */}
                <UserTable users={users} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default Usuario;