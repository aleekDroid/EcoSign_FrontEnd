import { Box, Flex, Heading, Image, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Text, Button, Icon, Menu, MenuButton, MenuList, MenuItem, navigate } from "@chakra-ui/react"; import EcoSign from "../assets/EcoSign.PNG";
import AdminSidebar from "../components/layout/AdminSidebar";
import { User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EcoSignInput from "../components/forms/EcoSignInput";

function Usuario() {

    const navigate = useNavigate();

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const Header = () => (
        <Menu
            bg="background">
            <MenuButton 
            as={Button} 
            leftIcon={<Icon as={User} boxSize={5} />} 
            rightIcon={<Icon as={ChevronDown} boxSize={5} />}
                bg="background">
                Nombre del usuario
            </MenuButton>
            <MenuList>
                <MenuItem
                    onClick={logOut}
                    color="#BD0606">Cerrar sesión</MenuItem>
            </MenuList>
        </Menu>
    );

    const DocumentsTable = () => (
        <TableContainer W="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="accent" bg="background" color="secondary">
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

    return (
        <Flex minH="100vh" bg="background" W="full">
            <AdminSidebar />
            <Box flex="1" p={10} maxW="full">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text" textAlign="left">
                    Usuarios
                </Text>
                <DocumentsTable />
            </Box>
        </Flex>
    )
}

export default Usuario;