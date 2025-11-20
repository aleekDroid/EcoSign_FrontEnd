import { Box, Flex, Heading, Image, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Text, Button, Icon, Menu, MenuButton, MenuList, MenuItem, navigate } from "@chakra-ui/react"; 
import EcoSign from "../../assets/EcoSign.PNG";

import SignBox from "../../components/forms/SignBox";
import Header from "../../components/layout/Header";
import AdminSidebar from "../../components/layout/AdminSidebar";

import { useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { DocumentTable } from "../../components/documents/DocumentTable";
import { getRecentDocuments } from "../../utils/recentDocuments";

function AdminDashboard() {

    const { documents, isLoading, error } = useFetchDocuments();
    const recentDocuments = getRecentDocuments(documents);
    const navigate = useNavigate();

    const logOut = (e) => {
        if (e & e.preventDefault) e.preventDefault();
        navigate('/login', { replace: true });
    }

    return (
        <Flex bg="bg-default" w="full">
            <AdminSidebar />
            <Box w="full" p={10} maxW="full" pl="300px">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Header />
                </Box>
                <Image src={EcoSign} alt="EcoSign Logo" w="40%" mb={4} />
                <SignBox />
                <Text as="b" fontSize="30px" mt={8} mb={4} color="text-default" textAlign="left">
                    Documentos recientes
                </Text>
                <DocumentTable documents={recentDocuments} isLoading={isLoading} error={error} />
            </Box>
        </Flex>
    )
}

export default AdminDashboard;