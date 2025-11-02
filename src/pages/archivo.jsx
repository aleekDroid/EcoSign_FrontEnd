import { Text, Box, Image, Flex, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Button } from '@chakra-ui/react';
import EcoSign from "../assets/EcoSign.PNG";
import AdminSidebar from '../components/layout/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import SearchInput from '../components/forms/SearchInput';

function Archivo() {

    const navigate = useNavigate();

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const signButton = () => (
        <Button 
        bg="accent" 
        color="background" 
        size='xs'
        _hover={{ bg: 'primary' }}>
            Firmar
        </Button>
    )

    const signedButton = () => (
        <Button 
        bg="text" 
        color="background"
        size='xs'>
            Firmado
        </Button>
    )

    const DocumentsTable = () => (
        <TableContainer w="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="accent" bg="background" color="secondary">
            <Table size="md"> {/*variant="simple" */}
                <Thead>
                    <Tr>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Nombre</Th>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Fecha</Th>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Tipo</Th>
                        <Th color="secondary" fontWeight="bold" fontFamily="body">Estado</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr><Td color="secondary">Documento de ejemplo 1</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Contrato</Td><Td color="secondary">Firmado</Td><Td><signButton/></Td></Tr>
                    <Tr><Td color="secondary">Documento de ejemplo 2</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Oficio</Td><Td color="accent">Firmar</Td><Td><signedButton/></Td></Tr>
                    <Tr><Td color="secondary">Documento de ejemplo 3</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Facturas</Td><Td color="accent">Firmar</Td><Td><signButton/></Td></Tr>
                    <Tr><Td color="secondary">Documento de ejemplo 4</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Contrato</Td><Td color="secondary">Firmado</Td><Td><signedButton/></Td></Tr>
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
                <SearchInput 
                    placeholder="Buscar documento" 
                    type="text" 
                    mb={4}
                />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text" textAlign="left">
                    Todos los documentos
                </Text>
                <DocumentsTable />
            </Box>
        </Flex>
    )
}

export default Archivo;