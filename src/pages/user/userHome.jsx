import { Box, Flex, Heading, Image, Table, Thead, Center, VStack, Tr, Th, TableContainer, Td, Tbody, Text, Button, InputGroup, Input, InputRightElement, Icon, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import EcoSign from "../../assets/EcoSign.PNG";

import UserSignBox from "../../components/forms/user/UserSignBox";
import Header from "../../components/layout/Header";
import UserSidebar from "../../components/layout/Usersidebar";

import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { UserDocumentTable } from "../../components/documents/user/UserDocumentTable";
import { getRecentDocuments } from "../../utils/recentDocuments";

function AdminDashboard() {

    const navigate = useNavigate();
    const { documents, isLoading, error } = useFetchDocuments();
    const recentDocuments = getRecentDocuments(documents);

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    // const DocumentsTable = () => (
    //     <TableContainer W="full" mt={4} borderRadius="lg" borderWidth="2px" borderColor="secondary" bg="bg-default" color="secondary">
    //         <Table size="md"> {/*variant="simple" */}
    //             <Thead>
    //                 <Tr>
    //                     <Th color="secondary" fontWeight="bold" fontFamily="body">Nombre</Th>
    //                     <Th color="secondary" fontWeight="bold" fontFamily="body">Fecha</Th>
    //                     <Th color="secondary" fontWeight="bold" fontFamily="body">Tipo</Th>
    //                 </Tr>
    //             </Thead>
    //             <Tbody>
    //                 <Tr><Td color="secondary">Documento de ejemplo 1</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Contrato</Td></Tr>
    //                 <Tr><Td color="secondary">Documento de ejemplo 2</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Oficio</Td></Tr>
    //                 <Tr><Td color="secondary">Documento de ejemplo 3</Td><Td color="secondary">01/10/2025</Td><Td color="secondary">Facturas</Td></Tr>
    //             </Tbody>
    //         </Table>
    //     </TableContainer>
    // )

    return (
        <Flex minH="100vh" bg="bg-default" w="full">
            <UserSidebar />
            <Box flex="1" p={10} maxW="full" marginLeft="250px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <UserSignBox />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text -default" textAlign="left">
                    Documentos recientes
                </Text>
                <UserDocumentTable documents={recentDocuments} isLoading={isLoading} error={error}/>
            </Box>
        </Flex>
    )
}

export default AdminDashboard;