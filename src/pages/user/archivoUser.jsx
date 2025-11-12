import { Text, Box, Image, Flex, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Button } from '@chakra-ui/react';
import EcoSign from "../../assets/EcoSign.PNG";
import UserSidebar from '../../components/layout/Usersidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import UserSearchInput from '../../components/forms/user/UserSearchInput';
import { UserDocumentTable } from '../../components/documents/user/UserDocumentTable';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

function ArchivoUser() {

    const { documents, isLoading, error } = useFetchDocuments();
    const navigate = useNavigate();

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    const signButton = () => (
        <Button 
        bg="secondary-default" 
        color="bg-default" 
        size='xs'
        _hover={{ bg: 'user-default' }}>
            Firmar
        </Button>
    )

    const signedButton = () => (
        <Button 
        bg="text" 
        color="bg-default"
        size='xs'>
            Firmado
        </Button>
    )

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <UserSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <UserSearchInput 
                    placeholder="Buscar documento" 
                    type="text" 
                    mb={4}
                />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text" textAlign="left">
                    Todos los documentos
                </Text>
                <UserDocumentTable documents={documents} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default ArchivoUser;