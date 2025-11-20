import { Text, Box, Image, Flex, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Button } from '@chakra-ui/react';
import EcoSign from "../assets/EcoSign.PNG";
import AdminSidebar from '../components/layout/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import SearchInput from '../components/forms/SearchInput';
import { DocumentTable } from '../components/documents/DocumentTable';
import { useFetchDocuments } from '../hooks/useFetchDocuments';

function Archivo() {

    const { documents, isLoading, error } = useFetchDocuments();
    const navigate = useNavigate();

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <AdminSidebar />
            <Box 
                w = "full"
                p={10} 
                maxW="full" 
                pl = {{ base: '90px', md: '290px' }}
            >
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <SearchInput 
                    placeholder="Buscar documento" 
                    type="text" 
                    mb={4}
                />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Todos los documentos
                </Text>
                <DocumentTable documents={documents} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default Archivo;