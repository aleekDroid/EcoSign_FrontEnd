import { Box, Flex, Heading, Image, Table, Thead, Center, VStack, Tr, Th, TableContainer, Td, Tbody, Text, Button, InputGroup, Input, InputRightElement, Icon, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"; import EcoSign from "../assets/EcoSign.PNG";
import UserSidebar from "../components/layout/Usersidebar";
import { useNavigate } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import EcoSignInput from "../components/forms/EcoSignInput";

function AdminDashboard() {

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

    const SignBox = () => (
        <Box
            w="full"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bg="background"
            borderColor="secondary"
            borderWidth="2px"
            borderRadius="lg"
            fontFamily="body"
            color="secondary"
            mb="4">
            <Text color="secondary" fontWeight="medium">Firmar documento</Text>
            <Button
                as="b"
                size="sm"
                borderRadius="md"
                bg="secondary"
                w="20%"
                color="background"
                _hover={{ bg: 'text' }}>
                Subir archivo
            </Button>
        </Box>
    );

    const DocumentsTable = () => (
        <TableContainer W="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="secondary" bg="background" color="secondary">
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
            <UserSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <SignBox />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="primary" textAlign="left">
                    Documentos recientes
                </Text>
                <DocumentsTable />
            </Box>
        </Flex>
    )
}

export default AdminDashboard;