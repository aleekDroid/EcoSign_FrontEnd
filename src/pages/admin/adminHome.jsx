import { Box, Flex, Heading, Image, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Text, Button, Icon, Menu, MenuButton, MenuList, MenuItem, navigate } from "@chakra-ui/react"; 
import EcoSign from "../../assets/EcoSign.PNG";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";

function AdminDashboard() {

    const navigate = useNavigate();

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const SignBox = () => (
        <Box
            w="full"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bg="background"
            borderColor="accent"
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
                bg="accent"
                w="20%"
                color="background"
                _hover={{ bg: 'primary' }}>
                Subir archivo
            </Button>
        </Box>
    );

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

    return (
        <Flex minH="100vh" bg="background" w="full">
            <AdminSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <SignBox />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text" textAlign="left">
                    Documentos recientes
                </Text>
                <DocumentsTable />
            </Box>
        </Flex>
    )
}

export default AdminDashboard;