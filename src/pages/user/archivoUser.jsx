import { Text, Box, Image, Flex, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Button } from '@chakra-ui/react';
import EcoSign from "../../assets/EcoSign.PNG";
import { useColorMode } from '@chakra-ui/react';

import UserSidebar from '../../components/layout/Usersidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { DocumentTable } from '../../components/documents/DocumentTable';
import { useFetchDocumentsForUser } from '../../hooks/useFetchDocuments';
import SearchInput from "../../components/forms/SearchInput";

function ArchivoUser() {

    const { documents, isLoading, error } = useFetchDocumentsForUser();
    const navigate = useNavigate();

    const { colorMode } = useColorMode();

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <UserSidebar />
            <Box
                w="full"
                p={10}
                maxW="full"
                pl={{ base: '90px', md: '290px' }}
            >
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image
                    src={EcoSign}
                    alt="EcoSign Logo"
                    w="40%"
                    mb={4}
                />
                <Flex
                    gap={4}>
                    <Button
                        as="b"
                        borderRadius="md"
                        bg="accent-default"
                        w={{ base: 'auto', md: '20%' }}
                        p={4}
                        color="bg-default"
                        _hover={{ bg: 'primary-default' }}
                    >
                        Subir
                        <Box as="span" display={{ base: 'none', md: 'inline' }} ml={1}>
                            documento
                        </Box>
                    </Button>
                    <SearchInput
                        placeholder="Buscar documento"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        mb={4}
                    />

                </Flex>

                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Todos los documentos
                </Text>
                <DocumentTable documents={documents} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default ArchivoUser;